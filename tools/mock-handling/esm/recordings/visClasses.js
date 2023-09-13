// (C) 2020 GoodData Corporation
import fs from "fs";
import path from "path";
import { RecordingType, writeAsJsonSync } from "./common.js";
//
// internal constants & types
//
//
// Public API
//
export const VisClassesDefinition = "visClasses.json";
const VisClassesItems = "items.json";
export class VisClassesRecording {
    constructor(rootDir) {
        this.directory = path.join(rootDir, "visClasses");
        this.itemsFile = path.join(this.directory, VisClassesItems);
    }
    alwaysRefresh() {
        return false;
    }
    getRecordingType() {
        return RecordingType.VisClasses;
    }
    getRecordingName() {
        return "visClasses";
    }
    isComplete() {
        return fs.existsSync(this.directory) && fs.existsSync(this.itemsFile);
    }
    getEntryForRecordingIndex() {
        return {
            items: this.itemsFile,
        };
    }
    async makeRecording(backend, workspace, newWorkspaceId) {
        const items = await backend.workspace(workspace).insights().getVisualizationClasses();
        if (!fs.existsSync(this.directory)) {
            fs.mkdirSync(this.directory, { recursive: true });
        }
        const replaceString = newWorkspaceId
            ? [workspace, newWorkspaceId]
            : undefined;
        writeAsJsonSync(this.itemsFile, items, { replaceString });
    }
}
