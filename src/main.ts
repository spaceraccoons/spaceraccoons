import * as game from "./game"

(async () => {
    console.log("Defining custom element \"spaceraccoons-game\"", game.Game);
    customElements.define("spaceraccoons-game", game.Game);
})();
