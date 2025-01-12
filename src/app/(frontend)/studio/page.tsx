import { getPayload } from 'payload';
import configPromise from '@payload-config';
import ContactForm from '@/components/ContactForm';
import Navigation from '@/components/Navigation';

async function getStudioContent() {
  const payload = await getPayload({
    config: configPromise,
  });
  const studio = await payload.find({
    collection: 'studio',
    limit: 1,
  });
  return studio.docs[0];
}

export default async function StudioPage() {
  const studio = await getStudioContent();

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-playfair mb-8">Studio</h1>
        
        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-playfair mb-4">About</h2>
          <p className="text-lg font-inter leading-relaxed">{studio?.about}</p>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-playfair mb-6">Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studio?.services?.map((service, index) => (
              <div 
                key={index} 
                className="group relative p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-playfair mb-2">{service.name}</h3>
                <p className="text-gray-600 font-inter group-hover:block hidden">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Genres Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-playfair mb-6">Genres I work in</h2>
          <div className="flex flex-wrap gap-4">
            {studio?.genres?.map((genre, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gray-100 rounded-full text-gray-800 font-inter"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="mt-4 text-gray-600 font-inter">{studio?.otherGenresText}</p>
        </section>

        {/* Recording Elements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-playfair mb-6">Elements I can record</h2>
          <div className="flex flex-wrap gap-4">
            {studio?.recordingElements?.map((element, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gray-100 rounded-full text-gray-800 font-inter"
              >
                {element.name}
              </span>
            ))}
          </div>
          <p className="mt-4 text-gray-600 font-inter">{studio?.otherElementsText}</p>
        </section>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </>
  );
}
