module.exports = class SamehadaError extends Error {
    /**
     * 
     * @param {String} message Pesan Error dalam bentuk string.
     */
    constructor(message) {
        super(message);

        this.name = "SamehadaError";
    }
};