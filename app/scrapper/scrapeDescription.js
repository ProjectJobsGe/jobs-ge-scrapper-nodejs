const {getTarget} = require("./index");

const scrapeDescription = (list) => {
    const promises = list.map((job, index) => {
        const route = `${job.jobsGeId}/`;
        return getTarget(route)
        .then((scrapper) => {
            job["description"] = scrapper("#wrapper .content .ad tr")
                                .last()
                                .find("td")
                                .text();
            console.log(job);
            return job;
        })
        .catch((error) => console.error(error));
    });
    return Promise.all(promises);
}

module.exports = scrapeDescription;