'use client';

import React, { useState } from 'react';

interface CreditsTooltipProps {
  description: string;
}

export default function CreditsTooltip({ description }: CreditsTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="inline-block relative"
      // Mouse only: a touch tap also fires mouseenter, which would race the click toggle and close it.
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        className="text-xs text-[#b25c65]/70 hover:text-[#b25c65] cursor-help px-3 py-2"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
      >
        Credits
      </button>

      {open && (
        <div
          role="tooltip"
          onMouseDown={(e) => e.preventDefault()} // keep button focus so clicking inside doesn't close it
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 max-w-[calc(100vw-2rem)] bg-white border border-[#e0d5c8] rounded-xs p-4 shadow-md z-10"
        >
          <div className="text-xs text-[#b25c65] whitespace-pre-wrap text-left">
            {description}
          </div>
          {/* Triangle pointer */}
          <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-[#e0d5c8] rotate-45"></div>
        </div>
      )}
    </div>
  );
}
