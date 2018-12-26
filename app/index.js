const fs = require('fs');
const scrapePages = require('./scrapper/scrapePages');
const scrapeFilters = require('./scrapper/scrapeFilters');
const scrapeDescription = require('./scrapper/scrapeDescription');
const mapFiltersToJobs = require('./mapFiltersToJobs');
const { getTarget } = require('./scrapper/index');

/*
 * Function scrapes and parses jobs & filters
 * then combines data into one array
 * then scrapes job descriptions according to jobsGeId
 * and adds it to job object
 * finally jobs array is saved as json file in local temp folder.
 */
const scrapeData = () => getTarget().then((scrapper) => {
  const jobListPromise = scrapePages(scrapper);
  const categoryListPromise = scrapeFilters('cat');
  const locationListPromise = scrapeFilters('location');
  const adTypeListPromise = scrapeFilters('view');

  return Promise.all([jobListPromise, categoryListPromise, locationListPromise, adTypeListPromise]);
})
  .then(([jobList, categoryList, locationList, adTypeList]) => mapFiltersToJobs({
    jobList,
    filters: [categoryList, locationList, adTypeList],
  }))
  .then(jobList => scrapeDescription(jobList))
  .then((jobList) => {
    const json = JSON.stringify(jobList, null, 2);
    fs.writeFileSync('./temp/jobs.json', json);
  })
  .catch(error => console.error(error));

module.exports = scrapeData;
