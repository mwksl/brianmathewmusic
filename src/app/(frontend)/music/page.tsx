import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Navigation from '@/components/Navigation'
import ContactForm from '@/components/ContactForm'
import Image from 'next/image'

export const revalidate = 0

interface SocialLink {
  platform: string
  url: string
  icon: string
}

async function getMusic() {
  try {
    const payload = await getPayload({
      config: configPromise,
    })
    const music = await payload.find({
      collection: 'music',
      limit: 1,
      depth: 2,
    })

    if (!music.docs || music.docs.length === 0) {
      return null
    }

    return music.docs[0]
  } catch (error) {
    console.error('Error fetching music data:', error)
    throw error
  }
}

export default async function MusicPage() {
  const music = await getMusic()

  if (!music) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        <div className="text-center py-8">
          <h1 className="font-heading text-4xl mb-4">Original Music</h1>
          <p>No music information available.</p>
        </div>
      </div>
    )
  }

  const socialLinks: SocialLink[] = [
    {
      platform: 'instagram',
      url: music.instagramUrl || '',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    },
  ].filter((link) => link.url)

  const getSpotifyEmbed = () => {
    // Try new field first
    if (music.spotifyEmbed) {
      return music.spotifyEmbed
    }
    // Fall back to old field
    if (music.spotify_embeds?.[0]?.embedUrl) {
      return `<iframe src="${music.spotify_embeds[0].embedUrl}" 
        width="100%" 
        height="100%" 
        frameBorder="0" 
        allowfullscreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy">
      </iframe>`
    }
    return null
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-start gap-12 max-w-6xl mx-auto">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="font-heading text-5xl">{music.title || 'Original Music'}</h1>
            <p className="text-lg text-text-muted leading-relaxed">{music.about}</p>
          </div>

          {/* Spotify Player */}
          {getSpotifyEmbed() && (
            <div className="w-full md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-md">
                <div
                  dangerouslySetInnerHTML={{ __html: getSpotifyEmbed() || '' }}
                  className="w-full aspect-[3/4]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Social Links and Streaming Services */}
        <div className="mt-12 flex flex-col items-center gap-8">
          {/* Streaming Service Badges */}
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {music.appleMusicUrl && (
              <a href={music.appleMusicUrl} className="block relative w-[120px] h-[26px]">
                <Image
                  src="/applemusic.svg"
                  alt="Listen on Apple Music"
                  width={120}
                  height={40}
                  className="h-auto w-auto"
                />
              </a>
            )}
            {music.bandcampUrl && (
              <a href={music.bandcampUrl} className="block">
                <Image
                  src="/bandcamp.svg"
                  alt="Available on Bandcamp"
                  width={10}
                  height={10}
                  className="h-auto w-auto"
                />
              </a>
            )}
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent transition-colors"
                  title={link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d={link.icon} />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
