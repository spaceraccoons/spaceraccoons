import { GameState } from "./GameState.js";
import { GameStateChangeEvent } from "./GameStateChangeEvent.js";

const DEFAULT_CANVAS_WIDTH: number = 960;
const DEFAULT_CANVAS_HEIGHT: number = 540;

enum ObservedAttributes {
    STATE ="state",
};

export class Game extends HTMLElement {

    static get observedAttributes(): string[] {
        return Object.keys(ObservedAttributes)
    }

    readonly #canvas: HTMLCanvasElement;

    constructor() {

        super();

        const shadow = this.attachShadow({
            mode: "open",
            delegatesFocus: true
        });

        const style = shadow.appendChild(document.createElement("style"));

        this.#canvas = shadow.appendChild(document.createElement("canvas"));
        this.#canvas.width = DEFAULT_CANVAS_WIDTH;
        this.#canvas.height = DEFAULT_CANVAS_HEIGHT;

        ((/** @type {CSSStyleDeclaration} */ style) => {
            this.style.width = style.width = `${DEFAULT_CANVAS_WIDTH}px`;
            this.style.height = style.height = `${DEFAULT_CANVAS_HEIGHT}px`;
            style.position = "absolute";
            style.margin = "auto";
            style.left = style.top = style.right = style.bottom = "0";
            style.imageRendering = "pixelated";
            style.imageRendering = "crisp-edges";
        })(this.#canvas.style);

        new MutationObserver(mutations => {
            mutations
            .filter(mutation => mutation.attributeName !== null && [ "width", "height", "style" ].includes(mutation.attributeName))
            .forEach(mutationRecord => {
                this.style.width = `${this.#canvas.width}px`;
                this.style.height = `${this.#canvas.height}px`;
            });
        }).observe(this.#canvas, { attributes : true, attributeFilter : [ "width", "height", "style" ] });

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

    protected connectedCallback(): void {
        if (!this.hasAttribute("state")) {
            this.setAttribute("state", GameState.CREATED);
        }
    }

    protected attributeChangedCallback(name: ObservedAttributes, oldValue: string, newValue: string): void {

        if (oldValue === newValue) {
            return;
        }

        try {
            (this[name] as any) = newValue;
            if (name === "state") {
                this.dispatchEvent(new GameStateChangeEvent(this, oldValue as GameState, newValue as GameState));
            }
        } catch (e) {
            console.error(e);
            (this[name] as any) = oldValue;
        }

    }

    public override toString(): string {
        return `Space Raccoons Game (${this.state.toString()})`
    }

    public get state(): GameState {
        return (this.getAttribute("state") as GameState ?? GameState.CREATED);
    }

    public set state(state: GameState) {
        if (Object.keys(GameState).includes(state)) {
            this.setAttribute("state", state);
        } else {
            throw new Error(`Invalid game state: "${state}"`);
        }
    }

    public get canvas(): HTMLCanvasElement {
        return this.#canvas;
    }

    public async start(): Promise<void> {
        return this.unpause();
    }

    public async pause(): Promise<void> {
        // TODO Implement
    }

    public async unpause(): Promise<void> {
        // TODO Implement
    }

    public async stop(): Promise<void> {
        // TODO Implement
    }

}
Object.seal(Game);

customElements.define("spaceraccoons-game", Game);