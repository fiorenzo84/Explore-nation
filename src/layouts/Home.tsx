
import {useState, useEffect} from "react";
import axios from "axios";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from "leaflet";
import {renderToString} from "react-dom/server";
import {FaMapMarkerAlt} from "react-icons/fa";
import {NationSearch} from "../components/NationSearch";
import {Link} from "react-router-dom";
import "leaflet/dist/leaflet.css";

interface Country {
  cca3: string;
  name: {common: string};
  latlng: [number, number];
}

export const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedCountryName, setSelectedCountryName] = useState<string>("");

  useEffect(() => {
    axios
      .get<Country[]>("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (latlng: [number, number], countryName: string) => {
    setMapCenter(latlng);
    setZoomLevel(5); // Zoom sur le pays sélectionné
    setSelectedCountryName(countryName.toLowerCase()); // Met à jour le nom du pays sélectionné
  };

  const customMarkerHtml = renderToString(
    <FaMapMarkerAlt style={{fontSize: "22px", color: "#5AC87E"}} />
  );
  const customMarkerIcon: L.DivIcon = new L.DivIcon({
    className: "leaflet-custom-icon",
    html: customMarkerHtml,
  });

  return (
    <>
      <NationSearch onSearch={handleSearch} countries={countries} />
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        className="h-96 mx-5 rounded-lg shadow-custom">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        />
        {countries
          .filter(
            (country) =>
              country.name.common.toLowerCase() === selectedCountryName
          )
          .map(
            (country) =>
              country.latlng && (
                <Marker
                  key={country.cca3}
                  position={country.latlng}
                  icon={customMarkerIcon}>
                  <Popup>
                    <Link to={`/country/${country.cca3}`}>
                      {country.name.common}
                    </Link>
                  </Popup>
                </Marker>
              )
          )}
      </MapContainer>
    </>
  );
};
