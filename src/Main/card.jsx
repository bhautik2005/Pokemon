/*
  REQUIRED CSS:
  Copy and paste the following CSS into your global stylesheet (e.g., index.css, App.css)
  if you haven't already.
  -----------------------------------------------------------------------------------------

  .card-3d {
    transform-style: preserve-3d;
  }

  @keyframes card-entry {
    from {
      opacity: 0;
      transform: translateY(50px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
*/

import React, { useRef } from 'react';

// A helper function to capitalize the first letter of a string
const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// A mapping from Pokémon type to a Tailwind CSS shadow color for the glow effect
const typeColorGlow = {
  fire: 'shadow-red-500/50',
  water: 'shadow-blue-500/50',
  grass: 'shadow-green-500/50',
  electric: 'shadow-yellow-400/50',
  psychic: 'shadow-pink-500/50',
  ice: 'shadow-cyan-400/50',
  dragon: 'shadow-indigo-600/50',
  dark: 'shadow-gray-800/60',
  fairy: 'shadow-pink-400/50',
  normal: 'shadow-gray-400/50',
  fighting: 'shadow-orange-700/50',
  flying: 'shadow-sky-400/50',
  poison: 'shadow-purple-600/50',
  ground: 'shadow-amber-600/50',
  rock: 'shadow-stone-500/50',
  bug: 'shadow-lime-500/50',
  ghost: 'shadow-violet-700/50',
  steel: 'shadow-slate-500/50',
  default: 'shadow-white/30',
};

const card = ({ data, index, style }) => {
  const cardRef = useRef(null);

  // --- Data Extraction and Formatting ---
  const name = capitalize(data.name);
  const imageSrc = data.sprites.other.dream_world.front_default || data.sprites.front_default;
  const types = data.types.map((curType) => capitalize(curType.type.name));
  const height = data.height / 10; // Convert from decimetres to meters
  const weight = data.weight / 10; // Convert from hectograms to kilograms
  const firstAbility = capitalize(data.abilities[0]?.ability.name || 'N/A');
  const baseExperience = data.base_experience;
  const speedStat = data.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 'N/A';
  
  // --- Dynamic Styling ---
  const primaryType = data.types[0]?.type.name || 'default';
  const typeGlow = typeColorGlow[primaryType] || typeColorGlow.default;

  // --- Event Handlers for 3D Effect ---
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y - height / 2) / (height / 2) * -15;
    const rotateY = (x - width / 2) / (width / 2) * 15;
    const shineX = (x / width) * 100;
    const shineY = (y / height) * 100;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    const shineElement = cardRef.current.querySelector('.card-shine');
    if(shineElement) {
        shineElement.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.2), transparent 40%)`;
        shineElement.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    const shineElement = cardRef.current.querySelector('.card-shine');
    if(shineElement) {
        shineElement.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      // **** CHANGE 1: Increased height from h-96 to h-[27rem] to prevent content overflow ****
      className="card-3d relative rounded-2xl transition-all duration-300 ease-out w-72 h-[27rem]" 
      style={{
        ...style,
        animation: `card-entry 0.7s ease-out ${index * 0.1}s backwards`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative w-full h-full p-6 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-2xl ${typeGlow} transition-shadow duration-300 ease-in-out`}>
        <div className="card-shine pointer-events-none absolute top-0 left-0 w-full h-full rounded-2xl opacity-0 transition-opacity duration-300 ease-out"></div>
        
        {/* **** CHANGE 2: Adjusted margins (mb-4 to mb-3) for better vertical spacing **** */}
        <div className="relative flex justify-center items-center mb-3">
          <img
            src={imageSrc}
            alt={name}
            className="w-48 h-48 object-contain drop-shadow-2xl"
            style={{ transform: 'translateZ(50px)' }}
          />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2" style={{ transform: 'translateZ(40px)' }}>
            {name}
          </h2>
          <div className="flex justify-center gap-2 mb-4" style={{ transform: 'translateZ(30px)' }}>
            {types.map(type => (
              <span key={type} className="px-3 py-1 bg-slate-700/80 text-cyan-400 rounded-full text-sm font-semibold">
                {type}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-left text-sm text-slate-300" style={{ transform: 'translateZ(20px)' }}>
            <p><strong className="font-semibold text-slate-100">Height:</strong> {height} m</p>
            <p><strong className="font-semibold text-slate-100">Weight:</strong> {weight} kg</p>
            <p><strong className="font-semibold text-slate-100">Ability:</strong> {firstAbility}</p>
            <p><strong className="font-semibold text-slate-100">Speed:</strong> {speedStat}</p>
            <p className="col-span-2 text-center pt-2"><strong className="font-semibold text-slate-100">Base Exp:</strong> {baseExperience}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default card;