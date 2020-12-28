/**
 * The game state can be used to determine the current state of a game.
 * Whenever a game is created, it is in state "created". It can then be
 * started to transition into state "running". From the "running" state
 * it is possible to transition to "paused" and back to "running" or
 * into the final state "terminated" which indicates that the game is
 * no longer playable.
 */
export type GameState = "created" | "paused" | "running" | "terminated";

export namespace GameState {

    /** Game is not yet ready. Call start() to transition into "running" state. */
    export const CREATED: GameState = "created";

    /** Game has been paused. Call unpause() to transition back into "running" state. */
    export const PAUSED: GameState = "paused";

    /** Game is running. */
    export const RUNNING: GameState = "running";

    /** Game has been teriminated. */
    export const TERMINATED: GameState = "terminated"

    export const fromString = ((str: string): GameState => {
        
        return "terminated";
    });
}
