// (C) 2007-2020 GoodData Corporation
import chalk from "chalk";
export function log(key, value) {
    console.log(chalk `{bold ✔ ${key}:} {cyan ${value}}`);
}
export function logError(message) {
    console.log(chalk `{white.bold.bgRed  ✘ ERROR } ${message}`);
}
export function logSuccess(message) {
    console.log(chalk `{white.bold.bgGreen  ✔ SUCCESS } ${message}`);
}
export function logInfo(message) {
    console.log(chalk `{blue.bold    INFO  } ${message}`);
}
export function logWarn(message) {
    console.log(chalk `{blue.yellow    WARN  } ${message}`);
}
