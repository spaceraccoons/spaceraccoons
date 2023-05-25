import { Game } from "./Game.js";
import { GameState } from "./GameState.js";
/**
 * Event that represents a change in the current (client local) game state.
 */
export declare class GameStateChangeEvent extends Event {
    #private;
    /**
     * Creates a new event indicating a change in a game's state.
     */
    constructor(game: Game, oldState: GameState, newState: GameState);
    get game(): Game;
    get oldState(): GameState;
    get newState(): GameState;
    toString(): string;
}
