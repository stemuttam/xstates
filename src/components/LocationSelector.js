import React, { useState, useEffect } from "react";
import "./LocationSelector.css"; // Import the CSS for styling

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [selectionText, setSelectionText] = useState(""); // New state for the final text

  useEffect(() => {
    // Fetch all countries when the component mounts
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);
    setSelectionText(""); // Reset selection text

    // Fetch states for the selected country
    fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((error) => console.error("Error fetching states:", error));
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setCities([]);
    setSelectionText(""); // Reset selection text

    // Fetch cities for the selected state
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);

    // Update the selection text
    setSelectionText(`You selected ${city}, ${selectedState}, ${selectedCountry}`);
  };

  return (
    <div>
      <h2>Location Selector</h2>
      <div className="location-container">
        <label>Country:</label>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">--Select Country--</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <label>State:</label>
        <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
          <option value="">--Select State--</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <label>City:</label>
        <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          <option value="">--Select City--</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Display the selected location statement */}
      {selectionText && <h3 className="selection-text">{selectionText}</h3>}
    </div>
  );
};

export default LocationSelector;
