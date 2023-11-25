const axios = require('axios');

const API_ENDPOINT = 'YOUR_API_ENDPOINT';
const API_KEY = process.env.API_KEY;

async function fetchFromAPI() {
    try {
        const response = await axios.get(API_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
    }
}

module.exports = { fetchFromAPI };