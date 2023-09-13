// (C) 2007-2021 GoodData Corporation
import flatMap from "lodash/flatMap.js";
import * as path from "path";
import { findFiles } from "../base/utils.js";
import { logWarn } from "../cli/loggers.js";
import { isNonNullRecording, readJsonSync } from "./common.js";
import { DashboardsDefinition } from "./displayForms.js";
import { DashboardRecording } from "./dashboards.js";
function createRecording(directory, dashboard, dashboardRecordingMeta) {
    try {
        return new DashboardRecording(directory, dashboard, dashboardRecordingMeta);
    }
    catch (e) {
        logWarn(`An error has occurred while loading dashboard recording from directory ${directory} and dashboard ${dashboard}: ${e} - the recording will not be included in further processing.`);
        return null;
    }
}
function loadRecordings(recordingDefinition) {
    const directory = path.dirname(recordingDefinition);
    const requestedDashboards = readJsonSync(recordingDefinition);
    return Object.entries(requestedDashboards)
        .map(([dashboard, dashboardRecordingMeta]) => createRecording(directory, dashboard, dashboardRecordingMeta))
        .filter(isNonNullRecording);
}
export async function discoverDashboardRecordings(recordingDir) {
    return flatMap(findFiles(recordingDir, DashboardsDefinition), loadRecordings);
}
