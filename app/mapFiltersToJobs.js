const mapFiltersToJobs = ({jobList, filters}) => {
    return jobList.map((job) => {
        filters.forEach((filterArr) => {
            const filter = filterArr.find(filter => filter.id === job.id);
            if (filter) {
                for (let key in filter) {
                    if (filter.hasOwnProperty(key) && key !== "id") {
                        job[key] = filter[key];
                    }
                }
            }
        });

        return {
            jobsGeId: job.id,
            title: job.title,
            publicationDate: job.startDate,
            expirationDate: job.endDate,
            organization: job.client,
            category: job.cat || "სხვა",
            location: job.location || "ნებისმიერი",
            adType: job.view || "სხვა",
            text: job.description || ""
        };
    });
}

module.exports = mapFiltersToJobs;