const { getTarget } = require("./index");
const { flattenArray } = require("./helper");

const scrapePages = () => getTarget()
                            .then(($) => {
                                const pages = $(".pagebox").length;
                                const promises = [];
                                for(let i = 0; i <= pages; i++) {
                                    const route = `/?page${i + 1}`;
                                    promises[i] = getTarget(route);
                                }

                                return Promise.all(promises);
                            })
                            .then((arrPages) => {
                                const totalLists = arrPages.map(($) => {
                                    const pageList = [];
                                    $(".regularEntries tr").each((index, element) => {
                                        if (index > 0) {
                                            const job = {};
                                            job["title"] = $(element).find("td a").first().text();
                                            pageList[index - 1] = job;
                                        }
                                    });

                                    return pageList;
                                });

                                return Promise.all(totalLists);
                            }).then((totalLists) => flattenArray(totalLists));



module.exports = scrapePages;