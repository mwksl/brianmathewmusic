import type { CollectionConfig, Payload } from 'payload'
import { revalidatePath } from 'next/cache'

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

// Payload runs inside the Next.js server, so hooks can clear the page cache directly
// instead of calling an HTTP endpoint.
export const revalidate = ({
  payload,
  collection,
  doc,
}: {
  collection: string
  doc: any
  payload: Payload
}): void => {
  for (const path of getRevalidationPaths(collection, doc)) {
    try {
      revalidatePath(path)
      payload.logger.info(`Revalidated path '${path}'`)
    } catch (err: unknown) {
      // Throws outside a Next.js request (e.g. `payload run` scripts); nothing is cached there.
      payload.logger.error(`Error revalidating path '${path}': ${err}`)
    }
  }
}

export const revalidateHooks = (collection: string): CollectionConfig['hooks'] => ({
  afterChange: [({ doc, req }) => revalidate({ collection, doc, payload: req.payload })],
  afterDelete: [({ doc, req }) => revalidate({ collection, doc, payload: req.payload })],
})
