'use server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import ContactForm from '@/components/ContactForm';
import Navigation from '@/components/Navigation';
import ServicesGrid from '@/components/ServicesGrid';

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

interface Studio {
  title: string;
  about: string;
  services: Service[];
  genres: Genre[];
  recordingElements: RecordingElement[];
  otherElementsText: string;
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
  const recordingElements = studio?.recordingElements || [];

  return (
    <div>
      <Navigation />
      <main className="container mx-auto px-4 py-16 font-mono">
        <h1 className="text-4xl md:text-5xl text-accent mb-12 uppercase tracking-wider">Studio</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-8">
            {studio?.about || 'A quiet, encouraging space to create, GD studio is a one-of-a-kind hideaway tailored for independent-scale writing, recording, mixing and mastering.'}
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl text-accent mt-16 mb-8 uppercase tracking-wide">Services</h2>
        <ServicesGrid services={services} />

        <h2 className="text-2xl md:text-3xl text-accent mt-16 mb-8 uppercase tracking-wide">Elements I Can Record</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          {recordingElements.map((element, index) => (
            <span key={index} className="px-4 py-2 bg-white/30 rounded-full text-sm">
              {element.name}
            </span>
          ))}
        </div>
        <p className="text-sm text-text-muted">
          {studio?.otherElementsText || 'For drums or anything else, contact me to discuss details.'}
        </p>

        <h2 className="text-2xl md:text-3xl text-accent mt-16 mb-8 uppercase tracking-wide">Genres</h2>
        <div className="flex flex-wrap gap-3">
          {genres.map((genre, index) => (
            <span key={index} className="px-4 py-2 bg-white/30 rounded-full text-sm">
              {genre.name}
            </span>
          ))}
        </div>
      </main>
      <ContactForm />
    </div>
  );
}
