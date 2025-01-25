import Link from "next/link";
import Image from "next/image";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Media } from '@/payload-types';

async function getNavigation() {
  try {
    const payload = await getPayload({
      config: configPromise,
    });
    const navigation = await payload.find({
      collection: 'navigation',
      depth: 2,
    });
    console.log('[Server] Navigation response:', navigation);
    return navigation.docs;
  } catch (error) {
    console.error('[Server] Error fetching navigation:', error);
    return [];
  }
}

export default async function Home() {
  const navItems = await getNavigation();
  console.log('[Server] All nav items:', navItems);
  
  const musicNav = navItems.find(item => item.path === '/music');
  const studioNav = navItems.find(item => item.path === '/studio');
  
  console.log('[Server] Music nav:', musicNav);
  console.log('[Server] Studio nav:', studioNav);

  const getMusicImageUrl = () => {
    if (!musicNav?.image) return '';
    return typeof musicNav.image === 'string' ? musicNav.image : musicNav.image.url;
  };

  const getStudioImageUrl = () => {
    if (!studioNav?.image) return '';
    return typeof studioNav.image === 'string' ? studioNav.image : studioNav.image.url;
  };

  const musicImageUrl = getMusicImageUrl();
  const studioImageUrl = getStudioImageUrl();
  
  console.log('Music image URL:', musicImageUrl);
  console.log('Studio image URL:', studioImageUrl);

  return (
    <div className="min-h-screen flex items-center justify-center grid-texture">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-5xl md:text-7xl text-accent mb-8 text-center">Brian Mathew</h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Link href="/music" 
                className="group">
            <div className="space-y-3">
              <div className="aspect-[16/9] relative overflow-hidden rounded-lg shadow-lg">
                {musicImageUrl && (
                  <Image
                    src={musicImageUrl}
                    alt={musicNav?.title || 'Original Music'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute bottom-0 left-0 p-4">
                  <h2 className="font-heading text-3xl text-white drop-shadow-lg">Original Music</h2>
                </div>
              </div>
              <p className="font-mono text-sm text-text-muted">{musicNav?.description}</p>
            </div>
          </Link>

          <Link href="/studio"
                className="group">
            <div className="space-y-3">
              <div className="aspect-[16/9] relative overflow-hidden rounded-lg shadow-lg">
                {studioImageUrl && (
                  <Image
                    src={studioImageUrl}
                    alt={studioNav?.title || 'Studio'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute bottom-0 left-0 p-4">
                  <h2 className="font-heading text-3xl text-white drop-shadow-lg">Studio</h2>
                </div>
              </div>
              <p className="font-mono text-sm text-text-muted">{studioNav?.description}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
