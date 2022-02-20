import "./App.css";
import { Table } from "./components/Table";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";

function App() {
  const[selectedCountry,setSelectedCountry]=useState<string|null>(null)
  
  //this function pass the selectedCountry variable from Sidebar to Table. Table must only display the cites from the selected country.
  function handleCountryChange(countryToSelect:string){
    setSelectedCountry(countryToSelect)
  }

  return (
    <div className="App">
      <Sidebar handleCountryChange={handleCountryChange} />
      <Table selectedCountry={selectedCountry} />
    </div>
  );
}

export default App;
