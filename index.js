//@ts-check

const urlSearchParams = new URLSearchParams(window.location.search);
export const params = ((p) => {
    return {
        dev: p.has("dev") && p.get("dev")?.toLowerCase() !== "false",
        reset: p.has("reset") && p.get("reset")?.toLocaleLowerCase() !== "false",
    };
})(urlSearchParams);

export const JS_MAIN_URL_KEY = "js.main.url";
export const JS_MAIN_URL_DEFAULT_VALUE = params.dev ? "./lib/web/index.js" : "./dist/web.min.js";

export const JS_SW_URL_KEY = "js.sw.url";
export const JS_SW_URL_DEFAULT_VALUE = params.dev ? "./lib/sw/index.js" : "./dist/sw.min.js";

/**
 * @param {Map<string, string>} config
 * @return {Map<string, string>}
 */
function initSessionStorage(config) {
    window.sessionStorage.clear();
    config.forEach((value, key) => {
        window.sessionStorage.setItem(key, value);
    });
    return config;
}

const config = initSessionStorage(new Map([
    [JS_MAIN_URL_KEY, JS_MAIN_URL_DEFAULT_VALUE],
    [JS_SW_URL_KEY, JS_SW_URL_DEFAULT_VALUE],
]));

if (params.reset) {
    window.localStorage.clear();
}

if (params.dev) {
    document.getElementsByTagName("title")[0].innerHTML += " [DEV]";
}

const jsMainUrl = config.get(JS_MAIN_URL_KEY);
if (jsMainUrl === undefined) {
    throw new Error(`Property "${JS_MAIN_URL_KEY}" has not been set.`);
}

try {
    console.info(`Loading main entry point from: "${jsMainUrl}"`);
    window["spaceraccoons"] = await import(jsMainUrl);
} catch (e) {
    console.error(e);
}
