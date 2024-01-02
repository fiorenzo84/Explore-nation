import {useState, useEffect} from "react";
import {NationSearch} from "../components/NationSearch";
import {CountryList} from "../data/CountryList";
import axios from "axios";

interface Country {
  cca3: string;
  name: {
    common: string;
  };
}

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]); // Ajouté pour stocker la liste des pays

  useEffect(() => {
    axios
      .get<Country[]>("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <NationSearch onSearch={handleSearch} countries={countries} />
      <CountryList searchTerm={searchTerm} />
    </>
  );
};
