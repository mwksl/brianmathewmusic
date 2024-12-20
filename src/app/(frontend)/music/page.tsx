export default function MusicPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Original Music</h1>
      
      {/* Spotify Player Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Listen</h2>
        {/* Add Spotify embed here */}
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
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