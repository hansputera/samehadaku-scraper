const samehada = new (require("./src/Samehada"))();

(async() => {
    const aa = await samehada.genre('action');
    console.log(aa);
})();