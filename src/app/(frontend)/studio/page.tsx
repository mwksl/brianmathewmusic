'use server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import ContactForm from '@/components/ContactForm';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import ServicesList from './ServicesList';

interface Service {
  name: string;
  description: string;
  id?: string | null;
}

interface Genre {
  name: string;
  id?: string | null;
}

interface RecordingElement {
  name: string;
  id?: string | null;
}

interface GearItem {
  name: string;
  description?: string;
  id?: string | null;
}

interface GearCategory {
  category: string;
  items: GearItem[];
  id?: string | null;
}

interface Studio {
  title: string;
  about: string;
  services: Service[];
  genres: Genre[];
  recordingElements: RecordingElement[];
  otherElementsText: string;
  gear: GearCategory[];
  studioImage?: { url: string };
  servicesImage?: { url: string };
  genresImage?: { url: string };
  elementsImage?: { url: string };
  gearImage?: { url: string };
}

async function getStudio() {
  try {
    const payload = await getPayload({
      config: configPromise,
    });
    
    const studio = await payload.find({
      collection: 'studio',
      limit: 1,
      depth: 2,
    });
    
    if (!studio.docs || studio.docs.length === 0) {
      return null;
    }
    
    return studio.docs[0] as Studio;
  } catch (error) {
    console.error('Error fetching studio data:', error);
    throw error; // Let Next.js handle the error
  }
}

export default async function StudioPage() {
  let studio;
  try {
    studio = await getStudio();
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        <div className="text-center py-8">
          <h1 className="font-heading text-4xl mb-4">Error Loading Studio</h1>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }
  
  if (!studio) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        <div className="text-center py-8">
          <h1 className="font-heading text-4xl mb-4">Studio</h1>
          <p>No studio information available.</p>
        </div>
      </div>
    );
  }

  const services = studio.services || [];
  const genres = studio.genres || [];
  const recordingElements = studio.recordingElements || [];
  const gear = studio.gear || [];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h1 className="font-heading text-5xl mb-6">{studio.title}</h1>
            <p className="text-lg text-text-muted">{studio.about}</p>
          </div>
          {studio.studioImage?.url && (
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px]">
                <Image 
                  src={studio.studioImage.url} 
                  alt="Studio"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row-reverse items-start gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="font-heading text-4xl mb-6">Services</h2>
            <ServicesList services={services} />
          </div>
          {studio.servicesImage?.url && (
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px]">
                <Image 
                  src={studio.servicesImage.url} 
                  alt="Services"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Genres Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col-reverse md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="font-heading text-4xl mb-6">Genres</h2>
            <div className="grid grid-cols-2 gap-4">
              {genres.map((genre) => (
                <div key={genre.id} className="p-4 bg-white/5 rounded-lg">
                  <p className="font-mono">{genre.name}</p>
                </div>
              ))}
            </div>
          </div>
          {studio.genresImage?.url && (
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px]">
                <Image 
                  src={studio.genresImage.url} 
                  alt="Genres"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recording Elements Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row-reverse items-start gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="font-heading text-4xl mb-6">Recording Elements</h2>
            <div className="grid grid-cols-2 gap-4">
              {recordingElements.map((element) => (
                <div key={element.id} className="p-4 bg-white/5 rounded-lg">
                  <p className="font-mono">{element.name}</p>
                </div>
              ))}
            </div>
            {studio.otherElementsText && (
              <p className="mt-4 text-text-muted italic">{studio.otherElementsText}</p>
            )}
          </div>
          {studio.elementsImage?.url && (
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px]">
                <Image 
                  src={studio.elementsImage.url} 
                  alt="Recording Elements"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Gear Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col-reverse md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="font-heading text-4xl mb-6">Gear</h2>
            <div className="space-y-8">
              {gear.map((category) => (
                <div key={category.id}>
                  <h3 className="font-mono text-xl mb-4">{category.category}</h3>
                  <div className="grid gap-2">
                    {category.items?.map((item, index) => (
                      <div key={index} className="p-3 bg-white/5 rounded-lg">
                        <p className="font-mono text-sm">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {studio.gearImage?.url && (
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px]">
                <Image 
                  src={studio.gearImage.url} 
                  alt="Gear"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
}
