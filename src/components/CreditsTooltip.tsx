'use client';

import React, { useState } from 'react';

interface CreditsTooltipProps {
  description: string;
}

export default function CreditsTooltip({ description }: CreditsTooltipProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div className="inline-block relative">
      <span 
        className="text-xs text-[#b25c65]/70 hover:text-[#b25c65] cursor-help"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        Credits
      </span>
      
      {isHovering && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white border border-[#e0d5c8] rounded-sm p-4 shadow-md z-10">
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
