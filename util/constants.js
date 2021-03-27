module.exports = {
    baseURL: "https://samehadaku.vip/",
    /**
     * 
     * @param {String} anime 
     * @returns {String}
     */
    anime: (anime) => `anime/${encodeURIComponent(anime)}`,
    /**
     * 
     * @param {String} str 
     * @returns {String}
     */
    episode: (str) => `${encodeURIComponent(str)}`,
    listAnime: "a-z",
    letters: [
        "0-9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
    ],
    batch: "daftar-batch",
    /**
     * 
     * @param {Number} page 
     * @returns {String}
     */
    batchPage: (page) => `daftar-batch/page/${page}`,
    season: "", // akan di ganti saat inisialisasi.
    /**
     * 
     * @param {String} anime 
     * @returns {String}
     */
    search: (anime) => `?s=${encodeURIComponent(anime)}`,
    /**
     * 
     * @param {Number} page 
     * @param {String} anime 
     * @returns 
     */
    searchPage: (page, anime) => `/page/${page}/?s=${encodeURIComponent(anime)}`,
    /**
     * 
     * @param {String} genreName 
     * @returns 
     */
    genre: (genreName) => `/genre/${encodeURIComponent(genreName)}`
};