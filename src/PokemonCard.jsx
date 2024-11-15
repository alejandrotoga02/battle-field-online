import React from "react";

function PokemonCard({ name, damage }) {
  return (
    <div className="pokemon-card">
      {name} {damage > 0 && `- Daño: ${damage}`}
    </div>
  );
}

export default PokemonCard;
