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
var _Launcher_img;
var ObservedAttributes;
(function (ObservedAttributes) {
    ObservedAttributes["VISIBLE"] = "visible";
})(ObservedAttributes || (ObservedAttributes = {}));
export class Launcher extends HTMLElement {
    static get observedAttributes() {
        return Object.keys(ObservedAttributes);
    }
    constructor() {
        super();
        _Launcher_img.set(this, void 0);
        const shadow = this.attachShadow({
            mode: "open",
            delegatesFocus: true
        });
        const style = shadow.appendChild(document.createElement("style"));
        __classPrivateFieldSet(this, _Launcher_img, shadow.appendChild(document.createElement("img")), "f");
        __classPrivateFieldGet(this, _Launcher_img, "f").id = "logo";
        __classPrivateFieldGet(this, _Launcher_img, "f").src = "assets/appicon.iconset/icon_256x256.png";
        __classPrivateFieldGet(this, _Launcher_img, "f").alt = "Space Raccoons Logo";
        style.innerHTML =
            `:host {
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            position: absolute;
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--launcher-background-color);
            z-index: 9999;
        }
        
        @keyframes pulse {
            0%, 100% {
                filter: brightness(100%) drop-shadow(0 0 0 #ffff0033) saturate(75%);
                transform: scale(95%);
            }
            50% {
                filter: brightness(130%) drop-shadow(0 0 32px #ffff00cc) saturate(100%);
                transform: scale(100%);
            }
        }
        
        :host ${__classPrivateFieldGet(this, _Launcher_img, "f").tagName.toLowerCase()}#${__classPrivateFieldGet(this, _Launcher_img, "f").id} {
            animation: pulse 8s infinite;
            will-change: filter;
        }`;
    }
    connectedCallback() {
        // Not (yet) implemented.
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
    }
    toString() {
        return "Space Raccoons Launcher";
    }
}
_Launcher_img = new WeakMap();
Object.seal(Launcher);
customElements.define("spaceraccoons-launcher", Launcher);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbImxhdW5jaGVyL0xhdW5jaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLElBQUssa0JBRUo7QUFGRCxXQUFLLGtCQUFrQjtJQUNuQix5Q0FBbUIsQ0FBQTtBQUN2QixDQUFDLEVBRkksa0JBQWtCLEtBQWxCLGtCQUFrQixRQUV0QjtBQUVELE1BQU0sT0FBTyxRQUFTLFNBQVEsV0FBVztJQUVyQyxNQUFNLEtBQUssa0JBQWtCO1FBQ3pCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFJRDtRQUVJLEtBQUssRUFBRSxDQUFDO1FBSkgsZ0NBQXVCO1FBTTVCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0IsSUFBSSxFQUFFLE1BQU07WUFDWixjQUFjLEVBQUUsSUFBSTtTQUN2QixDQUFDLENBQUM7UUFFSCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUVsRSx1QkFBQSxJQUFJLGlCQUFRLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFBLENBQUM7UUFDOUQsdUJBQUEsSUFBSSxxQkFBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDckIsdUJBQUEsSUFBSSxxQkFBSyxDQUFDLEdBQUcsR0FBRyx5Q0FBeUMsQ0FBQztRQUMxRCx1QkFBQSxJQUFJLHFCQUFLLENBQUMsR0FBRyxHQUFHLHFCQUFxQixDQUFDO1FBRXRDLEtBQUssQ0FBQyxTQUFTO1lBQ2Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQTBCUSx1QkFBQSxJQUFJLHFCQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLHVCQUFBLElBQUkscUJBQUssQ0FBQyxFQUFFOzs7VUFHckQsQ0FBQztJQUVQLENBQUM7SUFFUyxpQkFBaUI7UUFDdkIseUJBQXlCO0lBQzdCLENBQUM7SUFFUyx3QkFBd0IsQ0FBQyxJQUF3QixFQUFFLFFBQWdCLEVBQUUsUUFBZ0I7UUFFM0YsSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ3ZCLE9BQU87U0FDVjtJQUVMLENBQUM7SUFFZSxRQUFRO1FBQ3BCLE9BQU8seUJBQXlCLENBQUM7SUFDckMsQ0FBQztDQUVKOztBQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFdEIsY0FBYyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxRQUFRLENBQUMsQ0FBQyJ9