import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import PokemonCard from "./PokemonCard";
import {
  setPlayerName,
  setOpponentName,
  addPlayerDamage,
  addOpponentDamage,
  addPokemonToBench,
} from "./store";

function GameBoard() {
  const dispatch = useDispatch();
  const [newPokemonName, setNewPokemonName] = useState("");
  const [pokemonSuggestions, setPokemonSuggestions] = useState([]);

  // Obtener el estado global de Redux
  const {
    playerName,
    opponentName,
    playerPokemon,
    opponentPokemon,
    playerDamage,
    opponentDamage,
    playerBench,
  } = useSelector((state) => state);

  const customStyles = {
    control: (styles) => ({
      ...styles,
      minHeight: 40, // Ajusta la altura del control
      width: '100%', // Asegura que ocupe todo el ancho disponible
      maxWidth: 500, // Limita el ancho máximo si es necesario
      padding: '0 10px', // Espaciado interno
    }),
    input: (styles) => ({
      ...styles,
      width: '100%', // Asegura que el input ocupe todo el ancho disponible
    }),
    menu: (styles) => ({
      ...styles,
      maxWidth: 500, // Limita el ancho del menú desplegable
    }),
    option: (styles) => ({
      ...styles,
      padding: '10px', // Agrega un poco de relleno a las opciones
    }),
  };

  // Función para cambiar el nombre del jugador
  const handleNameChange = (player, name) => {
    if (player === "player") {
      dispatch(setPlayerName(name));
    } else if (player === "opponent") {
      dispatch(setOpponentName(name));
    }
  };

  // Función para agregar daño
  const handleAddDamage = (player) => {
    if (player === "player") {
      dispatch(addPlayerDamage(10));
    } else if (player === "opponent") {
      dispatch(addOpponentDamage(10));
    }
  };

  // Función para obtener las sugerencias de Pokémon de la API
  const fetchPokemonSuggestions = async (query) => {
    if (query.length > 2) {
      // Solo buscar cuando el query tiene más de 2 caracteres
      console.log("herer query", query);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`
        );
        const data = await response.json();
        const filteredSuggestions = data.results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
        setPokemonSuggestions(filteredSuggestions);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    }
  };

  // Manejo de cambios en el campo de búsqueda
  const handlePokemonSearch = (query) => {
    if (query !== "" && query.length > 2) {
      setNewPokemonName(query);
      fetchPokemonSuggestions(query); // Buscar sugerencias cuando cambia el texto
    }
  };

  // Función para agregar Pokémon a la banca
  const handleAddPokemonToBench = () => {
    if (newPokemonName) {
      dispatch(addPokemonToBench(newPokemonName)); // Agregar el Pokémon a la banca
      setNewPokemonName(""); // Limpiar el campo de nombre
      setPokemonSuggestions([]); // Limpiar las sugerencias
    }
  };

  // Mapeamos las sugerencias para que react-select las reciba
  const pokemonOptions = pokemonSuggestions.map((pokemon) => ({
    value: pokemon.name,
    label: pokemon.name,
  }));

  return (
    <div className="game-area">
      {/* Tablero del Jugador */}
      <div className="player-label">
        <input
          type="text"
          value={playerName}
          onChange={(e) => handleNameChange("player", e.target.value)}
          className="name-input"
        />
      </div>
      <div className="board">
        {/* Pokémon Activo */}
        <div className="zone active">
          <h3>Pokémon Activo</h3>
          <PokemonCard name={playerPokemon} damage={playerDamage} />
        </div>

        {/* Banca */}
        <div className="zone bench">
          <h3>Banca</h3>
          {/* Mostrar Pokémon en la banca dinámicamente */}
          {playerBench.map((pokemonName, index) => (
            <PokemonCard key={index} name={pokemonName} damage={0} />
          ))}
        </div>

        {/* Botón para agregar daño */}
        <button
          className="damage-button"
          onClick={() => handleAddDamage("player")}
        >
          Agregar Daño
        </button>

        {/* Agregar Pokémon a la banca con Autocomplete */}
        <div className="add-pokemon">
          <Select
            options={pokemonOptions} // Pasamos las opciones de Pokémon
            onChange={(selectedOption) => {
              setNewPokemonName(selectedOption.value ?? ""); // Actualiza el nombre seleccionado
            }}
            placeholder="Buscar Pokémon..."
            value={pokemonOptions.find(
              (option) => option.value === newPokemonName
            )} // Para controlar el valor seleccionado
            onInputChange={handlePokemonSearch} // Actualiza las sugerencias al escribir
            isClearable // Permite borrar la selección
            styles={customStyles}
          />
          <button onClick={handleAddPokemonToBench}>
            Agregar Pokémon a la banca
          </button>
        </div>
      </div>

      {/* Tablero del Oponente */}
      <div className="player-label player2">
        <input
          type="text"
          value={opponentName}
          onChange={(e) => handleNameChange("opponent", e.target.value)}
          className="name-input"
        />
      </div>
      <div className="board">
        {/* Pokémon Activo */}
        <div className="zone active">
          <h3>Pokémon Activo</h3>
          <PokemonCard name={opponentPokemon} damage={opponentDamage} />
        </div>

        {/* Banca */}
        <div className="zone bench">
          <h3>Banca</h3>
          <PokemonCard name="Jigglypuff" damage={0} />
          <PokemonCard name="Snorlax" damage={0} />
          <PokemonCard name="Dragonite" damage={0} />
          <PokemonCard name="Alakazam" damage={0} />
          <PokemonCard name="Nidoking" damage={0} />
        </div>
        {/* Botón para agregar daño */}
        <button
          className="damage-button"
          onClick={() => handleAddDamage("opponent")}
        >
          Agregar Daño
        </button>
      </div>
    </div>
  );
}

export default GameBoard;
