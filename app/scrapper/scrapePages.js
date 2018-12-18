const { getTarget } = require("./index");
const { flattenArray, pageParser, parseArrays } = require("./helper");

const scrapePages = () => getTarget()
                            .then((scrapper) => {
                                const pages = scrapper(".pagebox").length;
                                const scrapperArr = [];
                                for(let i = 0; i <= pages; i++) {
                                    const route = `/?page${i + 1}`;
                                    scrapperArr[i] = getTarget(route);
                                }

                                return Promise.all(scrapperArr);
                            })
                            .then((pagesArr) => parseArrays(pagesArr, pageParser))
                            .then((totalLists) => flattenArray(totalLists));



module.exports = scrapePages;