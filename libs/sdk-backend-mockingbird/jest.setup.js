// (C) 2022 GoodData Corporation

import { jest } from "@jest/globals";

// Fail test on console error (react proptypes validation etc.)
const consoleError = console.error;
console.error = (err, ...args) => {
    consoleError(err, ...args);
    throw new Error(err);
};

global.jest = jest;
