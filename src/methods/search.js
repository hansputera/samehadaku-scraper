const { load } = require("cheerio");

/**
 * 
 * @param {import('../../util/RequestHandler')} request 
 * @param {import('../../util/constants')} config 
 * @param {String} anime
 * 
 */
module.exports = async (request, config, anime) => {
    const { data } = await request.get(config.search(anime));
    const $ = load(data);

    const NotFound = $(".relat > .notfound").length > 0;
    if (NotFound) return [];

    const PaginationAny = $(".pagination").length > 0;
    if (PaginationAny) {
        const lastPage = Number($(".pagination > a").last().text().trim());
        const cards = [];
        await handlePage(request, config, cards, lastPage, anime);
        return cards.filter(card => card);
    } else {
        const cards = [];
        await handlePage(request, config, cards, 1, anime);
        return cards.filter(card => card);
    }
};

/**
 * 
 * @param {import('../../util/RequestHandler')} request 
 * @param {import('../../util/constants')} config 
 * @param {any[]} cards
 * @param {Number} page 
 * @param {String} anime
 * 
 */
async function handlePage(request, config, cardsPage, page, anime) {
    for (let i = 1; i <= page; i++) {
        const cards = [];
        const { data } = await request.get(config.searchPage(i, anime));
        const $ = load(data);

        const cardsElement = $(".relat > article");
        cardsElement.each((index, element) => {
            const cardElement = $(element).find(".animepost");
            const posx = cardElement.find(".animposx");
            const info = cardElement.find(".stooltip");
    
            // Posx Meta
            const Ty = posx.find("a > .data > .type").text().trim();
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
            cards[index] = { title, url, image, rating_score, type, category: Ty, genres, seen: muchSeen };
        });
        cardsPage[i] = {
            page: i,
            data: cards
        };
    }
}