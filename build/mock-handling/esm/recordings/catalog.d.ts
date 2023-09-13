import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IRecording, RecordingIndexEntry, RecordingType } from "./common.js";
export declare const CatalogDefinition = "catalog.json";
export declare class CatalogRecording implements IRecording {
    readonly directory: string;
    private readonly itemsFile;
    private readonly groupsFile;
    constructor(rootDir: string);
    alwaysRefresh(): boolean;
    getRecordingType(): RecordingType;
    getRecordingName(): string;
    isComplete(): boolean;
    getEntryForRecordingIndex(): RecordingIndexEntry;
    makeRecording(backend: IAnalyticalBackend, workspace: string, newWorkspaceId?: string): Promise<void>;
}
//# sourceMappingURL=catalog.d.ts.map