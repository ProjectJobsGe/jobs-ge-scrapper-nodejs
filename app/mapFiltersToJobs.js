const mapFiltersToJobs = ({ jobList, filters }) => jobList.map((job) => {
  const result = { ...job };
  filters.forEach((filterArr, index) => {
    if (!filterArr) throw new Error(`filterArr in mapFiltersToJobs at index ${index} is undefined!`);
    const currentFilter = filterArr.find(filter => filter.id === result.id);
    if (currentFilter) {
      Object.keys(currentFilter).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(currentFilter, key) && key !== 'id') {
          result[key] = currentFilter[key];
        }
      });
    }
  });

  return {
    jobsGeId: result.id,
    title: result.title,
    publicationDate: result.startDate,
    expirationDate: result.endDate,
    organization: result.client,
    category: result.cat || 'სხვა',
    location: result.location || 'ნებისმიერი',
    adType: result.view || 'სხვა',
    text: result.description || '',
  };
});

module.exports = mapFiltersToJobs;
