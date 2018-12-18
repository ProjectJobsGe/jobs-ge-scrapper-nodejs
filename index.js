const scrapePages = require("./app/scrapper/scrapePages");
const scrapeCategories = require("./app/scrapper/scrapeCategories");
const scrapeLocations = require("./app/scrapper/scrapeLocations");
console.log("App started!");

const jobListPromise = scrapePages();
const categoryListPromise = scrapeCategories();
const locationListPromise = scrapeLocations();


Promise.all([jobListPromise, categoryListPromise, locationListPromise]).then(([jobList, categoryList, locationList]) => {
    console.log("jobList length:", jobList.length);
    console.log("job 1", jobList[0]);
    console.log("category length", categoryList.length);
    console.log("category #1", categoryList[0]);
    console.log("location length", locationList.length);
    console.log("location #1", locationList[0]);
    console.log("finished");
}).catch((error) => console.error(error));