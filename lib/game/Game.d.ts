import { GameState } from "./GameState.js";
declare enum ObservedAttributes {
    STATE = "state"
}
export declare class Game extends HTMLElement {
    #private;
    static get observedAttributes(): string[];
    constructor();
    protected connectedCallback(): void;
    protected attributeChangedCallback(name: ObservedAttributes, oldValue: string, newValue: string): void;
    toString(): string;
    get state(): GameState;
    set state(state: GameState);
    get canvas(): HTMLCanvasElement;
    start(): Promise<void>;
    pause(): Promise<void>;
    unpause(): Promise<void>;
    stop(): Promise<void>;
}
export {};
