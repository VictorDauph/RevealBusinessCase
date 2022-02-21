import "./Table.css";
import { useEffect, useState } from "react";
import { cpuUsage } from "process";

import InfiniteScroll from "react-infinite-scroll-component"

type City = {
  name: string;
  country?: string;
  subcountry?: string;
  geonameid?: number;
};


export const Table = (props:any) => {
  const [cities, setCities] = useState<City[] | null>(null);
  const [allCities, setAllCities] = useState<City[] | null>(null);
  //i count the number of pages displayed for the infinite scroller
  const [i,setI]=useState<number>(1)
  //the scroller can keep scrolling if hasMore is true
  const [hasMore,setHasMore]=useState<boolean>(true)

  
  

  useEffect(() => {
    fetch("http://localhost:3001/api/cities") //fetch all but once. The backend request allow only 500 cities to be fetched
      .then((response) => response.json())
      .then((citiesArray)=>{
        const citiesToDisplay=citiesArray.splice(0,50)
        setCities(citiesToDisplay)
        setAllCities(citiesArray)
      });
  }, []); //useEffect is launched only at the page loading.

  useEffect(()=>{
    window.scrollTo(0, 0)
    setI(1)
    setHasMore(true)
    console.log("selectedCountry",props.selectedCountry)
    //if there is a selected country fetch the cities from this country
    if (props.selectedCountry){
      fetch(`http://localhost:3001/api/cities?country=${props.selectedCountry}`) //fetch all but once.The backend request allow only 500 cities to be fetched
      .then((response) => response.json())
      .then((citiesArray)=>{
        const citiesToDisplay=citiesArray.splice(0,50)
        setCities(citiesToDisplay)
        setAllCities(citiesArray)
      })
    }
    //if there is no selected country fetch the all cities
    else{
        fetch("http://localhost:3001/api/cities") //fetch all but once.The backend request allow only 500 cities to be fetched
        .then((response) => response.json())
        .then((citiesArray)=>{
          const citiesToDisplay=citiesArray.splice(0,50)
          setCities(citiesToDisplay)
          setAllCities(citiesArray)
        })
      }
  },[props.selectedCountry]);

  function addCities(){
    setI(i+1)
    console.log("bottom reached", i)
    if( allCities!=undefined && cities!=null){
      if(allCities.length-200<=i*50 && allCities!=null){
        setHasMore(false)
        setCities(allCities)
      }
      else{
        const citiesToDisplay=allCities.splice(0,50*i)
        setCities(citiesToDisplay)
      }
    }
  }

  if(allCities!=null){
    return (
      <InfiniteScroll 
      dataLength={allCities.length}
      next={()=>addCities()}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      //scrollableTarget="scrollableDiv"
      >
        <div>
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
              {/* trouver comment implémenter le fetche more data https://www.npmjs.com/package/react-infinite-scroll-component */}
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
      </InfiniteScroll>
    );
  }
  else return null
};
