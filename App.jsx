import React, { useState, useEffect } from 'react';
import './App.css';

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedWeaknesses, setSelectedWeaknesses] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then((response) => response.json())
      .then((data) => setPokemonData(data.pokemon));
  }, []);

  const filteredPokemon = pokemonData.filter((pokemon) => {
    const nameMatch = pokemon.name.toLowerCase().includes(searchText.toLowerCase());
    const typeMatch =
      selectedTypes.length === 0 || selectedTypes.some((type) => pokemon.type.includes(type));
    const weaknessMatch =
      selectedWeaknesses.length === 0 || selectedWeaknesses.some((weakness) => pokemon.weaknesses.includes(weakness));

    return nameMatch && typeMatch && weaknessMatch;
  });

  const handleTypeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTypes((prevTypes) => [...prevTypes, value]);
    } else {
      setSelectedTypes((prevTypes) => prevTypes.filter((type) => type !== value));
    }
  };

  const handleWeaknessChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedWeaknesses((prevWeaknesses) => [...prevWeaknesses, value]);
    } else {
      setSelectedWeaknesses((prevWeaknesses) => prevWeaknesses.filter((weakness) => weakness !== value));
    }
  }
  return (
        <div className="container">
          <div className = "input">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name..."
        />
      </div>
      <div>
        <h3>Filter by Type:</h3>
        {['Grass', 'Fire', 'Water', 'Electric', 'flying', 'psychic', 'ice','ground', 'rock', 'fighting' ].map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={handleTypeChange}
            />
            {type}
          </label>
        ))}
      </div>
      <div>
        <h3>Filter by Weakness:</h3>
        {['Grass', 'Fire', 'Water', 'Electric', 'flying', 'psychic', 'ice','ground', 'rock', 'fighting'].map((weakness) => (
          <label key={weakness}>
            <input
              type="checkbox"
              value={weakness}
              checked={selectedWeaknesses.includes(weakness)}
              onChange={handleWeaknessChange}
            />
            {weakness}
          </label>
        ))}
      </div>
      <div>
        <ul>
          {filteredPokemon.map((pokemon) => (
            <li key={pokemon.num}>
              <strong>Name:</strong> {pokemon.name} <br />
              <strong>Number:</strong> {pokemon.num} <br />
              <strong>Type:</strong> {pokemon.type.join(', ')} <br />
              <strong>Weaknesses:</strong> {pokemon.weaknesses.join(', ')} <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PokemonDetails = ({ pokemon }) => {
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <p>
        <strong>Number:</strong> {pokemon.num}
      </p>
      <p>
        <strong>Type:</strong> {pokemon.type.join(', ')}
      </p>
      <p>
        <strong>Weaknesses:</strong> {pokemon.weaknesses.join(', ')}
      </p>
    </div>
  );
};

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div classname="background-image">
      <div className="app-container">
        <h1>Pokemon List</h1>
        <PokemonList onSelectPokemon={handlePokemonClick} /> 
        {/* {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />} */}
      </div>
    </div>
  );
};
export default App;



