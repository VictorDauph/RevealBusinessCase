import "./Sidebar.css";
import { useEffect, useState, SyntheticEvent } from "react";


type Country = {
  name: string;
  count:number; //number is the number of cities within the country
};

export const Sidebar = (props:any) => {
  const [countries, setCountries] = useState<Country[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/countries") //fetch all but once
      .then((response) => response.json())
      .then(setCountries);
  }, []); //useEffect is launched only at the page loading.

  function selectStyling(country:Country|null){


  }

  function deselectAll(){
    const allSidebarElements= document.getElementsByClassName("sidebarElement")
    Array.from(allSidebarElements).forEach( element=>{
      console.log("removing")
      element.classList.remove("activated")
    })
  }

  function handleClick(event:SyntheticEvent,country:Country|null){
    deselectAll()
    //it is mandatory to precise the type of the element targeted to manipulate the classes in typescript
    const target = event.target as HTMLTableCellElement
    target.classList.add("activated")
    if(country){
      console.log("click", country.name)
      props.handleCountryChange(country.name)
    }
    else{
      console.log("click", "null")
      props.handleCountryChange(null)
    }

  }

  return (
    <div id="sidebar">
      <table>
        <thead>
              <th>Cities App</th> 
        </thead>
        <tbody>
        <tr onClick={(event)=>handleClick(event,null)} className="sidebarElement activated">All cities</tr>
        {countries?.map((country)=>(
          <tr onClick={(event)=>handleClick(event,country)} className="sidebarElement">{country.name} ({country.count})</tr> 
        ))}
        </tbody>
      </table>
    </div>
  );
};
