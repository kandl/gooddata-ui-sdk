import fs from "fs";
import pick from "lodash/pick.js";
import isEmpty from "lodash/isEmpty.js";
import stringify from "json-stable-stringify";
export var RecordingType;
(function (RecordingType) {
    RecordingType["Execution"] = "execution";
    RecordingType["DisplayForms"] = "displayForms";
    RecordingType["Insights"] = "insights";
    RecordingType["Dashboards"] = "dashboards";
    RecordingType["Catalog"] = "catalog";
    RecordingType["VisClasses"] = "visClasses";
})(RecordingType = RecordingType || (RecordingType = {}));
//
//
//
export function toJsonString(obj, options = {}) {
    const { pickKeys, replaceString } = options;
    let result;
    if (pickKeys) {
        result = stringify(pick(obj, pickKeys));
    }
    else {
        result = stringify(obj);
    }
    if (replaceString) {
        result = result.replace(new RegExp(replaceString[0], "g"), replaceString[1]);
    }
    return result;
}
export function writeAsJsonSync(file, obj, options) {
    fs.writeFileSync(file, toJsonString(obj, options), { encoding: "utf-8" });
}
export function readJsonSync(file) {
    return JSON.parse(fs.readFileSync(file, { encoding: "utf-8" }));
}
export function isNonNullRecording(rec) {
    return !isEmpty(rec) && rec.directory !== undefined;
}
