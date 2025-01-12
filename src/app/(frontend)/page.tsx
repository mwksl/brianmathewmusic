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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl text-center font-playfair mb-12">
          Brian Mathew
        </h1>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Original Music Side */}
          <Link href="/music" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="aspect-[4/3] relative bg-gray-100">
              {musicImageUrl && (
                <Image
                  src={musicImageUrl}
                  alt={musicNav?.title || 'Original Music'}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-playfair mb-2 text-white">{musicNav?.title || 'Original Music'}</h2>
                <p className="text-white text-lg">{musicNav?.description || 'Explore Brian Mathew\'s original compositions'}</p>
              </div>
            </div>
          </Link>

          {/* Studio Side */}
          <Link href="/studio" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="aspect-[4/3] relative bg-gray-100">
              {studioImageUrl && (
                <Image
                  src={studioImageUrl}
                  alt={studioNav?.title || 'Studio'}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-playfair mb-2 text-white">{studioNav?.title || 'Studio'}</h2>
                <p className="text-white text-lg">{studioNav?.description || 'Recording, Mixing, & Production Services'}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
