import Link from "next/link";
import Image from "next/image";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Media } from '@/payload-types';

async function getNavigation() {
  const payload = await getPayload({
    config: configPromise,
  });
  const navigation = await payload.find({
    collection: 'navigation',
    depth: 1,
  });
  return navigation.docs;
}

export default async function Home() {
  const navItems = await getNavigation();
  const musicNav = navItems.find(item => item.path === '/music');
  const studioNav = navItems.find(item => item.path === '/studio');

  const getMusicImageUrl = () => {
    if (!musicNav?.image || typeof musicNav.image === 'number') return '';
    return (musicNav.image as Media).url || '';
  };

  const getStudioImageUrl = () => {
    if (!studioNav?.image || typeof studioNav.image === 'number') return '';
    return (studioNav.image as Media).url || '';
  };

  const musicImageUrl = getMusicImageUrl();
  const studioImageUrl = getStudioImageUrl();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center grid-texture">
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-heading text-6xl md:text-8xl text-accent mb-12">Brian Mathew</h1>
        
        <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto relative">
          <div className="absolute inset-0 bg-accent/5 -rotate-1 rounded-3xl transform -translate-y-4 translate-x-4" />
          
          <Link href="/music" 
                className="group relative md:translate-y-12">
            <div className="aspect-[3/4] relative overflow-hidden rounded-2xl shadow-lg">
              {musicImageUrl && (
                <Image
                  src={musicImageUrl}
                  alt={musicNav?.title || 'Original Music'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 saturate-50"
                />
              )}
              <div className="absolute inset-0 bg-accent/10 mix-blend-multiply" />
            </div>
            <div className="mt-6 transform -rotate-1">
              <h2 className="text-4xl mb-3 font-heading">{musicNav?.title || 'Original Music'}</h2>
              <p className="font-mono text-sm text-text-muted">{musicNav?.description || 'Explore compositions'}</p>
            </div>
          </Link>

          <Link href="/studio"
                className="group relative md:-translate-y-12">
            <div className="aspect-[3/4] relative overflow-hidden rounded-2xl shadow-lg">
              {studioImageUrl && (
                <Image
                  src={studioImageUrl}
                  alt={studioNav?.title || 'Studio Work'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 saturate-50"
                />
              )}
              <div className="absolute inset-0 bg-accent/10 mix-blend-multiply" />
            </div>
            <div className="mt-6 transform rotate-1">
              <h2 className="text-4xl mb-3 font-heading">{studioNav?.title || 'Studio Work'}</h2>
              <p className="font-mono text-sm text-text-muted">{studioNav?.description || 'Recording & Production'}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
