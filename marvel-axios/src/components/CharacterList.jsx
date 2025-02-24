import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchCharacters } from '../api';

const CharacterList = ({ onSelectCharacter }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCharacters()
            .then((response) => {
                setCharacters(response.data.data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error fetching characters:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="charact-list">
            {characters.map((character) => (
                <div
                    key={character.id}
                    className="character-card"
                    onClick={() => {
                        console.log('Character selected:', character.name);
                        onSelectCharacter(character.id)
                        
                    }}
                >
                    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
                    <h3>{character.name}</h3>
                </div>
            ))}
        </div>
    );
};

CharacterList.propTypes = {
    onSelectCharacter: PropTypes.func
};

export default CharacterList;