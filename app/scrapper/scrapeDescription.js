const {getTarget} = require("./index");

const scrapeDescription = (list) => {
    const promises = list.map((job) => {
        const route = `${job.jobsGeId}/`;
        return getTarget(route)
        .then((scrapper) => {
            job["text"] = scrapper("#wrapper .content .ad tr")
                                .last()
                                .find("td")
                                .text();
            return job;
        })
        .catch((error) => console.error(error));
    });
    return Promise.all(promises);
}

module.exports = scrapeDescription;