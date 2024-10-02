import React, {useState, useEffect} from "react";
import { BrowserRouter as Router,  Route,  Routes,  Link} from "react-router-dom";
import CharacterName from "../components/CharacterName";

import './App.css'

function App() {
  const [listOfCharacters, setListOfCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_CHARACTERS_API_URL);
            console.log('fetch data - first',response)
            if (!response.ok) {
                throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();

            setListOfCharacters(json_response); // assign JSON response to the data variable.
            
        } catch (error) {
            console.error('Error fetching socks:', error);
        }
    };
    
    fetchData()
    
}, []);
console.log(listOfCharacters)
  return (
    
    <div>
    <h1>Characters</h1>

    <CharacterName listOfCharacters={listOfCharacters} />
    {/* {listOfCharacters[0]?.name} */}
    </div>
  )
}

export default App
