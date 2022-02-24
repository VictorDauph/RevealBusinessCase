import { act } from "react-dom/test-utils";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { render, unmountComponentAtNode } from "react-dom";

const FakeCountries= [
  {
    "name": "Afghanistan",
    "count": 48
  },
  {
    "name": "Aland Islands",
    "count": 1
  },
  {
    "name": "Albania",
    "count": 20
  },
]

//this is the text expected to be rendered by the sidebar given the FakeCountries fake fetched.
const expectedAnswer="Cities AppAll citiesAfghanistan (48)Aland Islands (1)Albania (20)"

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
    //unmountComponentAtNode delete all the components mounted on the node container.
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Sidebar Component", () => {
  test("Fetching Countries and display Data",async()=>{
    jest.spyOn(window,"fetch").mockImplementation(()=>{
      const fetchResponse={
        json: ()=> Promise.resolve(FakeCountries)
      };
      return Promise.resolve(fetchResponse);
    });
    await act(async()=>{
      //render displays the Sidebar in the container.
      render(<Sidebar selectedCountry={null}/>,container)
    })
    expect(container.textContent).toBe(expectedAnswer) 
  });

});

