// (C) 2019 GoodData Corporation

import { jest } from "@jest/globals";

const consoleError = console.error;
console.error = (err, ...args) => {
    consoleError(err, ...args);
    throw new Error(err);
};

global.jest = jest;
