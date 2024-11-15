import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import {
  setPlayerName,
  setOpponentName,
  addPlayerDamage,
  addOpponentDamage,
} from "./store";

function GameBoard() {
  const dispatch = useDispatch();

  // Obtener el estado global de Redux
  const {
    playerName,
    opponentName,
    playerPokemon,
    opponentPokemon,
    playerDamage,
    opponentDamage,
  } = useSelector((state) => state);

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
          <PokemonCard name="Pikachu" damage={0} />
          <PokemonCard name="Blastoise" damage={0} />
          <PokemonCard name="Venusaur" damage={0} />
          <PokemonCard name="Gengar" damage={0} />
          <PokemonCard name="Eevee" damage={0} />
        </div>
        {/* Botón para agregar daño */}
        <button
          className="damage-button"
          onClick={() => handleAddDamage("player")}
        >
          Agregar Daño
        </button>
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
