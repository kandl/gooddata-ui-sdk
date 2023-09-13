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
export const CatalogDefinition = "catalog.json";
const CatalogItems = "items.json";
const CatalogGroups = "groups.json";
export class CatalogRecording {
    constructor(rootDir) {
        this.directory = path.join(rootDir, "catalog");
        this.itemsFile = path.join(this.directory, CatalogItems);
        this.groupsFile = path.join(this.directory, CatalogGroups);
    }
    alwaysRefresh() {
        return false;
    }
    getRecordingType() {
        return RecordingType.Catalog;
    }
    getRecordingName() {
        return "catalog";
    }
    isComplete() {
        return (fs.existsSync(this.directory) && fs.existsSync(this.itemsFile) && fs.existsSync(this.groupsFile));
    }
    getEntryForRecordingIndex() {
        return {
            items: this.itemsFile,
            groups: this.groupsFile,
        };
    }
    async makeRecording(backend, workspace, newWorkspaceId) {
        const catalog = await backend.workspace(workspace).catalog().load();
        const items = catalog.allItems();
        const groups = catalog.groups();
        if (!fs.existsSync(this.directory)) {
            fs.mkdirSync(this.directory, { recursive: true });
        }
        const replaceString = newWorkspaceId
            ? [workspace, newWorkspaceId]
            : undefined;
        writeAsJsonSync(this.itemsFile, items, { replaceString });
        writeAsJsonSync(this.groupsFile, groups, { replaceString });
    }
}
