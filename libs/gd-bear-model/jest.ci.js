// (C) 2019 GoodData Corporation
const ciBase = require("../../common/config/jest/jest.config.ci.base.js");

module.exports = {
    ...ciBase,
    collectCoverageFrom: ["src/**/*.ts", "test/**/*.ts", "!**/*.d.ts", "!src/index.ts"],
};
