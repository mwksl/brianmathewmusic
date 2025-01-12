'use client';

import { useState } from 'react';

interface Service {
  name: string;
  description: string;
  id?: string | null;
}

export default function ServicesGrid({ services }: { services: Service[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          className={`text-left p-6 rounded-lg transition-all duration-300 ${
            activeIndex === index 
              ? 'bg-accent/10 shadow-lg' 
              : 'bg-white/30 hover:bg-white/40'
          }`}
        >
          <h3 className="service-title flex items-center gap-2">
            {service.name}
            <span className="ml-auto text-lg text-accent/70">
              {activeIndex === index ? '−' : '+'}
            </span>
          </h3>
          <div className={`overflow-hidden transition-all duration-300 ${
            activeIndex === index ? 'mt-4 max-h-48' : 'max-h-0'
          }`}>
            <p className="text-sm text-text-muted">
              {service.description || 'Professional audio services tailored to your needs.'}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
