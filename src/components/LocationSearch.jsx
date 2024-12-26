import React, { useState } from 'react';
import { searchLocation } from '../utils/geoLocation';
import { IoSearchOutline } from 'react-icons/io5';

const LocationSearch = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');  
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    setError(null);
    try {
      const locations = await searchLocation(query);
      setResults(locations);
      if (locations.length === 0) {
        setError('No locations found. Please try another city in Ireland.');
      }
    } catch (error) {
      setError(error.message || 'Failed to search location');
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleLocationSelect = (location) => {
    onLocationSelect(location.lat, location.lon);
    setQuery(location.name);
    setResults([]);
    setError(null);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={query ? `${query}` : 'Search for a city in Ireland...'}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          disabled={searching}
        >
          <IoSearchOutline className="w-5 h-5" />
        </button>
      </form>
      
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
      
      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
          {results.map((location, index) => (
            <button
              key={index}
              onClick={() => handleLocationSelect(location)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
            >
              {location.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;