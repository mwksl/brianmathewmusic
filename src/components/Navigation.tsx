'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="w-full mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link 
            href="/" 
            className="text-xl font-playfair hover:text-gray-600 transition-colors"
          >
            Brian Mathew
          </Link>
          <div className="flex gap-6">
            <Link 
              href="/music" 
              className={`hover:text-gray-600 transition-colors ${
                pathname === '/music' ? 'text-gray-900 font-medium' : 'text-gray-600'
              }`}
            >
              Original Music
            </Link>
            <Link 
              href="/studio" 
              className={`hover:text-gray-600 transition-colors ${
                pathname === '/studio' ? 'text-gray-900 font-medium' : 'text-gray-600'
              }`}
            >
              Studio
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
