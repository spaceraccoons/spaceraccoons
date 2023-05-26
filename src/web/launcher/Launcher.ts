/*
function presentUpdateAvailable(serviceWorker: ServiceWorker): void {
    document.getElementById("update-banner")!.dataset.state = "update-available";
    document.querySelector("#update-banner .headline")!.innerHTML = "Update available";
    document.querySelector("#update-banner .subhead")!.innerHTML = "Click here to update the app to the latest version";
    document.getElementById("update-banner")!.addEventListener("click", (event) => {
        serviceWorker.postMessage("SKIP_WAITING");
    });
}


let isReloading = false;
window.addEventListener("load", () => {
    try {
        const registration = await navigator.serviceWorker.register("./service-worker.js");
        if (registration.waiting !== null) {
            presentUpdateAvailable(registration.waiting);
        }

        // We wait for an UpdateFoundEvent, which is fired anytime a new service worker is acquired
        registration.addEventListener("updatefound", function (updateFoundEvent) {
            // Ignore the event if this is our first service worker and thus not an update
            if (registration.active === null) {
                return;
            }

            // Listen for any state changes on the new service worker
            registration.installing!.addEventListener("statechange", function (stateChangeEvent) {
                // Wait for the service worker to enter the installed state (aka waiting)
                if (this.state !== "installed") {
                    return;
                }

                // Present the update available UI
                presentUpdateAvailable(registration.waiting!);
            });
        });

        // We wait for a ControllerEvent, which is fired when the document acquires a new service worker
        navigator.serviceWorker.addEventListener("controllerchange", function(controllerChangeEvent) {

            // We delay our code until the new service worker is activated
            this.ready.then((serviceWorkerRegistration) => {

            }).;

            // Reload the window
            if (!isReloading) {
                isReloading = true;
                window.location.reload();
            }
        });

    } catch (e) {
        console.error("Registration of service worker failed.", e);
    }
});
*/

export class Launcher extends HTMLElement
                      implements EventListenerObject {

    public static readonly TAG_NAME = "spaceraccoons-launcher";

    static #INSTANCE: Launcher|null = null;
    public static get INSTANCE(): Launcher|null {
        return Launcher.#INSTANCE;
    }

    protected static get observedAttributes(): string[] {
        return ["visible"];
    }

    #windowEventListeners: Map<string, (this: Launcher, event: any) => void> = new Map([
        ["unhandledrejection", this.#onUnhandledRejection],
    ]);

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

    /** @internal */
    connectedCallback(): void {

        // Sets the static reference of this singleton or reports an error and removes itself
        // from the DOM if another instance already exists.
        if (Launcher.#INSTANCE !== null) {
            this.parentElement?.removeChild(this);
            console.error("Only one launcher instance is allowed to exist in the DOM. Removing:", this);
            return;
        }
        Launcher.#INSTANCE = this;

        // TODO Read from window.localStorage
        if (window.location.hostname === "spaceraccoons.com") {
            navigator.registerProtocolHandler("web+spaceraccoons", "https://spaceraccoons.com/?s=%s")
        } else {
            console.debug(`Skipping registration of custom protocol handler for origin "${window.location.hostname}".`);
        }

        this.#windowEventListeners.forEach((_, type) => window.addEventListener(type, this));

        navigator.serviceWorker.register("/dist/sw.min.js", { type: "module" }).catch((e) => {
            console.error("Could not register service worker:", e)
        });
    }

    /** @internal */
    protected disconnectedCallback(): void {

        this.#windowEventListeners.forEach((_, type) => window.removeEventListener(type, this));

        // Un-sets the static reference, if this is the singleton instance.
        if (Launcher.#INSTANCE === this) {
            Launcher.#INSTANCE = null;
        }
    }

    /** @internal */
    protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void {

        if (oldValue === newValue) {
            return;
        }

    }

    handleEvent(event: PromiseRejectionEvent): void;
    handleEvent(event: Event): void {
        console.log(event);
        return this.#windowEventListeners.get(event.type)?.bind(this)(event);
    }

    #onUnhandledRejection(event: PromiseRejectionEvent): void {
        console.error("Unhandled promise rejection occurred. Reason:", event.reason, ", Promise:", event.promise);
    }

    public override toString(): string {
        return "Space Raccoons Launcher";
    }

}
Object.seal(Launcher);

customElements.define(Launcher.TAG_NAME, Launcher);