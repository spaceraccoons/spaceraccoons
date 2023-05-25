/**
 * The game state can be used to determine the current state of a game.
 * Whenever a game is created, it is in state "created". It can then be
 * started to transition into state "running". From the "running" state
 * it is possible to transition to "paused" and back to "running" or
 * into the final state "terminated" which indicates that the game is
 * no longer playable.
 */
export var GameState;
(function (GameState) {
    /**
     * Game is not yet ready. Call start() to transition into "running" state.
     */
    GameState["CREATED"] = "created";
    /**
     * Game has been paused. Call unpause() to transition back into "running" state.
     */
    GameState["PAUSED"] = "paused";
    /**
     * Game is running.
     */
    GameState["RUNNING"] = "running";
    /**
     * Game has been terminated.
     */
    GameState["TERMINATED"] = "terminated";
})(GameState || (GameState = {}));
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZVN0YXRlLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJnYW1lL0dhbWVTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxDQUFOLElBQVksU0FzQlg7QUF0QkQsV0FBWSxTQUFTO0lBRWI7O09BRUc7SUFDSCxnQ0FBbUIsQ0FBQTtJQUVuQjs7T0FFRztJQUNILDhCQUFpQixDQUFBO0lBRWpCOztPQUVHO0lBQ0gsZ0NBQW1CLENBQUE7SUFFbkI7O09BRUc7SUFDSCxzQ0FBeUIsQ0FBQTtBQUVqQyxDQUFDLEVBdEJXLFNBQVMsS0FBVCxTQUFTLFFBc0JwQjtBQUFBLENBQUMifQ==