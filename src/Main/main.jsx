import React, { useState, useEffect } from 'react';
import Card from './card';

// Simple Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Card Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-72 h-[27rem] rounded-2xl bg-slate-800/90 border border-slate-700 p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 text-sm mb-2">Failed to load Pokémon</p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm transition-colors duration-300"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function main() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const API_URL = "your pokemon api key with limits";

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon data');
      }
      
      const data = await response.json();
      
      // Fetch detailed data for each Pokemon
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          if (!detailResponse.ok) {
            throw new Error(`Failed to fetch ${pokemon.name} details`);
          }
          const detailData = await detailResponse.json();
          
          // Return the original API data structure that Card component expects
          return detailData;
        })
      );
      
      setPokemonData(pokemonDetails);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // Filter Pokemon based on search
  const searchData = pokemonData.filter(pokemon => 
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-cyan-400">Loading Pokémon...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Pokémon</h1>
          <p className="text-slate-400 mb-4">{error}</p>
          <button 
            onClick={fetchPokemon}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* The main container with a dark, rich background */}
      <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8 overflow-hidden">
        {/* Animated Aurora background effect */}
        <div className="aurora-bg"></div>

        <div className="relative z-10">
          <header className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 pb-2">
              Pokémon Deck
            </h1>
            <p className="text-slate-400 text-lg">Gotta Catch 'Em All!</p>
          </header>

          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Find your Pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-4 pl-12 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 text-xl">
                🔍
              </span>
            </div>
          </div>

          {/* Results count */}
          <div className="text-center mb-8">
            <p className="text-slate-400">
              Found {searchData.length} of {pokemonData.length} Pokémon
            </p>
          </div>

          {/* This is the container that enables the 3D perspective for the cards inside it */}
          <ul 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            style={{ perspective: '2000px' }}
          >
            {searchData.map((pokemon, index) => (
              <li key={pokemon.id}>
                {/* Wrap each Card with ErrorBoundary for graceful error handling */}
                <ErrorBoundary>
                  <Card data={pokemon} index={index} />
                </ErrorBoundary>
              </li>
            ))}
          </ul>

          {/* No results message */}
          {searchData.length === 0 && search !== '' && (
            <div className="text-center mt-12">
              <p className="text-slate-400 text-lg">No Pokémon found matching "{search}"</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
