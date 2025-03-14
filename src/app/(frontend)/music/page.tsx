import { getPayload } from 'payload';
import configPromise from '@payload-config';
import ContactForm from '@/components/ContactForm';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { Music } from '@/payload-types';

async function getMusic(): Promise<Music | null> {
  try {
    const payload = await getPayload({
      config: configPromise,
    });
    const music = await payload.find({
      collection: 'music',
      limit: 1,
      depth: 2, // Increase depth to make sure we get all related fields
    });
    
    // Debug logging
    console.log('Raw music data:', JSON.stringify(music.docs[0], null, 2));
    
    return music.docs[0] || null;
  } catch (error) {
    console.error('Error fetching music data:', error);
    return null;
  }
}

export default async function MusicPage() {
  const music = await getMusic();

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-playfair mb-8">Original Music</h1>
        
        {/* About Section and Music Player in flex layout */}
        <section className="mb-16 flex flex-col md:flex-row gap-8">
          <div className="max-w-xl">
            <p className="text-lg font-inter text-gray-700 leading-relaxed">
              {music?.about || 'Original compositions and musical collaborations by Brian Mathew.'}
            </p>
            
            {/* Display featured image from Payload */}
            {music?.featuredImage && (
              <div className="mt-8 w-full rounded-lg shadow-md overflow-hidden">
                {typeof music.featuredImage === 'number' ? (
                  <Image 
                    src={`/api/media/${music.featuredImage}`}
                    alt="Brian Mathew Music"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                ) : typeof music.featuredImage === 'object' && music.featuredImage !== null ? (
                  'url' in music.featuredImage && typeof music.featuredImage.url === 'string' ? (
                    <Image 
                      src={music.featuredImage.url}
                      alt={(music.featuredImage.alt as string) || "Brian Mathew Music"}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  ) : 'id' in music.featuredImage && typeof music.featuredImage.id === 'number' ? (
                    <Image 
                      src={`/api/media/${music.featuredImage.id}`}
                      alt={(music.featuredImage.alt as string) || "Brian Mathew Music"}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100">
                      <p>Image path not found</p>
                    </div>
                  )
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <p>Image not available</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Player moved to the right */}
          {music?.spotify_embeds && Array.isArray(music.spotify_embeds) && music.spotify_embeds.length > 0 && (
            <div className="flex-1">
              <div className="aspect-[4/5] w-full">
                <iframe
                  src={music.spotify_embeds[0].embedUrl}
                  width="100%"
                  height="95.5%"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg shadow-lg"
                  title={music.spotify_embeds[0].title || 'Spotify Embed'}
                />
              </div>
              {music.spotify_embeds[0].description && (
                <p className="mt-4 text-gray-700 font-inter leading-relaxed text-center">
                  {music.spotify_embeds[0].description}
                </p>
              )}
            </div>
          )}
        </section>

        {/* Additional Music Section */}
        {music?.spotify_embeds && Array.isArray(music.spotify_embeds) && music.spotify_embeds.length > 1 && (
          <section className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {music.spotify_embeds.slice(1).map((embed, index) => (
                <div 
                  key={index}
                  className="aspect-square w-full"
                >
                  <iframe
                    src={embed.embedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg shadow-lg"
                    title={embed.title || `Spotify Embed ${index + 2}`}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Form */}
        <ContactForm />
      </div>
    </>
  );
}
