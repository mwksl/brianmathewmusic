'use client';
import { useState, useEffect, useRef } from 'react';

interface Service {
  name: string;
  description: string;
  id?: string | null;
}

interface ServicesListProps {
  services: Service[];
}

export default function ServicesList({ services }: ServicesListProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setSelectedService(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleServiceClick = (serviceId: string | null | undefined) => {
    if (serviceId === selectedService) {
      setSelectedService(null);
    } else {
      setSelectedService(serviceId || null);
    }
  };

  return (
    <div ref={servicesRef} className="grid gap-4">
      {services.map((service) => (
        <div
          key={service.id}
          className={`p-4 rounded-lg transition-all cursor-pointer group relative
            ${selectedService === service.id 
              ? 'bg-white/20' 
              : 'bg-white/5 hover:bg-white/10'}`}
          onClick={() => handleServiceClick(service.id)}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-lg">{service.name}</h3>
            <div className={`transition-transform duration-300 ${selectedService === service.id ? 'rotate-180' : ''}`}>
              ↓
            </div>
          </div>
          {selectedService === service.id && (
            <p className="text-sm text-text-muted mt-2">{service.description}</p>
          )}
          <div className={`absolute inset-0 border border-white/0 rounded-lg transition-opacity duration-300 pointer-events-none
            ${selectedService === service.id ? 'opacity-0' : 'group-hover:border-white/20'}`} />
        </div>
      ))}
    </div>
  );
}
