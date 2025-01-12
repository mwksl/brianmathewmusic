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
        <section className="mb-16">
          <p className="text-lg font-inter text-gray-700 mb-8">
            {music?.about || 'Original compositions and musical collaborations by Brian Mathew.'}
          </p>
        </section>

        {/* Listen Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-playfair mb-6">Listen</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {music?.spotifyEmbeds?.map((embed, index) => (
              <div 
                key={index}
                className="relative aspect-square w-full"
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
        </section>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </>
  );
}
