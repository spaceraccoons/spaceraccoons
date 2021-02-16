import { GameState } from "./GameState";

/**
 * Event that represents a change in the current (client local) game state.
 */
export class GameStateChangeEvent extends Event {

    readonly #oldState: GameState;
    readonly #newState: GameState;

    constructor(oldState: GameState, newState: GameState) {
        super("gamestatechange", {
            bubbles: true,
            cancelable: false,
        });
        this.#oldState = oldState;
        this.#newState = newState;
    }

    public get oldState(): GameState {
        return this.#oldState;
    }

    public get newState(): GameState {
        return this.#newState;
    }

    public toString(): String {
        return `GameStateChangeEvent (${this.#oldState} -> ${this.#newState})`;
    }

}