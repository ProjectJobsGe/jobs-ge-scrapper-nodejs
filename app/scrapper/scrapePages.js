const { flattenArray, pageParser, parseArrays, getScrapperArr } = require("./helper");

// receives cheerio object
// checks amount of pages, iterates through them and creates seperate cheerio objects for each page
// parses through each page and collects data
// finally flattens array of arrays into one array and returns list of all available jobs on site
const scrapePages = (scrapper) => {
                                const scrapperArr = getScrapperArr({scrapper});
                                return Promise.all(scrapperArr)
                                              .then((pagesArr) => parseArrays(pagesArr, pageParser))
                                              .then((totalLists) => flattenArray(totalLists))
                                              .catch((error) => console.error(error));
                            }

module.exports = scrapePages;