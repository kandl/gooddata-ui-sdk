// (C) 2007-2020 GoodData Corporation
import flatMap from "lodash/flatMap.js";
import * as path from "path";
import { findFiles } from "../base/utils.js";
import { logWarn } from "../cli/loggers.js";
import { isNonNullRecording } from "./common.js";
import { CatalogRecording, CatalogDefinition } from "./catalog.js";
function createRecording(directory) {
    try {
        return new CatalogRecording(directory);
    }
    catch (e) {
        logWarn(`An error has occurred while loading catalog recording from directory ${directory}: ${e} - the recording will not be included in further processing.`);
        return null;
    }
}
function loadRecordings(recordingDefinition) {
    const directory = path.dirname(recordingDefinition);
    return [createRecording(directory)].filter(isNonNullRecording);
}
export async function discoverCatalogRecordings(recordingDir) {
    return flatMap(findFiles(recordingDir, CatalogDefinition), loadRecordings);
}
