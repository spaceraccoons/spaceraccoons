/**
 * The game state can be used to determine the current state of a game.
 * Whenever a game is created, it is in state "created". It can then be
 * started to transition into state "running". From the "running" state
 * it is possible to transition to "paused" and back to "running" or
 * into the final state "terminated" which indicates that the game is
 * no longer playable.
 */
export enum GameState {

        /**
         * Game is not yet ready. Call start() to transition into "running" state.
         */
        CREATED = "created",

        /**
         * Game has been paused. Call unpause() to transition back into "running" state.
         */
        PAUSED = "paused",
    
        /**
         * Game is running.
         */
        RUNNING = "running",
    
        /**
         * Game has been terminated.
         */
        TERMINATED = "terminated",

};