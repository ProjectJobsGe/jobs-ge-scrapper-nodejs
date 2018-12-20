const { getTarget } = require("./index");
const { getFilters, filterParser, flattenArray } = require("./helper");

const scrapeFilters = (filterName="cat") => {
                       return  getFilters(filterName)
                        .then((filters) => {
                          const filterPromises = filters.map((filter) => {
                            const route = `?page=1&${filterName}=${filter.val}`;
                            return getTarget(route)
                                .then((scrapper) => {
                                // check length of pages for current filter
                                const pages = scrapper(".pagebox").length + 1;
                                const pagePromises = [];

                                for (let i = 1; i <= pages; i++) {

                                    const route = `/?page=${i}&${filterName}=${filter.val}`;
                                    pagePromises[i-1] = getTarget(route)
                                                        .then((scrapper) => {
                                                            return filterParser({
                                                                            scrapper, 
                                                                            filter: filter.text, 
                                                                            filterName
                                                                        });
                                                                    });
                                }
                                return Promise.all(pagePromises);
                                });
                            });
                            return Promise.all(filterPromises);
                        })
                        .then((data) => flattenArray(data))
                        .catch((error) => console.error(error));
                    }

module.exports = scrapeFilters;