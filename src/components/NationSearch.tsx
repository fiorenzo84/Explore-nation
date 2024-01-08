import {useState} from "react";
import {FaSearch} from "react-icons/fa";

interface Country {
  cca3: string;
  name: {common: string};
  latlng: [number, number];
}

interface NationSearchProps {
  onSearch: (latlng: [number, number], countryName: string) => void;
  countries: Country[];
}

export const NationSearch: React.FC<NationSearchProps> = ({
  onSearch,
  countries,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Country[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 3) {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (countryName: string) => {
    const selectedCountry = countries.find(
      (c) => c.name.common === countryName
    );
    if (selectedCountry && selectedCountry.latlng) {
      onSearch(selectedCountry.latlng, countryName);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <form
          className="relative flex items-center w-full max-w-customWidth m-5"
          onSubmit={(event) => {
            event.preventDefault();
          }}>
          <input
            className="w-full h-10 rounded-lg p-3 pl-10 shadow-custom focus:outline-none focus:ring-2 focus:ring-customGreen focus:border-customGreen"
            type="search"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Entrez 3 caractères minimum..."
          />
          <FaSearch className="absolute left-3 text-gray-400" />
        </form>
      </div>
      <div className="inline-grid gap-1 mx-5">
        {suggestions.length > 0
          ? suggestions.map((country) => (
              <button
                onClick={() => handleSuggestionClick(country.name.common)}
                key={country.cca3}
                className="w-full border-black text-left">
                {country.name.common}
              </button>
            ))
          : searchTerm.length >= 3 && (
              <div>Aucun pays trouvé pour "{searchTerm}".</div>
            )}
      </div>
    </>
  );
};
