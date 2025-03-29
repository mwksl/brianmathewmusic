'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ContactForm() {
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response:', data); // Add logging to debug

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-16 relative" ref={formRef}>
      <div className="absolute inset-0 grid-texture opacity-50" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ 
          duration: 0.8,
          ease: [0.21, 1.11, 0.81, 0.99],
          delay: 0.2
        }}
        className="relative"
      >
        <h2 className="text-4xl mb-8 font-heading">Get in Touch</h2>

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-4 bg-accent/10 text-accent rounded-lg"
          >
            <p className="font-medium">Message sent successfully!</p>
            <p className="text-sm mt-1 opacity-80">We&apos;ll get back to you soon.</p>
          </motion.div>
        )}
        
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-4 bg-red-500/10 text-red-500 rounded-lg"
          >
            <p className="font-medium">Oops! Something went wrong.</p>
            <p className="text-sm mt-1 opacity-80">{errorMessage}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-mono">
                Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30
                          focus:ring-2 focus:ring-accent/20 focus:outline-none
                          transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-mono">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30
                          focus:ring-2 focus:ring-accent/20 focus:outline-none
                          transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-mono">
              Subject
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30
                        focus:ring-2 focus:ring-accent/20 focus:outline-none
                        transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-mono">
              Message
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30
                        focus:ring-2 focus:ring-accent/20 focus:outline-none
                        transition-all duration-200 resize-none"
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === 'submitting'}
            className={`w-full md:w-auto px-8 py-3 rounded-lg text-white font-mono text-sm
                      ${status === 'submitting' 
                        ? 'bg-text-muted cursor-not-allowed' 
                        : 'bg-accent hover:bg-accent-light'}
                      transition-all duration-200 ease-in-out
                      transform hover:-translate-y-1 shadow-lg`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ 
              duration: 0.2,
              ease: "easeInOut"
            }}
          >
            {status === 'submitting' ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
