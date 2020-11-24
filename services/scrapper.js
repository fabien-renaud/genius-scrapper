const axios = require('axios');
const cheerio = require('cheerio');

const scrapLyricsBySongURL = songURL => {
    console.log("SPAM");
    return axios.get(songURL)
        .then(async result => {
            const $ = await cheerio.load(result.data);
            const lyrics = $('.lyrics p').text();
            return lyrics.length > 0 ? lyrics : scrapLyricsBySongURL(songURL);
        })
        .catch(error => console.log(error));
};

module.exports = {
    scrapLyricsBySongURL
};
