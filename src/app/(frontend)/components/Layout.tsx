import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">Brian Mathew</div>
            {/* Add navigation items later */}
          </div>
        </div>
      </nav>
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
