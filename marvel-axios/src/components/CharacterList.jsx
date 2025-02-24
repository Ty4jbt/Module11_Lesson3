import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './styles/CharacterList.css';

const CharacterList = ({ onCharacterSelect }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);


    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const PUBLIC_KEY = '19c7c6debae6234eab8c98a95f06fc07';
                const HASH = '04e1de745373f524309c33a32697990b';
                
                const response = await axios.get(
                `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}&limit=20`
                );
            
                setCharacters(response.data.data.results);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch characters. Please check your API keys.');
                setLoading(false);
                console.error('Error fetching characters:', err);
            }
        };

    fetchCharacters();
    }, []);

    const handleCharacterClick = (character) => {
        setSelectedCharacterId(character.id);
        onCharacterSelect(character);
    };

    if (loading) {
        return <div className="loading">Loading characters...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
     }

    return (
        <div className="character-list">
            <h2>Marvel Characters</h2>
            <div className="characters-grid">
                {characters.map(character => (
                    <div 
                        key={character.id} 
                        className={`character-card ${selectedCharacterId === character.id ? 'active' : ''}`}
                        onClick={() => handleCharacterClick(character)}
                    >
                        <img 
                            src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`} 
                            alt={character.name} 
                            className="character-thumbnail"
                        />
                        <h3 className="character-name">{character.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

CharacterList.propTypes = {
  onCharacterSelect: PropTypes.func.isRequired
};

export default CharacterList;