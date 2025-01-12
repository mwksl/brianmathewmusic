import { getPayload } from 'payload';
import configPromise from '@payload-config';
import ContactForm from '@/components/ContactForm';
import Navigation from '@/components/Navigation';

interface Service {
  name: string;
  description: string;
  id?: string | null;
}

interface Genre {
  name: string;
  id?: string | null;
}

interface Studio {
  title: string;
  about: string;
  services: Service[];
  genres: Genre[];
}

async function getStudio() {
  const payload = await getPayload({
    config: configPromise,
  });
  const studio = await payload.find({
    collection: 'studio',
    limit: 1,
  });
  return studio.docs[0] as Studio;
}

export default async function StudioPage() {
  const studio = await getStudio();
  const services = studio?.services || [];
  const genres = studio?.genres || [];

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-playfair mb-8">Studio</h1>
        
        {/* About Section */}
        <section className="mb-16">
          <p className="text-lg font-inter text-gray-700 mb-8">
            {studio?.about || 'Recording and production services by Brian Mathew.'}
          </p>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-playfair mb-6">Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-playfair mb-2">{service.name}</h3>
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                  <p className="text-gray-600 font-inter">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Genres Section */}
        {genres.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-playfair mb-6">Genres</h2>
            <div className="flex flex-wrap gap-3">
              {genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-inter"
                >
                  {genre.name}
                </span>
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
