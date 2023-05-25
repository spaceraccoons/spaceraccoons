var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _GameStateChangeEvent_game, _GameStateChangeEvent_oldState, _GameStateChangeEvent_newState;
const NAME = "gamestatechangeevent";
/**
 * Event that represents a change in the current (client local) game state.
 */
export class GameStateChangeEvent extends Event {
    /**
     * Creates a new event indicating a change in a game's state.
     */
    constructor(game, oldState, newState) {
        super(NAME, {
            bubbles: true,
            cancelable: false,
        });
        _GameStateChangeEvent_game.set(this, void 0);
        _GameStateChangeEvent_oldState.set(this, void 0);
        _GameStateChangeEvent_newState.set(this, void 0);
        __classPrivateFieldSet(this, _GameStateChangeEvent_game, game, "f");
        __classPrivateFieldSet(this, _GameStateChangeEvent_oldState, oldState, "f");
        __classPrivateFieldSet(this, _GameStateChangeEvent_newState, newState, "f");
    }
    get game() {
        return __classPrivateFieldGet(this, _GameStateChangeEvent_game, "f");
    }
    get oldState() {
        return __classPrivateFieldGet(this, _GameStateChangeEvent_oldState, "f");
    }
    get newState() {
        return __classPrivateFieldGet(this, _GameStateChangeEvent_newState, "f");
    }
    toString() {
        return `GameStateChangeEvent (${__classPrivateFieldGet(this, _GameStateChangeEvent_oldState, "f")} -> ${__classPrivateFieldGet(this, _GameStateChangeEvent_newState, "f")})`;
    }
}
_GameStateChangeEvent_game = new WeakMap(), _GameStateChangeEvent_oldState = new WeakMap(), _GameStateChangeEvent_newState = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZVN0YXRlQ2hhbmdlRXZlbnQuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbImdhbWUvR2FtZVN0YXRlQ2hhbmdlRXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBR0EsTUFBTSxJQUFJLEdBQUcsc0JBQXNCLENBQUM7QUFFcEM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsS0FBSztJQU0zQzs7T0FFRztJQUNILFlBQW1CLElBQVUsRUFBRSxRQUFtQixFQUFFLFFBQW1CO1FBQ25FLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDUixPQUFPLEVBQUUsSUFBSTtZQUNiLFVBQVUsRUFBRSxLQUFLO1NBQ3BCLENBQUMsQ0FBQztRQVhFLDZDQUFZO1FBQ1osaURBQXFCO1FBQ3JCLGlEQUFxQjtRQVUxQix1QkFBQSxJQUFJLDhCQUFTLElBQUksTUFBQSxDQUFDO1FBQ2xCLHVCQUFBLElBQUksa0NBQWEsUUFBUSxNQUFBLENBQUM7UUFDMUIsdUJBQUEsSUFBSSxrQ0FBYSxRQUFRLE1BQUEsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ1gsT0FBTyx1QkFBQSxJQUFJLGtDQUFNLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNmLE9BQU8sdUJBQUEsSUFBSSxzQ0FBVSxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDZixPQUFPLHVCQUFBLElBQUksc0NBQVUsQ0FBQztJQUMxQixDQUFDO0lBRU0sUUFBUTtRQUNYLE9BQU8seUJBQXlCLHVCQUFBLElBQUksc0NBQVUsT0FBTyx1QkFBQSxJQUFJLHNDQUFVLEdBQUcsQ0FBQztJQUMzRSxDQUFDO0NBRUoifQ==