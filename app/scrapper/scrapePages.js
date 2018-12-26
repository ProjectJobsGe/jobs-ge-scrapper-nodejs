const {
  flattenArray, pageParser, parseArrays, getScrapperArr,
} = require('./helper');

/*
 * Receives cheerio object, checks amount of pages,
 * iterates through them and creates seperate cheerio objects for each page,
 * Parses through each page and collects data.
 * Finally flattens array of arrays into one array and returns list of all available jobs on site.
 */
const scrapePages = (scrapper) => {
  const scrapperArr = getScrapperArr({ scrapper });
  return Promise.all(scrapperArr)
    .then(pagesArr => parseArrays(pagesArr, pageParser))
    .then(totalLists => flattenArray(totalLists))
    .catch(error => console.error(error));
};

module.exports = scrapePages;
