const {JSDOM} = require('jsdom');

const scrapLyricsBySongURL = songURL => {
    return JSDOM.fromURL(songURL)
        .then(dom => dom.window.document.querySelector('p').textContent)
        .catch(error => console.log(error));
};

module.exports = {
    scrapLyricsBySongURL
};
