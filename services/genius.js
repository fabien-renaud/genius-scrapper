const axios = require('axios');

const bearer = process.env.bearer;
const url = 'https://api.genius.com/search';
const options = query => ({
    params: {
        q: query
    },
    headers: {
        Authorization: `Bearer ${bearer}`
    }
});

const getSongsByArtist = artistName => {
    return axios.get(url, options(artistName))
        .then(result => {
            const hits = result.data.response.hits;
            return hits.filter(hit => hit.result.primary_artist.name.toLowerCase() === artistName.toLowerCase())
        })
        .catch(error => console.log(error));
};

module.exports = {
    getSongsByArtist
};
