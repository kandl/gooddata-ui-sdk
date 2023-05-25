// (C) 2019 GoodData Corporation
import base from "../../common/config/jest/jest.config.ci.base.mjs";

export default {
    ...base,
    collectCoverageFrom: ["src/**/*.ts", "test/**/*.ts", "!**/*.d.ts", "!src/index.ts"],
};
