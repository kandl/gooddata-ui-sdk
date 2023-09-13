import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IRecording, RecordingIndexEntry, RecordingType } from "./common.js";
export declare const VisClassesDefinition = "visClasses.json";
export declare class VisClassesRecording implements IRecording {
    readonly directory: string;
    private readonly itemsFile;
    constructor(rootDir: string);
    alwaysRefresh(): boolean;
    getRecordingType(): RecordingType;
    getRecordingName(): string;
    isComplete(): boolean;
    getEntryForRecordingIndex(): RecordingIndexEntry;
    makeRecording(backend: IAnalyticalBackend, workspace: string, newWorkspaceId?: string): Promise<void>;
}
//# sourceMappingURL=visClasses.d.ts.map