import { useState, useEffect } from 'react';
import axios from 'axios';

interface Country {
    cca3: string;
    name: {
      common: string;
      // Autres propriétés selon la réponse de l'API
    };
    // Autres propriétés nécessaires
  }


  const CountryList: React.FC = () =>{
    const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    axios.get<Country[]>('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log("Data from API:", response.data);
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {countries.map(country => (
        <div key={country.cca3}>{country.name.common}</div>
      ))}
    </div>
  );
};

export default CountryList;
