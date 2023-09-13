import { IExecutionDefinition } from "@gooddata/sdk-model";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IRecording, RecordingIndexEntry, RecordingType } from "./common.js";
import { ScenarioDescriptor } from "../interface.js";
export declare class ExecutionRecording implements IRecording {
    readonly fingerprint: string;
    readonly definition: IExecutionDefinition;
    readonly scenarios: ScenarioDescriptor[];
    readonly directory: string;
    private readonly dataViewRequests;
    constructor(directory: string);
    getRecordingType(): RecordingType;
    getRecordingName(): string;
    isComplete(): boolean;
    alwaysRefresh(): boolean;
    makeRecording(backend: IAnalyticalBackend, workspace: string, newWorkspaceId?: string): Promise<void>;
    getEntryForRecordingIndex(): RecordingIndexEntry;
    private hasResult;
    private hasAllDataViewFiles;
    private getMissingDataViewFiles;
    private getRequiredDataViewFiles;
}
//# sourceMappingURL=execution.d.ts.map