// (C) 2007-2021 GoodData Corporation
import identity from "lodash/identity.js";
import pick from "lodash/pick.js";
import pickBy from "lodash/pickBy.js";
import * as fs from "fs";
import * as path from "path";
import { DEFAULT_CONFIG, DEFAULT_CONFIG_FILE_NAME } from "./constants.js";
function mergeConfigs(config, prevConfig = DEFAULT_CONFIG) {
    return Object.assign(Object.assign({}, prevConfig), pickBy(pick(config, [
        "hostname",
        "projectId",
        "username",
        "password",
        "recordingDir",
        "backend",
        "replaceProjectId",
    ]), identity));
}
function retrieveConfigFromObject(obj) {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
        hostname: (_a = obj.hostname) !== null && _a !== void 0 ? _a : null,
        projectId: (_b = obj.projectId) !== null && _b !== void 0 ? _b : null,
        username: (_c = obj.username) !== null && _c !== void 0 ? _c : null,
        password: (_d = obj.password) !== null && _d !== void 0 ? _d : null,
        recordingDir: (_e = obj.recordingDir) !== null && _e !== void 0 ? _e : null,
        backend: (_f = obj.backend) !== null && _f !== void 0 ? _f : null,
        replaceProjectId: (_g = obj.replaceProjectId) !== null && _g !== void 0 ? _g : null,
    };
}
export function getConfigFromOptions(obj, prevConfig = DEFAULT_CONFIG) {
    return mergeConfigs(retrieveConfigFromObject(obj), prevConfig);
}
export function getConfigFromConfigFile(filePath = DEFAULT_CONFIG_FILE_NAME, prevConfig = DEFAULT_CONFIG) {
    const absolutePath = path.resolve(filePath);
    if (fs.existsSync(absolutePath)) {
        const configData = JSON.parse(fs.readFileSync(filePath, "utf8"));
        return mergeConfigs(configData, prevConfig);
    }
    return prevConfig;
}
