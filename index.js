//@ts-check

export const JS_BASE_URL_KEY = "js.baseUrl";
export const JS_BASE_URL_DEFAULT_VALUE = "."

export const JS_MAIN_KEY = "js.main";
export const JS_MAIN_DEFAULT_VALUE = "/lib/main.js";

// Check the base URL configuration and set it to a sane default, if nothing
// has been specified (yet).
let jsBaseUrl = window.localStorage.getItem(JS_BASE_URL_KEY);
if (jsBaseUrl === null) {
    window.localStorage.setItem(JS_BASE_URL_KEY, JS_BASE_URL_DEFAULT_VALUE);
    jsBaseUrl = JS_BASE_URL_DEFAULT_VALUE;
}

// Check the main entry point and set it to a sane default, if nothing has been
// specified (yet).
let jsMain = window.localStorage.getItem(JS_MAIN_KEY);
if (jsMain === null) {
    window.localStorage.setItem(JS_MAIN_KEY, JS_MAIN_DEFAULT_VALUE);
    jsMain = JS_MAIN_DEFAULT_VALUE;
}

try {
    const url = `${jsBaseUrl}/${jsMain}`.replace(/([^:])(\/\/+)/g, "$1/")
    console.info(`Loading main entry point from: "${url}"`);
    await import(url);
} catch (e) {
    console.error(e);
    if (jsBaseUrl !== JS_BASE_URL_DEFAULT_VALUE || jsMain !== JS_MAIN_DEFAULT_VALUE) {
        window.localStorage.setItem(JS_BASE_URL_KEY, JS_BASE_URL_DEFAULT_VALUE);
        window.localStorage.setItem(JS_MAIN_KEY, JS_MAIN_DEFAULT_VALUE);
        window.location.reload();
    }
}
