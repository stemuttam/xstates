import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Select from "../components/ui/Select";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]); // ✅ Ensure it's an array
  const [states, setStates] = useState([]); // ✅ Ensure it's an array
  const [cities, setCities] = useState([]); // ✅ Ensure it's an array
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched countries:", data); // ✅ Debugging
        setCountries(data.countries || []);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setCountries([]); // ✅ Avoid undefined state
      });
  }, []);
  

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setStates([]); // ✅ Reset states when country changes
    setCities([]); // ✅ Reset cities when country changes

    fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
      .then((res) => res.json())
      .then((data) => setStates(data.states || [])) // ✅ Handle undefined case
      .catch((error) => {
        console.error("Error fetching states:", error);
        setStates([]); // ✅ Set empty array if fetch fails
      });
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity("");
    setCities([]); // ✅ Reset cities when state changes

    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data.cities || [])) // ✅ Handle undefined case
      .catch((error) => {
        console.error("Error fetching cities:", error);
        setCities([]); // ✅ Set empty array if fetch fails
      });
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4 mt-10">
      <h2 className="text-xl font-bold mb-4">Select Location</h2>
      <Select onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">Select Country</option>
        {countries.length > 0 ? (
          countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))
        ) : (
          <option disabled>Loading countries...</option>
        )}
      </Select>
      <Select
        disabled={!selectedCountry}
        onChange={(e) => handleStateChange(e.target.value)}
        className="mt-4"
      >
        <option value="">Select State</option>
        {states.length > 0 ? (
          states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))
        ) : (
          <option disabled>Loading states...</option>
        )}
      </Select>
      <Select
        disabled={!selectedState}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="mt-4"
      >
        <option value="">Select City</option>
        {cities.length > 0 ? (
          cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))
        ) : (
          <option disabled>Loading cities...</option>
        )}
      </Select>
      {selectedCity && (
        <p className="mt-4 text-lg font-semibold">
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      )}
    </Card>
  );
};

export default LocationSelector;
