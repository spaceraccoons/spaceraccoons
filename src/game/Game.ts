import { GameState } from './GameState';

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 800;

// Various symbols
const CANVAS_SYMBOL = Symbol("canvas");

export class Game extends HTMLElement {

    static get observedAttributes() {
        return [
            "width",
            "height",
            "paused"
        ];
    }

    private [CANVAS_SYMBOL]: HTMLCanvasElement;

    public constructor() {
        super();
        const shadow = this.attachShadow({
            mode: "open"
        });
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        shadow.appendChild(this.canvas);
        this.state = GameState.CREATED;
    }

    connectedCallback() {
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case "width":
                this.canvas.width = Number(newValue);
                break;
            case "height":
                this.canvas.height = Number(newValue);
                break;
            case "paused":
                // TODO
                break;
            default:
                break;
        }
    }

    public toString() {
        return `Space Raccoons Game (${this.state.toString()})`
    }

    public get state() {
        return (this.getAttribute("state") || GameState.CREATED) as GameState;
    }

    public set state(state: GameState) {
        this.setAttribute("state", state);
    }

    public get canvas() {
        return this[CANVAS_SYMBOL];
    }

    public set canvas(canvas: HTMLCanvasElement) {
        this[CANVAS_SYMBOL] = canvas;
    }

    public get width() {
        return Number(this.getAttribute("width") || DEFAULT_WIDTH);
    }

    public set width(width: number) {
        this.setAttribute("width", String(width));
    }

    public get height() {
        return Number(this.getAttribute("height") || DEFAULT_HEIGHT);
    }

    public set height(height: number) {
        this.setAttribute("height", String(height));
        this.canvas.height = this.height;
    }

    public async start(): Promise<void> {
        this.unpause();
    }

    public async pause(): Promise<void> {}

    public async unpause(): Promise<void> {}

    public async stop(): Promise<void> {}

}
