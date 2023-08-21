export class UpdateNotificationBanner extends HTMLElement
                                implements EventListenerObject {

    public static readonly TAG_NAME = "spaceraccoons-update-notification-banner";

    #windowEventListeners: Map<string, (this: UpdateNotificationBanner, event: any) => void> = new Map([
    ])

    constructor() {
        super();

        const shadow = this.attachShadow({
            mode: "open",
            delegatesFocus: true
        });

        const style = shadow.appendChild(document.createElement("style"));

        this.dataset["state"] = "up-to-date";

        const content = shadow.appendChild(document.createElement("div"));
        const headline = content.appendChild(document.createElement("div"));
        headline.className = "headline";
        headline.innerHTML = "An update is available";
        const subhead = content.appendChild(document.createElement("div"));
        subhead.className = "subhead";
        subhead.innerHTML = "Click here to install the update and perform a reload.";

        style.innerHTML = `
        :host {
            position: absolute;
            display: block;
            top: 0;
            left: 0;
            right: 0;
            padding: 1.5em 1.0em;
            color: #FFFFFF;
            background: #2A263C;
            z-index: 4000;
        }
        
        :host .content {
            margin: 0 auto;
            max-width: 980px;
            padding: 20px;
        }
        
        :host .headline {
            font-weight: 800;
            font-size: 15px;
        }
        
        :host .subhead {
            font-size: 13px;
        }
        
        :host([data-state="up-to-date"]) {
            visibility: hidden;
            opacity: 0;
            transition: opacity 2s linear;
        }
        
        :host([data-state="update-available"]) {
            visibility: visible;
            opacity: 1;
            cursor: pointer;
            background: #26AE60;
            transition: opacity 2s linear;
        }
        `;
    }

    handleEvent(event: Event): void {
        return this.#windowEventListeners.get(event.type)?.bind(this)(event);
    }

    /** @internal */
    connectedCallback(): void {
        this.#windowEventListeners.forEach((_, type) => window.addEventListener(type, this));
    }

    /** @internal */
    disconnectedCallback(): void {
        this.#windowEventListeners.forEach((_, type) => window.removeEventListener(type, this));
    }

    public override toString(): string {
        return "Space Raccoons Update Notification Banner";
    }
}

Object.seal(UpdateNotificationBanner);

customElements.define(UpdateNotificationBanner.TAG_NAME, UpdateNotificationBanner);