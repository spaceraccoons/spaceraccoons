import {Game} from "./Game.js";
import {GameState} from "./GameState.js";

/**
 * Event that represents a change in the current (client local) game state.
 */
export class GameStateChangeEvent extends Event {

    public static get TYPE(): string {
        return "spaceraccoons-gamestatechangeevent";
    }

    readonly #game: Game;
    readonly #oldState: GameState;
    readonly #newState: GameState;

    /**
     * Creates a new event indicating a change in a game's state.
     */
    public constructor(game: Game, oldState: GameState, newState: GameState) {
        super(GameStateChangeEvent.TYPE, {
            bubbles: true,
            cancelable: false,
        });
        this.#game = game;
        this.#oldState = oldState;
        this.#newState = newState;
    }

    public get game() {
        return this.#game;
    }

    public get oldState() {
        return this.#oldState;
    }

    public get newState() {
        return this.#newState;
    }

    public toString() {
        return `GameStateChangeEvent (${this.#oldState} -> ${this.#newState})`;
    }

}