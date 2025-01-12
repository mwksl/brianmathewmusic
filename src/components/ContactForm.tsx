export default function ContactForm() {
  return (
    <section id="contact" className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-playfair mb-6">Contact</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            id="subject"
            className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
          <textarea
            id="message"
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-gray-400 focus:outline-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
