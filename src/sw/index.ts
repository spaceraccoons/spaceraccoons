// Default type of `self` is `WorkerGlobalScope & typeof globalThis`
// https://github.com/microsoft/TypeScript/issues/14877
declare const self: ServiceWorkerGlobalScope;

console.log("YAY 5!");

// We need an export to force this file to act like a module, so TS will let us re-type `self`
export default null;