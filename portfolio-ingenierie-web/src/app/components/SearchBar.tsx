import React from 'react';

interface SearchBarProps {
  setSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Rechercher un projet..."
      onChange={handleInputChange}
      className="bg-gray-700 text-white border-gray-600 border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
};

export default SearchBar;