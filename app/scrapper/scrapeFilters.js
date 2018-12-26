const { getTarget } = require('./index');
const { getFilters, filterParser, flattenArray } = require('./helper');

const scrapeFilters = (filterName = 'cat') => getFilters(filterName)
  .then((filters) => {
    const filterPromises = filters.map((filter) => {
      let route = `?page=1&${filterName}=${filter.val}`;
      return getTarget(route)
        .then((scrapPager) => {
          // check length of pages for current filter
          const pages = scrapPager('.pagebox').length + 1;
          const pagePromises = [];

          for (let i = 1; i <= pages; i += 1) {
            route = `/?page=${i}&${filterName}=${filter.val}`;
            pagePromises[i - 1] = getTarget(route)
              .then(scrapper => filterParser({
                scrapper,
                filter: filter.text,
                filterName,
              }));
          }
          return Promise.all(pagePromises);
        });
    });
    return Promise.all(filterPromises);
  })
  .then(data => flattenArray(data))
  .catch(error => console.error(error));

module.exports = scrapeFilters;
