import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IRecording, RecordingIndexEntry, RecordingType } from "./common.js";
import { InsightRecordingSpec } from "../interface.js";
export declare class InsightRecording implements IRecording {
    readonly directory: string;
    private readonly insightId;
    private readonly objFile;
    private readonly spec;
    constructor(rootDir: string, id: string, spec?: InsightRecordingSpec);
    alwaysRefresh(): boolean;
    getRecordingType(): RecordingType;
    getRecordingName(): string;
    isComplete(): boolean;
    getEntryForRecordingIndex(): RecordingIndexEntry;
    makeRecording(backend: IAnalyticalBackend, workspace: string, newWorkspaceId?: string): Promise<void>;
    getVisName(): string;
    getScenarioName(): string;
    /**
     * Tests whether the recording contains information about visualization and scenario that the
     * insight exercises. This information is essential for the recording to be included in the named
     * insights index.
     */
    hasVisAndScenarioInfo(): boolean;
}
//# sourceMappingURL=insights.d.ts.map