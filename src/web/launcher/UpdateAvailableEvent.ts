export class UpdateAvailableEvent extends Event {
    
    public static get TYPE(): string {
        return "spaceraccoons-updateavailable";
    }

    readonly #serviceWorker: ServiceWorker;
    public get serviceWorker(): ServiceWorker {
        return this.#serviceWorker;
    }

    constructor(serviceWorker: ServiceWorker) {
        super(UpdateAvailableEvent.TYPE, {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
        this.#serviceWorker = serviceWorker;
    }
}