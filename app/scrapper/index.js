// combine scrapped data
const rp = require("request-promise");
const cheerio = require("cheerio");
const CONFIG = require("../config");

const ROOT_URL = CONFIG.URL;

// returns scrapper function
const getTarget = (route = "") => rp(
    {
    uri: `${ROOT_URL}/${route}`, timeout: 1600000, simple: false
    })
    .then((html) => cheerio.load(html))
    .catch((error) => console.error(error));

module.exports = { getTarget };