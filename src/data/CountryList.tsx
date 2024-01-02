import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

interface Country {
  cca3: string;
  name: {
    common: string;
  };
}

interface CountryListProps {
  searchTerm: string;
}

export const CountryList: React.FC<CountryListProps> = ({searchTerm}) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    axios
      .get<Country[]>("https://restcountries.com/v3.1/all")
      .then((response) => {
        console.log("Data from API:", response.data);
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Trouver un pays correspondant
  const filteredCountries = searchTerm
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      {filteredCountries.map((country) => (
        <Link to={`/country/${country.cca3}`} key={country.cca3}>
          {country.name.common}
        </Link>
      ))}
    </div>
  );
};
