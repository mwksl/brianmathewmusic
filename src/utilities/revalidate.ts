import type { Payload } from 'payload'

// Determine which paths to revalidate based on the collection and document
const getRevalidationPaths = (collection: string, doc: any): string[] => {
  // Base paths that should always be revalidated
  const basePaths = ['/']

  // Collection-specific paths
  switch (collection) {
    case 'pages':
      return [...basePaths, `/${doc.slug}`]
    case 'navigation':
      // Navigation changes affect all pages
      return [...basePaths, `/${doc.path}`]
    case 'discography':
      return [...basePaths, '/discography']
    case 'studio':
      return [...basePaths, '/studio']
    case 'music':
      return [...basePaths, '/music']
    case 'media':
    case 'media-with-prefix':
      // For media, we should revalidate pages that might use these media
      return [...basePaths, '/studio', '/music', '/discography']
    default:
      return basePaths
  }
}

export const revalidate = async (args: {
  collection: string
  doc: any
  payload: Payload
}): Promise<void> => {
  const { payload, collection, doc } = args
  const pathsToRevalidate = getRevalidationPaths(collection, doc)

  try {
    // Revalidate each path
    for (const path of pathsToRevalidate) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=${path}`,
        { cache: 'no-cache' }
      )

      if (res.ok) {
        payload.logger.info(`Revalidated path '${path}'`)
      } else {
        payload.logger.error(`Error revalidating path '${path}': ${res.status} ${res.statusText}`)
      }
    }
  } catch (err: unknown) {
    payload.logger.error(`Error hitting revalidate route: ${err}`)
  }
}