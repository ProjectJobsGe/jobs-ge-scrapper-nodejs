const { flattenArray, pageParser, parseArrays, getScrapperArr } = require("./helper");

const scrapePages = (scrapper) => {
                                const scrapperArr = getScrapperArr({scrapper});
                                return Promise.all(scrapperArr)
                                              .then((pagesArr) => parseArrays(pagesArr, pageParser))
                                              .then((totalLists) => flattenArray(totalLists))
                                              .catch((error) => console.error(error));
                            }

module.exports = scrapePages;