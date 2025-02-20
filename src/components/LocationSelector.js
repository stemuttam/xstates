import React, { useState, useEffect } from "react";
import Card from "../ui/Card";  // ✅ Corrected import path
import CardContent from "../ui/CardContent";
import Select from "../ui/Select";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch all countries on component mount
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched countries:", data); // Debugging
        setCountries(data.countries || []); // ✅ Prevent undefined errors
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setCountries([]);
      })
      .finally(() => setLoadingCountries(false));
  }, []);

  // Fetch states when a country is selected
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);
    setLoadingStates(true);

    fetch(`https://crio-location-selector.onrender.com/country/${country}/states`)
      .then((res) => res.json())
      .then((data) => setStates(data.states || [])) // ✅ Prevent undefined errors
      .catch((error) => {
        console.error("Error fetching states:", error);
        setStates([]);
      })
      .finally(() => setLoadingStates(false));
  };

  // Fetch cities when a state is selected
  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity("");
    setCities([]);
    setLoadingCities(true);

    fetch(`https://crio-location-selector.onrender.com/country/${selectedCountry}/state/${state}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data.cities || [])) // ✅ Prevent undefined errors
      .catch((error) => {
        console.error("Error fetching cities:", error);
        setCities([]);
      })
      .finally(() => setLoadingCities(false));
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4 mt-10">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Select Location</h2>

        {/* Country Dropdown */}
        <Select onChange={(e) => handleCountryChange(e.target.value)}>
          <option value="">Select Country</option>
          {loadingCountries ? (
            <option disabled>Loading countries...</option>
          ) : (
            countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))
          )}
        </Select>

        {/* State Dropdown */}
        <Select
          disabled={!selectedCountry}
          onChange={(e) => handleStateChange(e.target.value)}
          className="mt-4"
        >
          <option value="">Select State</option>
          {loadingStates ? (
            <option disabled>Loading states...</option>
          ) : (
            states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))
          )}
        </Select>

        {/* City Dropdown */}
        <Select
          disabled={!selectedState}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="mt-4"
        >
          <option value="">Select City</option>
          {loadingCities ? (
            <option disabled>Loading cities...</option>
          ) : (
            cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))
          )}
        </Select>

        {/* Selected Location Display */}
        {selectedCity && (
          <p className="mt-4 text-lg font-semibold">
            You selected {selectedCity}, {selectedState}, {selectedCountry}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationSelector;
