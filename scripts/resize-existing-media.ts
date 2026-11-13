/**
 * One-off: shrink existing media originals larger than 2560px (matches Media.upload.resizeOptions).
 *
 * Each oversized image is resized and uploaded as a NEW blob (`<name>-2560.<ext>`), then the media
 * record is pointed at it. Old blobs are left in place so prerendered pages keep working until the
 * next deploy; delete them afterward if you want the space back.
 *
 * Dry run (default):  vercel env run -e production -- npx payload run scripts/resize-existing-media.ts
 * Apply:              APPLY=1 vercel env run -e production -- npx payload run scripts/resize-existing-media.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import sharp from 'sharp'
import { put } from '@vercel/blob'

const MAX = 2560
const APPLY = process.env.APPLY === '1'

const payload = await getPayload({ config })
const { docs } = await payload.find({ collection: 'media', limit: 0, depth: 0 })

for (const doc of docs) {
  const { id, filename, url, width, height, mimeType } = doc
  if (!filename || !url || !mimeType?.startsWith('image/') || mimeType === 'image/svg+xml') continue
  if ((width ?? 0) <= MAX && (height ?? 0) <= MAX) continue

  const res = await fetch(url)
  if (!res.ok) throw new Error(`#${id} ${filename}: download failed (${res.status})`)
  const input = Buffer.from(await res.arrayBuffer())

  const format = mimeType === 'image/webp' ? 'webp' : mimeType === 'image/png' ? 'png' : 'jpeg'
  const { data, info } = await sharp(input)
    .rotate() // apply EXIF orientation before resizing
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .toFormat(format, { quality: 82 })
    .toBuffer({ resolveWithObject: true })

  const base = filename.replace(/\.[^.]+$/, '')
  const newFilename = `${base}-${MAX}.${format === 'jpeg' ? 'jpg' : format}`
  const summary = `#${id} ${filename} ${width}x${height} ${(input.length / 1e6).toFixed(2)}MB -> ${newFilename} ${info.width}x${info.height} ${(data.length / 1e6).toFixed(2)}MB`

  if (!APPLY) {
    console.log(`[dry run] ${summary}`)
    continue
  }

  await put(newFilename, data, {
    access: 'public',
    contentType: mimeType,
    addRandomSuffix: false,
    allowOverwrite: true, // only this script writes *-2560 files; safe to re-run
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
  // skipCloudStorage: the file is already uploaded, and this stops the plugin deleting the old blob.
  const updated = await payload.update({
    collection: 'media',
    id,
    data: { filename: newFilename, filesize: data.length, width: info.width, height: info.height },
    context: { skipCloudStorage: true },
  })
  const check = await fetch(updated.url!, { method: 'HEAD' })
  if (!check.ok) throw new Error(`#${id}: new URL ${updated.url} returned ${check.status}`)
  console.log(`[applied] ${summary}`)
}

process.exit(0)
