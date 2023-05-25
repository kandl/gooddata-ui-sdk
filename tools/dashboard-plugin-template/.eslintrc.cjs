// (C) 2020 GoodData Corporation
module.exports = {
    parser: "@typescript-eslint/parser",
    plugins:  ["react-hooks", "prettier", "sonarjs", "eslint-plugin-tsdoc"],
    extends: [
        "@gooddata",
        "plugin:import-esm/recommended",
        "plugin:sonarjs/recommended",
        "plugin:regexp/recommended",
        "../../.eslintrc.js",
    ],
    rules: {
        "import/no-unassigned-import": "off",
    },
    parserOptions: { tsconfigRootDir: __dirname },
    ignorePatterns: ["webpack.config.js", "scripts/refresh-md.cjs","configTemplates/ts/vite.config.ts","configTemplates/js/vite.config.js"],
};