const scrapeData = require('./app/index');

console.log('App started!');

scrapeData().then((jobs) => {
  // TODO implement storing jobs
  console.log(jobs);
});
