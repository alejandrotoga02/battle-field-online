import { createStore } from 'redux';

// Acción para cambiar el nombre del jugador
const SET_PLAYER_NAME = 'SET_PLAYER_NAME';
const SET_OPPONENT_NAME = 'SET_OPPONENT_NAME';

// Acción para cambiar el Pokémon activo
const SET_PLAYER_POKEMON = 'SET_PLAYER_POKEMON';
const SET_OPPONENT_POKEMON = 'SET_OPPONENT_POKEMON';

// Acción para agregar daño
const ADD_PLAYER_DAMAGE = 'ADD_PLAYER_DAMAGE';
const ADD_OPPONENT_DAMAGE = 'ADD_OPPONENT_DAMAGE';

// Estado inicial
const initialState = {
  playerName: 'Jugador 1',
  opponentName: 'Jugador 2',
  playerPokemon: 'Charizard',
  opponentPokemon: 'Machamp',
  playerDamage: 0,
  opponentDamage: 0,
};

// Reducer para manejar las acciones
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER_NAME:
      return { ...state, playerName: action.payload };
    case SET_OPPONENT_NAME:
      return { ...state, opponentName: action.payload };
    case SET_PLAYER_POKEMON:
      return { ...state, playerPokemon: action.payload };
    case SET_OPPONENT_POKEMON:
      return { ...state, opponentPokemon: action.payload };
    case ADD_PLAYER_DAMAGE:
      return { ...state, playerDamage: state.playerDamage + action.payload };
    case ADD_OPPONENT_DAMAGE:
      return { ...state, opponentDamage: state.opponentDamage + action.payload };
    default:
      return state;
  }
}

// Crear el store de Redux
const store = createStore(reducer);

export default store;

// Acciones
export const setPlayerName = (name) => ({ type: SET_PLAYER_NAME, payload: name });
export const setOpponentName = (name) => ({ type: SET_OPPONENT_NAME, payload: name });
export const setPlayerPokemon = (pokemon) => ({ type: SET_PLAYER_POKEMON, payload: pokemon });
export const setOpponentPokemon = (pokemon) => ({ type: SET_OPPONENT_POKEMON, payload: pokemon });
export const addPlayerDamage = (damage) => ({ type: ADD_PLAYER_DAMAGE, payload: damage });
export const addOpponentDamage = (damage) => ({ type: ADD_OPPONENT_DAMAGE, payload: damage });
