export default function StudioPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Studio</h1>
      
      {/* Navigation Links */}
      <nav className="mb-12 flex gap-6 text-lg">
        <a href="#discography" className="hover:text-gray-300">Discography</a>
        <a href="#gear" className="hover:text-gray-300">Gear</a>
        <a href="#about" className="hover:text-gray-300">About</a>
        <a href="#contact" className="hover:text-gray-300">Contact</a>
      </nav>

      {/* Discography Section */}
      <section id="discography" className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Selected Discography</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Album cards will go here */}
        </div>
      </section>

      {/* Gear Section */}
      <section id="gear" className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Gear</h2>
        <div className="prose prose-invert max-w-none">
          {/* Gear content will go here */}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">About</h2>
        <div className="prose prose-invert max-w-none">
          {/* About content will go here */}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6">Contact</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
