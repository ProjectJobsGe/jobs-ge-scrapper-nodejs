const fs = require('fs');
const scrapePages = require("./scrapper/scrapePages");
const scrapeFilters = require("./scrapper/scrapeFilters");
const scrapeDescription = require("./scrapper/scrapeDescription");
const mapFiltersToJobs = require("./mapFiltersToJobs");
const {getTarget} = require("./scrapper/index");

const scrapeData = () => getTarget().then((scrapper) => {
    const jobListPromise = scrapePages(scrapper);
    const categoryListPromise = scrapeFilters("cat");
    const locationListPromise = scrapeFilters("location");
    const adTypeListPromise = scrapeFilters("view");

    return Promise.all([jobListPromise, categoryListPromise, locationListPromise, adTypeListPromise]);
})
.then(([jobList, categoryList, locationList, adTypeList]) => {
    return mapFiltersToJobs({
        jobList,
        filters: [categoryList, locationList, adTypeList]
    });
})
.then((jobList) => scrapeDescription(jobList))
.then((jobList) => {
    const json = JSON.stringify(jobList, null, 2);
    fs.writeFile("./data/jobs.json", json);
})
.catch((error) => console.error(error));

module.exports = scrapeData;