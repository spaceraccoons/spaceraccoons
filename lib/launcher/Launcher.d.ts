declare enum ObservedAttributes {
    VISIBLE = "visible"
}
export declare class Launcher extends HTMLElement {
    #private;
    static get observedAttributes(): string[];
    constructor();
    protected connectedCallback(): void;
    protected attributeChangedCallback(name: ObservedAttributes, oldValue: string, newValue: string): void;
    toString(): string;
}
export {};
