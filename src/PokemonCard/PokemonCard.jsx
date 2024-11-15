import React, { useState, useEffect } from "react";
import "./PokemonCard.css";

const PokemonCard = ({ name, damage }) => {
  const [cardImage, setCardImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=name:${name}`
        );
        const data = await response.json();

        // Verifica si se encontró alguna carta
        if (data.data && data.data.length > 0) {
          setCardImage(data.data[0].images.small); // Obtiene la imagen de la carta
        } else {
          setCardImage(null); // Si no hay carta, establece imagen en null
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
        setCardImage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [name]); // Se vuelve a ejecutar cuando cambia el nombre del Pokémon

  return (
    <div className="pokemon-card">
      <h4>{name}</h4>
      {loading ? (
        <p>Cargando...</p>
      ) : cardImage ? (
        <img src={cardImage} alt={name} className="pokemon-card-image" />
      ) : (
        <p>Imagen no disponible</p>
      )}
      {damage > 0 && <p>Daño: {damage}</p>}
    </div>
  );
};

export default PokemonCard;
