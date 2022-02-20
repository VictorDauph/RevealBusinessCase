import "./Table.css";
import { useEffect, useState } from "react";
import { cpuUsage } from "process";

type City = {
  name: string;
  country?: string;
  subcountry?: string;
  geonameid?: number;
};

export const Table = (props:any) => {
  const [cities, setCities] = useState<City[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/cities") //fetch all but once. The backend request allow only 500 cities to be fetched
      .then((response) => response.json())
      .then(setCities);
  }, []); //useEffect is launched only at the page loading.

  useEffect(()=>{
    console.log("selectedCountry",props.selectedCountry)
    if (props.selectedCountry){
      fetch(`http://localhost:3001/api/cities?country=${props.selectedCountry}`) //fetch all but once. Backend server can not process country specific requests.
      .then((response) => response.json())
      .then(setCities)
    }
    else{
      fetch("http://localhost:3001/api/cities") //fetch all but once. Backend server can not process country specific requests.
      .then((response) => response.json())
      .then(setCities)
      }

  },[props.selectedCountry]);

  return (
    <div id="cities-table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th> 
            <th>Country</th>
            <th>Sub-country</th>
          </tr>
        </thead>
        <tbody>
          {/* We will need to sort the cities by country when necessary and to limit the number of cities rendered (50-100-150-200...) */}
          {cities?.map((city, index) => (
            <tr key={index}>
              <td><a href={"https://www.geonames.org/"+city.geonameid} target="_blank">{city.name}</a></td>
              <td>{city.country}</td>
              <td>{city.subcountry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
