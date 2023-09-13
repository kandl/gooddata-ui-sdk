import { IRecording, RecordingIndexEntry, RecordingType } from "./common.js";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IAttributeElement } from "@gooddata/sdk-model";
export declare const DisplayFormsDefinition = "displayForms.json";
export declare const DashboardsDefinition = "dashboards.json";
export type DisplayFormRecordingSpec = {
    offset?: number;
    elementCount?: number;
};
export declare class DisplayFormRecording implements IRecording {
    readonly directory: string;
    readonly elementFile: string;
    private readonly displayFormId;
    private readonly spec;
    private readonly requestFile;
    private readonly objFile;
    constructor(rootDir: string, displayFormId: string, spec?: DisplayFormRecordingSpec);
    alwaysRefresh(): boolean;
    getRecordingType(): RecordingType;
    getRecordingName(): string;
    getAttributeElements(): IAttributeElement[];
    getDisplayFormTitle(): string;
    isComplete(): boolean;
    getEntryForRecordingIndex(): RecordingIndexEntry;
    makeRecording(backend: IAnalyticalBackend, workspace: string, newWorkspaceId?: string): Promise<void>;
    private queryValidElements;
    private createValidElementsQuery;
    private getRecordedSpec;
}
//# sourceMappingURL=displayForms.d.ts.map