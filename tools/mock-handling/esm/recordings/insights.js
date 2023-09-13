// (C) 2007-2020 GoodData Corporation
import { idRef } from "@gooddata/sdk-model";
import fs from "fs";
import path from "path";
import { createUniqueVariableNameForIdentifier } from "../base/variableNaming.js";
import { RecordingType, writeAsJsonSync } from "./common.js";
import isEmpty from "lodash/isEmpty.js";
import { RecordingFiles } from "../interface.js";
//
// internal constants & types
//
//
// Public API
//
export class InsightRecording {
    constructor(rootDir, id, spec = {}) {
        this.directory = path.join(rootDir, id);
        this.insightId = id;
        this.spec = spec;
        this.objFile = path.join(this.directory, RecordingFiles.Insights.Object);
    }
    alwaysRefresh() {
        return false;
    }
    getRecordingType() {
        return RecordingType.Insights;
    }
    getRecordingName() {
        return `i_${createUniqueVariableNameForIdentifier(this.insightId)}`;
    }
    isComplete() {
        return fs.existsSync(this.directory) && fs.existsSync(this.objFile);
    }
    getEntryForRecordingIndex() {
        return {
            obj: this.objFile,
        };
    }
    async makeRecording(backend, workspace, newWorkspaceId) {
        const obj = await backend.workspace(workspace).insights().getInsight(idRef(this.insightId));
        if (!fs.existsSync(this.directory)) {
            fs.mkdirSync(this.directory, { recursive: true });
        }
        const replaceString = newWorkspaceId
            ? [workspace, newWorkspaceId]
            : undefined;
        /*
         * Do not store ref, let the recorded backend fill-in
         */
        delete obj.insight.ref;
        writeAsJsonSync(this.objFile, obj, { replaceString });
    }
    getVisName() {
        return this.spec.visName;
    }
    getScenarioName() {
        return this.spec.scenarioName;
    }
    /**
     * Tests whether the recording contains information about visualization and scenario that the
     * insight exercises. This information is essential for the recording to be included in the named
     * insights index.
     */
    hasVisAndScenarioInfo() {
        return !isEmpty(this.spec.visName) && !isEmpty(this.spec.scenarioName);
    }
}
