// (C) 2007-2021 GoodData Corporation
import { idRef } from "@gooddata/sdk-model";
import fs from "fs";
import path from "path";
import { createUniqueVariableNameForIdentifier } from "../base/variableNaming.js";
import { RecordingType, writeAsJsonSync } from "./common.js";
import { RecordingFiles } from "../interface.js";
import { DataRecorderError } from "../base/types.js";
import { logError } from "../cli/loggers.js";
export class DashboardRecording {
    constructor(rootDir, id, spec) {
        this.directory = path.join(rootDir, id);
        this.dashboardId = id;
        this.objFile = path.join(this.directory, RecordingFiles.Dashboards.Object);
        this.alertsFile = path.join(this.directory, RecordingFiles.Dashboards.Alerts);
        this.spec = spec;
    }
    alwaysRefresh() {
        return false;
    }
    getRecordingType() {
        return RecordingType.Dashboards;
    }
    getRecordingName() {
        return `dash_${createUniqueVariableNameForIdentifier(this.dashboardId)}`;
    }
    isComplete() {
        return fs.existsSync(this.directory) && fs.existsSync(this.objFile) && fs.existsSync(this.alertsFile);
    }
    getEntryForRecordingIndex() {
        return {
            obj: this.objFile,
            alerts: this.alertsFile,
        };
    }
    async makeRecording(backend, workspace, newWorkspaceId) {
        if (this.spec.offline) {
            logError(`An offline recording for dashboard with id ${this.dashboardId} does not contain all necessary files. Please check that ${this.objFile} and ${this.alertsFile} exist.`);
            throw new DataRecorderError(`Incomplete recording for 'offline' dashboard ${this.dashboardId}.`, 1);
        }
        const ref = idRef(this.dashboardId);
        const [dashboardWithReferences, alerts] = await Promise.all([
            backend.workspace(workspace).dashboards().getDashboardWithReferences(ref),
            backend.workspace(workspace).dashboards().getDashboardWidgetAlertsForCurrentUser(ref),
        ]);
        if (!fs.existsSync(this.directory)) {
            fs.mkdirSync(this.directory, { recursive: true });
        }
        const replaceString = newWorkspaceId
            ? [workspace, newWorkspaceId]
            : undefined;
        writeAsJsonSync(this.objFile, dashboardWithReferences, { replaceString });
        writeAsJsonSync(this.alertsFile, alerts, { replaceString });
    }
}
