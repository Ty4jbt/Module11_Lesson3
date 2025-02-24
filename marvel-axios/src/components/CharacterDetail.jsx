import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchCharacterDetails } from "../api";

const CharacterDetail = ({ characterId }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("CharacterDetail received ID:", characterId);
        if (characterId) {
        fetchCharacterDetails(characterId)
            .then((response) => {
                console.log("Fetched character details:", response.data.data.results[0]);
                setCharacter(response.data.data.results[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching character details:", error);
                setLoading(false);
            });
        }
    }, [characterId]);

    console.log("CharacterDetail rendering with character:", character);

    if (loading) {
    return <p>Loading character details...</p>; 
  } else if (!character) {
    return <p>No character selected.</p>; 
  } else {
    // Render the character details
    return (
      <div className="character-detail">
        <h2>{character.name}</h2>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        <p>{character.description || "No description available."}</p>
        {/* <h3>Comics:</h3>
        <ul>
            {character.comics.items.map((comic, index) => (
                <li key={index}>{comic.name}</li>
            ))}
        </ul> */}
      </div>
    );
  }
};

CharacterDetail.propTypes = {
    characterId: PropTypes.number,
};

export default CharacterDetail;
