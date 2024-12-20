import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Original Music Side */}
          <Link href="/music" className="group relative overflow-hidden rounded-lg">
            <div className="aspect-[4/3] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 z-20" />
              {/* Replace with actual image */}
              <div className="absolute inset-0 bg-gray-800" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
              <h2 className="text-2xl font-bold mb-2">Original Music</h2>
              <p className="text-gray-200">Explore Brian Mathew's original compositions</p>
            </div>
          </Link>

          {/* Studio Side */}
          <Link href="/studio" className="group relative overflow-hidden rounded-lg">
            <div className="aspect-[4/3] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 z-20" />
              {/* Replace with actual image */}
              <div className="absolute inset-0 bg-gray-800" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
              <h2 className="text-2xl font-bold mb-2">Studio</h2>
              <p className="text-gray-200">Recording, Mixing, & Production Services</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
