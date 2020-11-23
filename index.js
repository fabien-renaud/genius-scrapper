const Genius = require('./services/genius');
const Scraper = require('./services/scrapper');

const run = async () => {
    const songs = await Genius.getSongsByArtist('Freeze Corleone');
    songs.map(async song => {
        const lyrics = await Scraper.scrapLyricsBySongURL(song.result.url);
        console.log(song.result.full_title);
        console.log(lyrics);
    });
};

run();
