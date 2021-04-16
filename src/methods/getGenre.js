const { load } = require("cheerio");

/**
 * 
 * @param {import('../../util/RequestHandler')} request 
 * @param {import('../../util/constants')} config 
 * @param {String} genre 
 */
module.exports = async (request, config, genre) => {
    try {
        const { data } = await request.get(config.genre(genre));
        const $ = load(data);

        const last_page = Number($(".pagination > a").last().text().trim());
        const cards = [];
        for (let i = 1; i <= last_page; i++) {
            if (i == 1) {
                const cardObj = {};
                take($, cardObj);
                cards[i-1] = {
                    page: i,
                    data: cardObj
                };
            } else {
                const cardObj = {};
                const { data: pageData } = await request.get(config.genre(genre) + `/page/${i}`);
                const $page = load(pageData);
                take($page, cardObj);
                cards[i-1] = {
                    page: i,
                    data: cardObj
                };
            }
        }
        return cards;
    } catch {
        return undefined;
    }
};

function take($, cardObj) {
    const cardsEl = $(".relat > article");
    cardsEl.each((indexCard, elementCard) => {
        const cardEl = $(elementCard).find(".animepost");

        const posx = cardEl.find(".animposx");
        const info = cardEl.find(".stooltip");

        // Posx Meta
        const batchTy = posx.find("a > .data > .type").text().trim();
        const url = posx.find("a").attr("href");
        const image = posx.find("a > .content-thumb > img").attr("src");
        const rating_score = Number(posx.find("a > .content-thumb > .score").text().trim());
        const type = posx.find("a > .content-thumb > .type").text().trim();

        // Info
        const title = info.find(".title").text().trim();
        const _genres = info.find(".genres > .mta > a");
        const genres = [];
        _genres.each((genreIndex, genreElement) => {
            genres[genreIndex] = {
                name: $(genreElement).text().trim(),
                url: $(genreElement).attr("href")
            };
        });
        const muchSeen = Number(info.find(".metadata > span").last().text().replace(/[A-z]/gi, "").trim());
        cardObj[indexCard] = {
            title, url, image, rating_score, type, batch: batchTy, genres, seen: muchSeen
        };
    });
    return cardObj;
} 