const { load } = require("cheerio");
const constants = require("../util/constants");
const RequestHandler = require("../util/RequestHandler");

module.exports = class Samehada {
    constructor() {
        this.request = RequestHandler;
        this.config = constants;

        // initialize.
        this.init();

        // List method
        this.list = async(letter = "A") => {
            return await (require("./methods/list"))(this.request, this.config, letter);
        };

        // Batch method
        this.batch = async() => {
            return await (require("./methods/batch"))(this.request, this.config);
        };

        // Popular method
        this.popular = async() => {
            return await (require("./methods/popular"))(this.request, this.config);
        };

        // Search method
        /**
         * 
         * @param {String} query Nama anime yang ingin dicari. Contoh: Boruto
         * @returns 
         */
        this.search = async(query) => {
            return await (require("./methods/search"))(this.request, this.config, query);
        };

        // getAnime method
        /**
         * 
         * @param {String} url Samehadaku Anime URL
         * @returns {Promise<{title:string;url:string;description:string;image:string;genres:{name:string;url:string}[]} | undefined>}
         */
        this.get = async (url) => {
            return await (require("./methods/getAnime"))(this.request, this.config, url);
        };

        // getGenre method
        /**
         * 
         * @param {String} genreName List anime berdasarkan nama genre
         * @returns {Promise<{page:number;data:any[];} | undefined>}
         */
        this.genre = async (genreName) => {
            return await (require('./methods/getGenre'))(this.request, this.config, genreName);
        }
    }

    async init() {
        const { data } = await this.request.get("#");
        const $ = load(data);

        const regex = /(http)?(https):?\/\/(samehadaku.vip)\/(season)\//gi;
        const season = $("#menu-item-8690 > a").attr("href").replace(regex, "").trim();
        this.config.season = season;
    }
};