const { default: axios } = require("axios");
const { baseURL } = require("./constants");

module.exports = axios.create({
    baseURL,
    headers: {
        "User-Agent": "Samehadaku-Scraper Agent"
    }
});