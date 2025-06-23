 import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl">
      <div className="flex items-center w-full">
      <div className="relative w-full">
  <input
    type="text"
    className="w-full px-4 py-3 rounded-l-md bg-gray-100 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 hover:cursor-pointer"
    placeholder="Search here"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    aria-label="Search"
  />
  <button
    type="submit"
    className="absolute right-0 top-0 h-full bg-green-600 hover:bg-green-700 px-4 flex items-center justify-center p-3 text-white rounded-r-md border border-green-500 hover:cursor-pointer"
    aria-label="Submit search"
  >
    <Search className="h-5 w-5" />
  </button>
</div>

            
        
      </div>
    </form>
  );
};

export default SearchBar;