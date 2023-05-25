//@ts-check

import {default as sourcemaps} from "rollup-plugin-include-sourcemaps";

/** @type {import("rollup").RollupOptions} */
export default {
    context: "window",
    input: {
        web: "lib/web/index.js",
    },
    output: {
        compact: true,
        dir: "dist",
        format: "es",
        entryFileNames: "[name].min.js",
        sourcemap: true,
    },
    plugins: [
        sourcemaps(),
    ],
};