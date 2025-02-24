import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './styles/CharacterDetail.css';

const CharacterDetail = ({ character }) => {
  const [characterDetails, setCharacterDetails] = useState(null);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      if (!character) return;
      
      setLoading(true);
      try {
        const PUBLIC_KEY = '19c7c6debae6234eab8c98a95f06fc07';
        const HASH = '04e1de745373f524309c33a32697990b';
        
        // Fetch detailed character information
        const detailResponse = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${character.id}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`
        );
        
        setCharacterDetails(detailResponse.data.data.results[0]);
        
        // Fetch character comics
        const comicsResponse = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${character.id}/comics?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}&limit=10`
        );
        
        setComics(comicsResponse.data.data.results);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch character details. Please try again.');
        setLoading(false);
        console.error('Error fetching character details:', err);
      }
    };

    fetchCharacterDetails();
  }, [character]);

  if (!character) {
    return <div className="select-character">Please select a character to view details.</div>;
  }

  if (loading) {
    return <div className="loading">Loading character details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="character-detail">
        <div className="character-header">
            <img 
                src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`} 
                alt={character.name} 
                className="detail-thumbnail"
            />
            <div className="character-info">
                <h2>{character.name}</h2>
                <p className="character-description">
                    {character.description ? character.description : "No description available."}
                </p>
            </div>
        </div>
      
      <div className="comics-section">
        <h3>Associated Comics</h3>
        {comics.length > 0 ? (
            <div className="comics-list">
                {comics.map(comic => (
                <div key={comic.id} className="comic-item">
                    <img 
                    src={`${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`} 
                    alt={comic.title} 
                    className="comic-thumbnail"
                    />
                    <h4>{comic.title}</h4>
                </div>
                ))}
            </div>
            ) : (
            <p>No comics available for this character.</p>
        )}
      </div>
    </div>
  );
};

CharacterDetail.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.shape({
      path: PropTypes.string,
      extension: PropTypes.string
    })
  })
}

export default CharacterDetail;
