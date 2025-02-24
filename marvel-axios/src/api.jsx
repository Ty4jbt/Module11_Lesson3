import axios from 'axios';

const API_KEY = '19c7c6debae6234eab8c98a95f06fc07';
const HASH = '04e1de745373f524309c33a32697990b';
const baseURL = 'https://gateway.marvel.com/v1/public';

export const fetchCharacters = () => {
    return axios.get(`${baseURL}/characters?ts=1&apikey=${API_KEY}&hash=${HASH}`);
};

export const fetchCharacterDetails = async (characterId) => {
    try {
        const response = await axios.get(`${baseURL}/characters/${characterId}`, {
            params: {
                ts: 1,
                apikey: API_KEY,
                hash: HASH
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching character details:', error);
        throw error;
    }
};