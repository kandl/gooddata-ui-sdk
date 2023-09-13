// (C) 2007-2022 GoodData Corporation
import { readJsonSync, RecordingType, writeAsJsonSync } from "./common.js";
import isEqual from "lodash/isEqual.js";
import fs from "fs";
import path from "path";
import { idRef } from "@gooddata/sdk-model";
import { createUniqueVariableNameForIdentifier } from "../base/variableNaming.js";
//
// internal constants & types
//
//
// Public API
//
export const DisplayFormsDefinition = "displayForms.json";
export const DashboardsDefinition = "dashboards.json";
const DisplayFormRequestFile = "request.json";
const DisplayFormElements = "elements.json";
const DisplayFormObj = "obj.json";
export class DisplayFormRecording {
    constructor(rootDir, displayFormId, spec = {}) {
        this.directory = path.join(rootDir, displayFormId);
        this.displayFormId = displayFormId;
        this.spec = spec;
        this.requestFile = path.join(this.directory, DisplayFormRequestFile);
        this.elementFile = path.join(this.directory, DisplayFormElements);
        this.objFile = path.join(this.directory, DisplayFormObj);
    }
    alwaysRefresh() {
        return false;
    }
    getRecordingType() {
        return RecordingType.DisplayForms;
    }
    getRecordingName() {
        return `df_${createUniqueVariableNameForIdentifier(this.displayFormId)}`;
    }
    getAttributeElements() {
        return readJsonSync(this.elementFile);
    }
    getDisplayFormTitle() {
        const obj = readJsonSync(this.objFile);
        return obj.title;
    }
    isComplete() {
        return (fs.existsSync(this.directory) &&
            fs.existsSync(this.elementFile) &&
            fs.existsSync(this.objFile) &&
            isEqual(this.spec, this.getRecordedSpec()));
    }
    getEntryForRecordingIndex() {
        return {
            elements: this.elementFile,
            obj: this.objFile,
            req: this.requestFile,
        };
    }
    async makeRecording(backend, workspace, newWorkspaceId) {
        const elements = await this.queryValidElements(backend, workspace);
        const obj = await backend
            .workspace(workspace)
            .attributes()
            .getAttributeDisplayForm(idRef(this.displayFormId));
        if (!fs.existsSync(this.directory)) {
            fs.mkdirSync(this.directory, { recursive: true });
        }
        const replaceString = newWorkspaceId
            ? [workspace, newWorkspaceId]
            : undefined;
        writeAsJsonSync(this.requestFile, this.spec, { replaceString });
        writeAsJsonSync(this.elementFile, elements, { replaceString });
        writeAsJsonSync(this.objFile, obj, { replaceString });
    }
    async queryValidElements(backend, workspace) {
        var _a;
        const validElements = this.createValidElementsQuery(backend, workspace);
        const result = [];
        const { elementCount } = this.spec;
        let page = await validElements.query();
        /*
         * Keep loading elements until:
         *
         * - desired element count reached (if any)
         * - last page of data reached
         *
         */
        while ((!elementCount || elementCount > result.length) && ((_a = page.items) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            result.push(...page.items);
            page = await page.next();
        }
        return !elementCount ? result : result.slice(0, elementCount);
    }
    createValidElementsQuery(backend, workspace) {
        const { offset, elementCount } = this.spec;
        let validElements = backend
            .workspace(workspace)
            .attributes()
            .elements()
            .forDisplayForm(idRef(this.displayFormId));
        if (offset !== undefined) {
            validElements = validElements.withOffset(offset);
        }
        if (elementCount !== undefined) {
            validElements = validElements.withLimit(elementCount);
        }
        return validElements;
    }
    getRecordedSpec() {
        if (!fs.existsSync(this.requestFile)) {
            return {};
        }
        return readJsonSync(this.requestFile);
    }
}
