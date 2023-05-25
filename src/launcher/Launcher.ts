enum ObservedAttributes {
    VISIBLE = "visible",
}

export class Launcher extends HTMLElement {

    static get observedAttributes(): string[] {
        return Object.keys(ObservedAttributes);
    }

    readonly #img: HTMLImageElement;

    constructor() {

        super();

        const shadow = this.attachShadow({
            mode: "open",
            delegatesFocus: true
        });

        const style = shadow.appendChild(document.createElement("style"));

        this.#img = shadow.appendChild(document.createElement("img"));
        this.#img.id = "logo"
        this.#img.src = "assets/appicon.iconset/icon_256x256.png";
        this.#img.alt = "Space Raccoons Logo";

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
        
        :host ${this.#img.tagName.toLowerCase()}#${this.#img.id} {
            animation: pulse 8s infinite;
            will-change: filter;
        }`;

    }

    protected connectedCallback(): void {
        // Not (yet) implemented.
    }

    protected attributeChangedCallback(name: ObservedAttributes, oldValue: string, newValue: string): void {

        if (oldValue === newValue) {
            return;
        }

    }

    public override toString(): string {
        return "Space Raccoons Launcher";
    }

}
Object.seal(Launcher);

customElements.define("spaceraccoons-launcher", Launcher);