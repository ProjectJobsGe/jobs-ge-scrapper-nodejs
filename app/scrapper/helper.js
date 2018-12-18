const { getTarget } = require("./index");

const flattenArray = (arr) => {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
    }, []);
}

const getFilters = (filterName = "cat") => getTarget().then((scrapper) => {
  const filters = [];
  scrapper(`select[name=${filterName}] option`).each((index, element) => {
      if (index > 0) {
          filters[index - 1] = scrapper(element).val();
      }
  });
  return filters; 
})

const pageParser = (scrapper, selector = ".regularEntries tr") => {
  const pageList = [];
  scrapper(selector).each((index, element) => {
    if (index > 0) {
        const job = {};
        job["id"] = scrapper(element).find("td a").first().attr("href").replace(/\//g, "");
        job["title"] = scrapper(element).find("td a").first().text();
        job["client"] = scrapper(element).find("td a").last().text();
        job["startDate"] = scrapper(element).find("td").last().prev().text();
        job["endDate"] = scrapper(element).find("td").last().text();
  
        pageList[index - 1] = job;
    }
  });

  return pageList;
}

const categoryParser = ({scrapper, category}) => {
  const jobsList = []
  scrapper(".regularEntries tr").each((index, element) => {
    if (index > 0) {
      const job = {};
      job["id"] = scrapper(element).find("td a").first().attr("href").replace(/\//g, "");
      job["category"] = category;

      jobsList[index - 1] = job;
    }
  });

  return jobsList;
}

const locationParser = ({scrapper, location}) => {
  const jobsList = []
  scrapper(".regularEntries tr").each((index, element) => {
    if (index > 0) {
      const job = {};
      job["id"] = scrapper(element).find("td a").first().attr("href").replace(/\//g, "");
      job["location"] = location;

      jobsList[index - 1] = job;
    }
  });

  return jobsList;
}

const parseArrays = (scrapperArr, parserFn) => scrapperArr.map((scrapper) => parserFn(scrapper));

module.exports = { flattenArray, pageParser, categoryParser, locationParser, parseArrays, getFilters };