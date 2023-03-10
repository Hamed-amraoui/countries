import React, { useState, useEffect } from "react";
import axios from "axios";

function CountriesComp() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all")
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // i didnt find an api for tunisia regions 
    if (selectedCountry === "Tunisia") {
      axios.get("https://api.com/regions/Tunisia")
        .then(response => {
          setRegions(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedCountry]);

  function handleCountryChange(event) {
    setSelectedCountry(event.target.value);
  }

  function handleRegionChange(event) {
    setSelectedRegion(event.target.value);
  }

  return (
    <div>
      <label htmlFor="country-select">Pays :</label>
      <select id="country-select" value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Sélectionner un pays</option>
        {countries.map(country => (
          <option key={country.name} value={country.name}>{country.name}</option>
        ))}
      </select>

      {selectedCountry === "Tunisia" && (
        <div>
          <label htmlFor="region-select">Région :</label>
          <select id="region-select" value={selectedRegion} onChange={handleRegionChange}>
            <option value="">Sélectionner une région</option>
            {regions.map(region => (
              <option key={region.name} value={region.name}>{region.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default CountriesComp;
