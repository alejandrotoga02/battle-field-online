import React from "react";
import { Provider } from "react-redux";
import GameBoard from "./GameBoard";
import store from "./store"; // Importar el store
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <GameBoard />
    </Provider>
  );
}

export default App;
