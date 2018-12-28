const scrapeData = require('./app/index');

// TODO implement sending jobs to API.
const sendJobsToAPI = jobs => console.log(jobs);
console.log('App started!');

console.log('Starting scrapping jobs');
scrapeData().then((jobs) => {
  console.log('Jobs scrapped!');
  sendJobsToAPI(jobs);
});
