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
                                            job["id"] = $(element).find("td a").first().attr("href").replace(/\//g, "");
                                            job["title"] = $(element).find("td a").first().text();
                                            job["client"] = $(element).find("td a").last().text();
                                            job["startDate"] = $(element).find("td").last().prev().text();
                                            job["endDate"] = $(element).find("td").last().text();

                                            pageList[index - 1] = job;
                                        }
                                    });

                                    return pageList;
                                });

                                return Promise.all(totalLists);
                            }).then((totalLists) => flattenArray(totalLists));



module.exports = scrapePages;