import { getPayload } from 'payload';
import configPromise from '@payload-config';
import ContactForm from '@/components/ContactForm';
import Navigation from '@/components/Navigation';

async function getStudio() {
  const payload = await getPayload({
    config: configPromise,
  });
  const studio = await payload.find({
    collection: 'studio',
    limit: 100,
  });
  return studio.docs;
}

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

export default async function StudioPage() {
  const studio = await getStudio();
  const discography = await getDiscography();

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-playfair mb-8">Studio</h1>
        
        {/* About Section */}
        <section className="mb-16">
          <p className="text-lg font-inter text-gray-700 mb-8">
            {studio[0]?.about || 'Professional recording, mixing, and production services.'}
          </p>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-playfair mb-6">Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studio[0]?.services?.map((service, index) => (
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
        {studio[0]?.genres && studio[0].genres.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-playfair mb-6">Genres</h2>
            <div className="flex flex-wrap gap-3">
              {studio[0].genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-inter"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Recording Elements Section */}
        {studio[0]?.recordingElements && studio[0].recordingElements.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-playfair mb-6">Recording Elements</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studio[0].recordingElements.map((element, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-lg border border-gray-200"
                >
                  <h3 className="text-xl font-playfair mb-3">{element.name}</h3>
                  <p className="text-gray-600 font-inter">{element.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Text Section */}
        {studio[0]?.additionalText && (
          <section className="mb-16">
            <div className="prose prose-lg max-w-none font-inter">
              {studio[0].additionalText}
            </div>
          </section>
        )}

        {/* Contact Form */}
        <ContactForm />
      </div>
    </>
  );
}
