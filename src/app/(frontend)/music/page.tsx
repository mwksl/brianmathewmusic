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
                <h3 className="text-xl font-playfair mb-2">{album.title}</h3>
                <p className="text-gray-600 font-inter">{album.description}</p>
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
