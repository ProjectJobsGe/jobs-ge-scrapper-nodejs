const scrapeData = require('./app/index');

const sendJobsToAPI = (jobs) => {
  // TODO implement sending jobs to API.
  return true;
};

console.log('App started!');

console.log('Starting scrapping jobs');
scrapeData().then((jobs) => {
  console.log('Jobs scrapped!');
  sendJobsToAPI(jobs);
});

