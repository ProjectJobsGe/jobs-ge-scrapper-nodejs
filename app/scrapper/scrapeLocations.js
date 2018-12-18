const { getTarget } = require("./index");
const { getFilters, locationParser, flattenArray } = require("./helper");

const scrapeLocations = () => getFilters("location")
                               .then((locations) => {
                                   const promises = locations.map((location) => {
                                       const route = `?page=1&keyword=&location=${location}`;
                                       return getTarget(route)
                                              .then((scrapper) => locationParser({scrapper, location}));
                                   });
                                   return Promise.all(promises);
                               }).then((data) => flattenArray(data));



module.exports = scrapeLocations;