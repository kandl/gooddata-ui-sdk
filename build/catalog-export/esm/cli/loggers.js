// (C) 2007-2021 GoodData Corporation
import chalk from "chalk";
import stripAnsi from "strip-ansi";
export function realStringLength(str) {
    return stripAnsi(str).length;
}
export function createBox(message, padding = 2) {
    const messageLength = realStringLength(message);
    const head = "-".repeat(messageLength + 2 * padding);
    return `*${head}*\n|${" ".repeat(padding)}${message}${" ".repeat(padding)}|\n*${head}*`;
}
export function log(key, value) {
    console.log(chalk `{bold ✔ ${key}:} {cyan ${value}}`);
}
export function logError(message) {
    console.log(chalk `{white.bold.bgRed  ✘ ERROR } ${message}`);
}
export function logSuccess(message) {
    console.log(chalk `{white.bold.bgGreen  ✔ SUCCESS } ${message}`);
}
export function logWarn(message) {
    console.log(chalk `{blue.yellow    WARN  } ${message}`);
}
export function logInfo(message) {
    console.log(chalk `{blue.bold    INFO  } ${message}`);
}
export function logBox(message, padding = 2) {
    console.log(createBox(message, padding));
}
export function printHeader(version) {
    const name = version ? `GoodData Catalog Export Tool v${version}` : "GoodData Catalog Export Tool";
    console.log(chalk `{blue.bold ${createBox(name)}}`);
}
