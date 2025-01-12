import { getPayload } from 'payload';
import configPromise from '@payload-config';
import ContactForm from '@/components/ContactForm';
import Navigation from '@/components/Navigation';

async function getDiscography() {
  const payload = await getPayload({
    config: configPromise,
  });
  const discography = await payload.find({
    collection: 'discography',
    limit: 100,
  });
  return discography.docs;
}

export default async function MusicPage() {
  const discography = await getDiscography();

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-playfair mb-8">Original Music</h1>
        
        {/* Discography Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-playfair mb-6">Discography</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discography.map((album) => (
              <div 
                key={album.id} 
                className="group relative p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-playfair mb-2">{album.albumTitle}</h3>
                <p className="text-gray-600 font-inter">{album.artist}</p>
                {album.roles && album.roles.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {album.roles.map((role, index) => (
                      <span 
                        key={index}
                        className="text-sm px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                      >
                        {role.role}
                      </span>
                    ))}
                  </div>
                )}
                {album.spotifyUrl && (
                  <a 
                    href={album.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-green-600 hover:text-green-700 transition-colors"
                  >
                    Listen on Spotify
                  </a>
                )}
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
