import {useState} from "react";
import {Link} from "react-router-dom";
import {FaSearch} from "react-icons/fa";

interface Country {
  cca3: string;
  name: {
    common: string;
  };
}

interface NationSearchProps {
  onSearch: (term: string) => void;
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

  return (
    <>
      <div className="flex justify-center">
        {" "}
        {/* Centre le conteneur */}
        <form
          className="relative flex items-center w-full max-w-customWidth m-5"
          onSubmit={(event) => {
            event.preventDefault();
            onSearch(searchTerm);
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
      <div className="inline-grid gap-4 mx-5 ">
        {suggestions.length > 0
          ? suggestions.map((country) => (
              <Link
                to={`/country/${country.cca3}`}
                key={country.cca3}
                className="w-full border-black">
                {country.name.common}
              </Link>
            ))
          : searchTerm.length >= 3 && (
              <div>Aucun pays trouvé pour "{searchTerm}".</div>
            )}
      </div>
    </>
  );
};
