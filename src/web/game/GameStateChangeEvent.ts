import {Game} from "./Game.js";
import {GameState} from "./GameState.js";

const NAME = "gamestatechangeevent";

/**
 * Event that represents a change in the current (client local) game state.
 */
export class GameStateChangeEvent extends Event {

    readonly #game: Game;
    readonly #oldState: GameState;
    readonly #newState: GameState;

    /**
     * Creates a new event indicating a change in a game's state.
     */
    public constructor(game: Game, oldState: GameState, newState: GameState) {
        super(NAME, {
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