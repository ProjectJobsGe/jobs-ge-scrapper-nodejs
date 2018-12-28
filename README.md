# jobs-ge-scrapper-nodejs

## Travis Status
[![Build Status](https://travis-ci.org/ProjectJobsGe/jobs-ge-scrapper-nodejs.svg?branch=master)](https://travis-ci.org/ProjectJobsGe/jobs-ge-scrapper-nodejs)

To run locally:

add following code to index.js:

```const scrapeData = require("./app");

console.log("App started!");

scrapeData().then((jobs) => {
    // console.log(jobs);
});
```

and run following commands:

`npm install or yarn add`

`npm run start or yarn run start`
