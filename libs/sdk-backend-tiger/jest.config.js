// (C) 2019 GoodData Corporation
import base from "../../common/config/jest/jest.config.base.mjs";

export default {
    ...base,
    testRegex: "(/src).*\\.test\\.tsx?$",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
