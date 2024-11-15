import React from "react";
import PokemonCard from "./PokemonCard";

function GameBoard({
  playerName,
  opponentName,
  playerDamage,
  opponentDamage,
  handleNameChange,
  addDamage,
}) {
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
          <PokemonCard name="Charizard" damage={playerDamage} />
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
        <button className="damage-button" onClick={() => addDamage("player")}>
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
          <PokemonCard name="Machamp" damage={opponentDamage} />
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
        <button className="damage-button" onClick={() => addDamage("opponent")}>
          Agregar Daño
        </button>
      </div>
    </div>
  );
}

export default GameBoard;
