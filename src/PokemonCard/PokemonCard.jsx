import React, { useState, useEffect } from 'react';

import "./PokemonCard.css";

function PokemonCard({ name, damage }) {
  const [cardImage, setCardImage] = useState(null); // Para guardar la imagen de la carta
  const [loading, setLoading] = useState(true); // Estado de carga

  // Efecto para obtener la imagen de la carta de Pokémon desde la API
  useEffect(() => {
    const fetchCardData = async () => {
      setLoading(true); // Activar la carga
      try {
        // Consultamos la API de Pokémon TCG con el nombre del Pokémon
        const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${name}`);
        const data = await response.json();

        // Si encontramos cartas, tomamos la imagen
        if (data.data && data.data.length > 0) {
          setCardImage(data.data[0].images.small); // Asignamos la imagen de la carta
        } else {
          setCardImage(null); // Si no encontramos la carta, ponemos la imagen en null
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
        setCardImage(null); // En caso de error, limpiamos la imagen
      } finally {
        setLoading(false); // Desactivamos el estado de carga
      }
    };

    fetchCardData();
  }, [name]); // Solo se ejecuta cuando el nombre cambia

  return (
    <div className="pokemon-card">
      <h3>{name}</h3>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        cardImage ? (
          <img src={cardImage} alt={name} className="pokemon-card-image" />
        ) : (
          <p>Imagen no disponible</p>
        )
      )}
      {damage > 0 && <p>Daño: {damage}</p>}
    </div>
  );
}

export default PokemonCard;
