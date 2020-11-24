const express = require('express');
const app = express();
const fs = require('fs');

const Genius = require('./services/genius');
const Scraper = require('./services/scrapper');

app.get('/artist/:artistName', async (req, res) => {
    const {artistName} = req.params;
    const songs = await Genius.getSongsByArtist(artistName);
    console.log(artistName);
    Promise.all(songs.map(async song => {
        const title = song.result.full_title;
        const lyrics = await Scraper.scrapLyricsBySongURL(song.result.url);
        const dirPath = `./out/${artistName}`;
        if(!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
        fs.writeFileSync(`${dirPath}/${title}.txt`, lyrics, () => {return null});
        return {title, lyrics};
    })).then(songsLyrics => res.send(songsLyrics).status(200));
});

app.listen(3000, () => {console.log('Server running on port 3000')});
