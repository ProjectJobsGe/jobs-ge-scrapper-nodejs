const { getTarget } = require('./index');

// flattens array of arrays into one array
const flattenArray = arr => arr
  .reduce(
    (flat, toFlatten) => flat.concat(
      Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten,
    ), [],
  );

// input: cheerio object(scrapper), filter type, filter name(location or category)
// output: function return array of cheerio objects(scrappers) correctly configured for set routes
const getScrapperArr = ({ scrapper, filter = '', filterName = '' }) => {
  const pages = scrapper('.pagebox').length;
  const filterStr = filter ? `&${filterName}=${filter}` : '';
  const scrapperArr = [];
  for (let i = 0; i <= pages; i += 1) {
    const route = `/?page${i + 1}${filterStr}`;
    scrapperArr[i] = getTarget(route);
  }
  return scrapperArr;
};

// input: filter name(location or cat)
// output: returns array of filter values on page
const getFilters = filterName => getTarget().then((scrapper) => {
  const filters = [];
  scrapper(`select[name=${filterName}] option`).each((index, element) => {
    if (index > 0) {
      const filter = {
        val: scrapper(element).val(),
        text: scrapper(element).text(),
      };
      filters[index - 1] = filter;
    }
  });
  return filters;
});

// parses page and returns array of jobs on one page
const pageParser = (scrapper, selector = '.regularEntries tr') => {
  const pageList = [];
  scrapper(selector).each((index, element) => {
    if (index > 0) {
      const job = {};
      job.id = scrapper(element).find('td a').first().attr('href')
        .replace(/\//g, '');
      job.title = scrapper(element).find('td a').first().text();
      job.client = scrapper(element).find('td a').last().text();
      job.startDate = scrapper(element).find('td').last().prev()
        .text();
      job.endDate = scrapper(element).find('td').last().text();

      pageList[index - 1] = job;
    }
  });

  return pageList;
};

// parses given page via scrapper and returns array of objects containing Ids & filter names
const filterParser = ({ scrapper, filter, filterName }) => {
  const jobsList = [];
  scrapper('.regularEntries tr').each((index, element) => {
    if (index > 0) {
      // if false there are 0 vacansies for given filter
      if (scrapper(element).find('td a').first().attr('href')) {
        const job = {};
        job.id = scrapper(element).find('td a').first().attr('href')
          .replace(/\//g, '');
        job[filterName] = filter;

        jobsList[index - 1] = job;
      }
    }
  });

  return jobsList;
};

// recieves array of individual cheerio scrapper objects and html parser function as input
// outputs array of arrays per provided cheerio scrapper object
const parseArrays = (scrapperArr, parserFn) => scrapperArr.map(scrapper => parserFn(scrapper));

module.exports = {
  flattenArray, pageParser, filterParser, parseArrays, getFilters, getScrapperArr,
};
