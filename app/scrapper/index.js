// combine scrapped data
const rp = require("request-promise");
const cheerio = require("cheerio");
const CONFIG = require("../config");

const ROOT_URL = CONFIG.URL;

// returns scrapper function
const getTarget = (route = "") => rp(`${ROOT_URL}/${route}`).then((html) => cheerio.load(html));

module.exports = { getTarget };