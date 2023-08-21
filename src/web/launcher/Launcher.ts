import { UpdateNotificationBanner } from "./UpdateNotificationBanner.js";
import { UpdateAvailableEvent } from "./UpdateAvailableEvent.js";

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

    #windowEventListeners = new Map<string, (this: Launcher, event: any) => void>([
        ["unhandledrejection", this.#onUnhandledRejection],
        [UpdateAvailableEvent.TYPE, this.#onUpdateAvailable],
    ]);

    #serviceWorker: ServiceWorker | null = null;
    public get serviceWorker(): ServiceWorker | null {
        return this.#serviceWorker;
    }

    readonly #background: HTMLCanvasElement;
    readonly #img: HTMLImageElement;

    constructor() {

        super();

        const shadow = this.attachShadow({
            mode: "open",
            delegatesFocus: true
        });

        const style = shadow.appendChild(document.createElement("style"));

        this.#background = shadow.appendChild(document.createElement("canvas"));
        this.#background.id = "starfield"
        
        ////
        const context = this.#background.getContext('2d')!;
        const stars: {x: number, y:number, vx: number, vy: number}[] = [];
        const animate = () => {
            if (stars.length<300&&Math.random()<.5){ // if fewer than 300 stars, a 50% chance of creating a new one
                    let star={x:0,y:0,vx:-5+Math.random()*10,vy:-5+Math.random()*10} // create a new star in the middle with random velocity
                    stars.push(star); // add the star to the array
            }
            context.clearRect(0, 0, context.canvas.width, context.canvas.height); // clear the frame
            for (let n = 0; n < stars.length; n++){ // for each star
                    stars[n].x=stars[n].x+stars[n].vx; // add the velocity to the current position
                    stars[n].y=stars[n].y+stars[n].vy; // in both axes
                    if(stars[n].x>400||stars[n].x<-400){ // if the star is out of bounds
                            stars[n].x=0;  // put it back in the center
                            stars[n].y=0;
                    }
            const color = Math.floor((Math.abs(stars[n].x)+Math.abs(stars[n].y))/5);
            context.fillStyle = `rgb(${color}, ${color}, ${color})`; // use the color value for the R, G and B component
            context.beginPath();
            context.arc(400+stars[n].x, 400+stars[n].y, Math.abs(stars[n].y/200+n/400), 0, 2 * Math.PI); // draw a circle
            context.fill();
            }
            window.requestAnimationFrame(animate); // request another animation frame
        }
        window.requestAnimationFrame(animate);
        ////


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

        :host ${this.#background.tagName.toLowerCase()}#${this.#background.id} {
            position:fixed;
            left:0;
            top:0;
            width:100%;
            height:100%;
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

        navigator.serviceWorker.register("/dist/sw.min.js", { type: "module" })
        .then((registration) => {
            if (registration.active !== null) {
                this.#serviceWorker = registration.active;
            }
            if (registration.waiting !== null) {
                this.dispatchEvent(new UpdateAvailableEvent(registration.waiting));
            }
            // We wait for an UpdateFoundEvent, which is fired anytime a new service worker is acquired
            registration.addEventListener("updatefound", (_) =>{
                // Ignore the event if this is our first service worker and thus not an update
                if (registration.active === null) {
                    return;
                }

                this.#serviceWorker = registration.active;

                // Listen for any state changes on the new service worker
                registration.installing!.addEventListener("statechange", function (_) {
                    // Wait for the service worker to enter the installed state (aka waiting)
                    if (this.state === "installed" && registration.waiting !== null) {
                        // Present the update available UI
                        window.dispatchEvent(new UpdateAvailableEvent(registration.waiting))
                    }
                });
            });
        }).catch((e) => {
            console.error("Could not register service worker:", e)
        });

        // We wait for a ControllerEvent, which is fired when the document acquires a new service worker
        navigator.serviceWorker.addEventListener("controllerchange", function(_) {
            // We delay our code until the new service worker is activated
            this.ready.then((_) => {
                // Reload the window
                window.location.reload();
            }).catch((e) => {
                throw e;
            });
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
    handleEvent(event: UpdateAvailableEvent): void;
    handleEvent(event: Event): void {
        return this.#windowEventListeners.get(event.type)?.bind(this)(event);
    }

    #onUnhandledRejection(event: PromiseRejectionEvent): void {
        console.error("Unhandled promise rejection occurred. Reason:", event.reason, ", Promise:", event.promise);
    }

    #onUpdateAvailable(event: UpdateAvailableEvent): void {
        if (this.shadowRoot !== null) {
            const banner: UpdateNotificationBanner = this.shadowRoot.querySelector(UpdateNotificationBanner.TAG_NAME) ?? this.shadowRoot.appendChild(new UpdateNotificationBanner());
            banner.dataset["state"] = "update-available";
            banner.onclick = null;
            banner.addEventListener("click", (_) => event.serviceWorker.postMessage("SKIP_WAITING"));
        }
    }

    checkForUpdates(): void {
        // TODO Implement me.
    }

    public override toString(): string {
        return "Space Raccoons Launcher";
    }

}
Object.seal(Launcher);

customElements.define(Launcher.TAG_NAME, Launcher);