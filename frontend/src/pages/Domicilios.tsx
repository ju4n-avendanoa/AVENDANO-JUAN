import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

interface Domicilio {
  id: number;
  calle: string;
  ciudad: string;
  provincia: string;
  pais: string;
}

const Domicilios: React.FC = () => {
  const [domicilios, setDomicilios] = useState<Domicilio[]>([]);
  const [searchResults, setSearchResults] = useState<Domicilio[]>([]);

  useEffect(() => {
    const fetchDomicilios = async () => {
      try {
        const response = await fetch("http://localhost:8080/domicilios");
        if (!response.ok) {
          throw new Error("Error fetching domicilios");
        }
        const data = await response.json();
        setDomicilios(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDomicilios();
  }, []);

  const handleSearch = (query: string) => {
    const results = domicilios.filter(
      (domicilio) => domicilio.id === Number(query)
    );
    setSearchResults(results);
  };

  return (
    <div className="container mx-auto">
      <SearchBar
        placeholder="Buscar por DNI del paciente"
        onSearch={handleSearch}
      />
      <h2 className="mt-10 text-2xl">Domicilios</h2>
      <ul>
        {searchResults.length > 0
          ? searchResults.map((domicilio) => (
              <li key={domicilio.id}>
                {domicilio.calle}, {domicilio.ciudad}, {domicilio.provincia},{" "}
                {domicilio.pais}
              </li>
            ))
          : domicilios.map((domicilio) => (
              <li key={domicilio.id}>
                {domicilio.calle}, {domicilio.ciudad}, {domicilio.provincia},{" "}
                {domicilio.pais}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Domicilios;
