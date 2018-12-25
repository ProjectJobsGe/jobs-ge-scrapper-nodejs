// combine scrapped data
const rp = require("promise-request-retry");
const cheerio = require("cheerio");
const CONFIG = require("../config");

const ROOT_URL = CONFIG.URL;

// returns cheerio scrapper function, if request fails it will retry 5 times
const getTarget = (route = "") => rp(
    {
        uri: `${ROOT_URL}/${route}`,
        timeout: 0, 
        simple: false,
        retry: 5,
        transform: (html) => cheerio.load(html),
        headers: {'User-Agent':'request' }
    })
    .catch((error) => console.error(error));

module.exports = { getTarget };