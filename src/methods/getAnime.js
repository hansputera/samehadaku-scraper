const { load } = require("cheerio");
const SamehadaError = require("../../util/SamehadaError");

/**
 * 
 * @param {import('../../util/RequestHandler')} request 
 * @param {import('../../util/constants')} config 
 * @param {String} url 
 */
module.exports = async (request, config, url) => {
    if (!/(http)?(https):?\/\/samehadaku.vip\/anime\/.*([A-z0-9]){3}/gi.test(url)) throw new SamehadaError("Invalid URL");
    try {
        const { data } = await request.get(url);
        const $ = load(data);

        const info = $(".infoanime");

        const title = info.find(".entry-title").text().trim();
        const rating = Number(info.find(".archiveanime-rating > [itemprop=\"ratingValue\"]").text().trim());
        const description = info.find(".desc").text();
        const image = info.find(".anmsa").attr("src");

        const details = {};
        $(".infox > .spe > span").each((_, el) => {
            const detailEl = $(el);

            details[detailEl.find("b").text().trim().toLowerCase()] = detailEl.not("b").text().trim();
        });
        const genres = [];
        $(".genre-info > a").each((index, element) => {
            genres[index] = {
                name: $(element).text().trim(),
                url: $(element).attr("href")
            };
        });

        return { title, description, image, rating, genres };
    } catch(e) {
        return undefined;
    }
};