import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  const [userInput, setUserInput] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [isGetPokemonData, setIsGetPokemonData] = useState(false);

  const searchInput = (e) => {
    setUserInput(e.target.value);
  };

  const onSearchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${userInput}`).then((res) => {
      console.log(res.data);

      setPokemonData(res.data);
      setIsGetPokemonData(true);
    });
  };

  return (
    <div className="card-container">
      <div className="input-container">
        <input
          className="input-el"
          type="search"
          placeholder="search pokemon"
          value={userInput}
          onChange={searchInput}
        ></input>
        <button onClick={onSearchPokemon} className="search-button">
          Search
        </button>
      </div>
      <div>
        {isGetPokemonData ? (
          <div>
            <div className="pokemon-card">
              <div className="pokemon-el">
                <h1>{pokemonData.species.name}</h1>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
                  alt={`${pokemonData.species.name}`}
                />
                {pokemonData.stats.map((eachStat) => {
                  return (
                    <p>
                      {eachStat.stat.name} : {eachStat.base_stat}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <h2 className="poke-name">Enter any Pokemon Name</h2>
        )}
      </div>
      <Link to="/listing-page">
        <button className="listing-page-button">Listing Page</button>
      </Link>
    </div>
  );
}

export default Home;
