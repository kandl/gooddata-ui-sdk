// (C) 2007-2023 GoodData Corporation
import * as path from "path";
import * as fs from "fs/promises";
import identity from "lodash/identity.js";
import pick from "lodash/pick.js";
import pickBy from "lodash/pickBy.js";
import { API_TOKEN_VAR_NAME } from "./constants.js";
export function mergeConfigs(...configs) {
    return Object.assign({}, ...configs.map((config) => pickBy(pick(config, [
        "hostname",
        "workspaceId",
        "username",
        "password",
        "token",
        "catalogOutput",
        "backend",
    ]), identity)));
}
/**
 * Read credentials from ENV variables
 */
export function getConfigFromEnv(env) {
    var _a, _b, _c;
    return {
        username: (_a = env.GDC_USERNAME) !== null && _a !== void 0 ? _a : null,
        password: (_b = env.GDC_PASSWORD) !== null && _b !== void 0 ? _b : null,
        token: (_c = env[API_TOKEN_VAR_NAME]) !== null && _c !== void 0 ? _c : null,
    };
}
/**
 * Allow normal props and credentials to be defined as CLI options
 */
export function getConfigFromOptions(obj) {
    return pick(obj, [
        "hostname",
        "workspaceId",
        "username",
        "password",
        "token",
        "catalogOutput",
        "backend",
    ]);
}
/**
 * Config file can only hold normal props, not credentials
 */
export async function getConfigFromConfigFile(filePath) {
    var _a;
    return pick((_a = (await readJsonFile(path.resolve(filePath)))) !== null && _a !== void 0 ? _a : {}, [
        "hostname",
        "workspaceId",
        "catalogOutput",
        "backend",
    ]);
}
/**
 * package.json can only hold normal props, not credentials
 */
export async function getConfigFromPackage(workingDir) {
    let dir = path.resolve(workingDir);
    const { root } = path.parse(workingDir);
    const packages = [];
    while (dir !== root) {
        packages.push(await readJsonFile(path.join(dir, "package.json")));
        dir = path.dirname(dir);
    }
    return mergeConfigs(...packages
        .filter(identity)
        .map((pack) => { var _a; return pick((_a = pack.gooddata) !== null && _a !== void 0 ? _a : {}, ["hostname", "workspaceId", "catalogOutput", "backend"]); })
        .reverse());
}
async function readJsonFile(filePath) {
    let text;
    try {
        text = await fs.readFile(filePath, "utf8");
    }
    catch (e) {
        // Don't care if can't read file
        // Does not exist or no rights (expected when reading closer to the root)
        return null;
    }
    // Let JSON throw if it's not a valid JSON
    return JSON.parse(text);
}
