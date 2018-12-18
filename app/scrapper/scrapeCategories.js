const { getTarget } = require("./index");
const { getFilters, categoryParser, flattenArray } = require("./helper");

const scrapeCategories = () => getFilters("cat")
                               .then((categories) => {
                                   const promises = categories.map((cat) => {
                                       const route = `?page=1&keyword=&cat=${cat}`;
                                       return getTarget(route)
                                              .then((scrapper) => categoryParser({scrapper, category: cat}));
                                   });
                                   return Promise.all(promises);
                               }).then((data) => flattenArray(data));



module.exports = scrapeCategories;