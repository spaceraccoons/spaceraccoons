import { GameState } from "./GameState";
import { GameStateChangeEvent } from "./GameStateChangeEvent";

const DEFAULT_CANVAS_WIDTH = 960;
const DEFAULT_CANVAS_HEIGHT = 540;

export class Game extends HTMLElement {

    static get observedAttributes(): string[] {
        return [
            "paused"
        ];
    }

    readonly #canvas: HTMLCanvasElement;

    public constructor() {

        super();

        const shadow = this.attachShadow({
            mode: "open",
            delegatesFocus: true
        });

        this.#canvas = document.createElement("canvas");
        this.#canvas.width = DEFAULT_CANVAS_WIDTH;
        this.#canvas.height = DEFAULT_CANVAS_HEIGHT;

        ((style: CSSStyleDeclaration) => {
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

        this.style.display = "block";
        shadow.appendChild(this.canvas);
        this.state = GameState.CREATED;
    }

    connectedCallback(): void {
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        switch (name) {
            case "paused":
                if (oldValue === newValue) {
                    return;
                }
                switch (newValue) {
                    case "true":
                        this.pause();
                        this.dispatchEvent(new GameStateChangeEvent(GameState.RUNNING, GameState.PAUSED));
                        break;
                    case "false":
                        this.unpause();
                        this.dispatchEvent(new GameStateChangeEvent(GameState.PAUSED, GameState.RUNNING));
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    public toString(): string {
        return `Space Raccoons Game (${this.state.toString()})`
    }

    public get state(): GameState {
        return (this.getAttribute("state") || GameState.CREATED) as GameState;
    }

    public set state(state: GameState) {
        this.setAttribute("state", state);
    }

    public get canvas(): HTMLCanvasElement {
        return this.#canvas;
    }

    public async start(): Promise<void> {
        this.unpause();
    }

    public async pause(): Promise<void> {}

    public async unpause(): Promise<void> {}

    public async stop(): Promise<void> {}

}
