import React, { useState } from 'react';
import './App.css';
import GameBoard from './GameBoard';

function App() {
  // Estado para almacenar el daño de cada jugador
  const [playerDamage, setPlayerDamage] = useState(0);
  const [opponentDamage, setOpponentDamage] = useState(0);

  // Estado para almacenar los nombres de los jugadores
  const [playerName, setPlayerName] = useState('Jugador 1');
  const [opponentName, setOpponentName] = useState('Jugador 2');

  // Función para agregar daño
  const addDamage = (player) => {
    if (player === 'player') {
      setPlayerDamage(playerDamage + 10);
    } else if (player === 'opponent') {
      setOpponentDamage(opponentDamage + 10);
    }
  };

  // Función para manejar el cambio de nombre
  const handleNameChange = (player, name) => {
    if (player === 'player') {
      setPlayerName(name);
    } else if (player === 'opponent') {
      setOpponentName(name);
    }
  };

  return (
    <div>
      <GameBoard
        playerName={playerName}
        opponentName={opponentName}
        playerDamage={playerDamage}
        opponentDamage={opponentDamage}
        handleNameChange={handleNameChange}
        addDamage={addDamage}
      />
    </div>
  );
}

export default App;
