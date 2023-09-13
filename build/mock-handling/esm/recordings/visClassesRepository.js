// (C) 2007-2020 GoodData Corporation
import flatMap from "lodash/flatMap.js";
import * as path from "path";
import { findFiles } from "../base/utils.js";
import { logWarn } from "../cli/loggers.js";
import { isNonNullRecording } from "./common.js";
import { VisClassesRecording, VisClassesDefinition } from "./visClasses.js";
function createRecording(directory) {
    try {
        return new VisClassesRecording(directory);
    }
    catch (e) {
        logWarn(`An error has occurred while loading visClasses recording from directory ${directory}: ${e} - the recording will not be included in further processing.`);
        return null;
    }
}
function loadRecordings(recordingDefinition) {
    const directory = path.dirname(recordingDefinition);
    return [createRecording(directory)].filter(isNonNullRecording);
}
export async function discoverVisClassesRecordings(recordingDir) {
    return flatMap(findFiles(recordingDir, VisClassesDefinition), loadRecordings);
}
