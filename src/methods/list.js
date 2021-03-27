const { load } = require("cheerio");

/**
 * 
 * @param {import('../../util/RequestHandler')} request Main Request
 * @param {import('../../util/constants')} config Samehada Configurations
 * @param {0-9" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"} letter
 */
module.exports = async (request, config, letter = "A") => {
    const { data } = await request.get(config.listAnime + `?letter=${letter}`);
    const $ = load(data);

    const cards = [];
    const elements = $(".az-list > article");

    elements.each((index, element) => {
        const itemElement = $(element).find(".item");

        const url = itemElement.find(".thumb").attr("href");
        const image = itemElement.find(".thumb > img").attr("src");
        const title = itemElement.find(".thumb > img").attr("title");
        const shortDesc = itemElement.find(".info > p").text().trim();
        cards[index] = {
            title, url, image, shortDesc
        };
    });
    return cards;
};