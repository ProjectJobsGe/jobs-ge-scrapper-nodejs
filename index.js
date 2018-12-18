const { getTarget } = require("./app/scrapper/index");
const scrapePages = require("./app/scrapper/scrapePages");
const scrapeFilters = require("./app/scrapper/scrapeFilters");


console.log("App started!");

getTarget().then((scrapper) => {
    const jobListPromise = scrapePages(scrapper);
    const categoryListPromise = scrapeFilters("cat");
    const locationListPromise = scrapeFilters("location");

    return Promise.all([jobListPromise, categoryListPromise, locationListPromise]);
}).then(([jobList, categoryList, locationList]) => {
    console.log("jobList length:", jobList.length);
    console.log("job 1", jobList[0]);
    console.log("category length", categoryList.length);
    console.log("category #1", categoryList[0]);
    console.log("location length", locationList.length);
    console.log("location #1", locationList[0]);
    console.log("finished");
}).catch((error) => console.error(error));;
