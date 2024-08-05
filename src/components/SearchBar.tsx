import { useState, FC } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setQuery('');
    }
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for user or project"
        className="w-full max-w-lg px-4 py-2 rounded-l-lg bg-gray-700 text-white border-none focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white rounded-r-lg transition-all duration-300 ease-in-out"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
