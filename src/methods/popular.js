const { load } = require("cheerio");

/**
 * 
 * @param {import('../../util/RequestHandler')} request
 */
module.exports = async (request) => {
    const { data } = await request.get("#");
    const $ = load(data);

    const pops = [];
    const popsElement = $("#menu-item-5558 > ul.sub-menu > li");

    popsElement.each((index, element) => {
        const popObj = {};

        const popElement = $(element);
        popObj["name"] = popElement.text().trim();
        popObj["url"] = popElement.find("a").attr("href");

        pops[index] = popObj;
    });
    
    return pops;
};