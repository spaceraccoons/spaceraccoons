var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Game_canvas;
import { GameState } from "./GameState.js";
import { GameStateChangeEvent } from "./GameStateChangeEvent.js";
const DEFAULT_CANVAS_WIDTH = 960;
const DEFAULT_CANVAS_HEIGHT = 540;
var ObservedAttributes;
(function (ObservedAttributes) {
    ObservedAttributes["STATE"] = "state";
})(ObservedAttributes || (ObservedAttributes = {}));
;
export class Game extends HTMLElement {
    static get observedAttributes() {
        return Object.keys(ObservedAttributes);
    }
    constructor() {
        super();
        _Game_canvas.set(this, void 0);
        const shadow = this.attachShadow({
            mode: "open",
            delegatesFocus: true
        });
        const style = shadow.appendChild(document.createElement("style"));
        __classPrivateFieldSet(this, _Game_canvas, shadow.appendChild(document.createElement("canvas")), "f");
        __classPrivateFieldGet(this, _Game_canvas, "f").width = DEFAULT_CANVAS_WIDTH;
        __classPrivateFieldGet(this, _Game_canvas, "f").height = DEFAULT_CANVAS_HEIGHT;
        ((/** @type {CSSStyleDeclaration} */ style) => {
            this.style.width = style.width = `${DEFAULT_CANVAS_WIDTH}px`;
            this.style.height = style.height = `${DEFAULT_CANVAS_HEIGHT}px`;
            style.position = "absolute";
            style.margin = "auto";
            style.left = style.top = style.right = style.bottom = "0";
            style.imageRendering = "pixelated";
            style.imageRendering = "crisp-edges";
        })(__classPrivateFieldGet(this, _Game_canvas, "f").style);
        new MutationObserver(mutations => {
            mutations
                .filter(mutation => mutation.attributeName !== null && ["width", "height", "style"].includes(mutation.attributeName))
                .forEach(mutationRecord => {
                this.style.width = `${__classPrivateFieldGet(this, _Game_canvas, "f").width}px`;
                this.style.height = `${__classPrivateFieldGet(this, _Game_canvas, "f").height}px`;
            });
        }).observe(__classPrivateFieldGet(this, _Game_canvas, "f"), { attributes: true, attributeFilter: ["width", "height", "style"] });
        style.innerHTML =
            `
            :host {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                display: block;
                image-rendering: pixelated;
                image-rendering: crisp-edges;
            }
            
            :host:focus {
                outline: 0;
            }
            `;
        this.style.display = "block";
        this.state = GameState.CREATED;
    }
    connectedCallback() {
        if (!this.hasAttribute("state")) {
            this.setAttribute("state", GameState.CREATED);
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        try {
            this[name] = newValue;
            if (name === "state") {
                this.dispatchEvent(new GameStateChangeEvent(this, oldValue, newValue));
            }
        }
        catch (e) {
            console.error(e);
            this[name] = oldValue;
        }
    }
    toString() {
        return `Space Raccoons Game (${this.state.toString()})`;
    }
    get state() {
        return (this.getAttribute("state") ?? GameState.CREATED);
    }
    set state(state) {
        if (Object.keys(GameState).includes(state)) {
            this.setAttribute("state", state);
        }
        else {
            throw new Error(`Invalid game state: "${state}"`);
        }
    }
    get canvas() {
        return __classPrivateFieldGet(this, _Game_canvas, "f");
    }
    async start() {
        return this.unpause();
    }
    async pause() {
        // TODO Implement
    }
    async unpause() {
        // TODO Implement
    }
    async stop() {
        // TODO Implement
    }
}
_Game_canvas = new WeakMap();
Object.seal(Game);
customElements.define("spaceraccoons-game", Game);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiZ2FtZS9HYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVqRSxNQUFNLG9CQUFvQixHQUFXLEdBQUcsQ0FBQztBQUN6QyxNQUFNLHFCQUFxQixHQUFXLEdBQUcsQ0FBQztBQUUxQyxJQUFLLGtCQUVKO0FBRkQsV0FBSyxrQkFBa0I7SUFDbkIscUNBQWMsQ0FBQTtBQUNsQixDQUFDLEVBRkksa0JBQWtCLEtBQWxCLGtCQUFrQixRQUV0QjtBQUFBLENBQUM7QUFFRixNQUFNLE9BQU8sSUFBSyxTQUFRLFdBQVc7SUFFakMsTUFBTSxLQUFLLGtCQUFrQjtRQUN6QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBSUQ7UUFFSSxLQUFLLEVBQUUsQ0FBQztRQUpILCtCQUEyQjtRQU1oQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzdCLElBQUksRUFBRSxNQUFNO1lBQ1osY0FBYyxFQUFFLElBQUk7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFbEUsdUJBQUEsSUFBSSxnQkFBVyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBQSxDQUFDO1FBQ3BFLHVCQUFBLElBQUksb0JBQVEsQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUM7UUFDMUMsdUJBQUEsSUFBSSxvQkFBUSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQztRQUU1QyxDQUFDLENBQUMsa0NB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