import { getPayload } from 'payload';
import configPromise from '@payload-config';
import ContactForm from '@/components/ContactForm';
import Navigation from '@/components/Navigation';

async function getMusic() {
  const payload = await getPayload({
    config: configPromise,
  });
  const music = await payload.find({
    collection: 'music',
    limit: 1,
  });
  return music.docs[0];
}

export default async function MusicPage() {
  const music = await getMusic();

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-playfair mb-8">Original Music</h1>
        
        {/* About Section */}
        <section className="mb-16 max-w-3xl">
          <p className="text-lg font-inter text-gray-700 leading-relaxed">
            {music?.about || 'Original compositions and musical collaborations by Brian Mathew.'}
          </p>
        </section>

        {/* Music Section */}
        {music?.spotify_embeds && music.spotify_embeds.length > 0 && (
          <section className="mb-16">
            <div className="max-w-2xl mx-auto mb-16">
              <div className="aspect-[4/5] w-full">
                <iframe
                  src={music.spotify_embeds[0].embedUrl}
                  width="100%"
                  height="100%"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg shadow-lg"
                  title={music.spotify_embeds[0].title}
                />
              </div>
              {music.spotify_embeds[0].description && (
                <p className="mt-4 text-gray-700 font-inter leading-relaxed text-center">
                  {music.spotify_embeds[0].description}
                </p>
              )}
            </div>

            {music.spotify_embeds.length > 1 && (
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
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-lg shadow-lg"
                      title={embed.title}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Contact Form */}
        <ContactForm />
      </div>
    </>
  );
}
