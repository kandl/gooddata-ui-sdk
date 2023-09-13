import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IRecording, RecordingIndexEntry, RecordingType } from "./common.js";
export type DashboardRecordingSpec = {
    offline?: boolean;
};
export declare class DashboardRecording implements IRecording {
    readonly directory: string;
    private readonly dashboardId;
    private readonly objFile;
    private readonly alertsFile;
    private readonly spec;
    constructor(rootDir: string, id: string, spec: DashboardRecordingSpec);
    alwaysRefresh(): boolean;
    getRecordingType(): RecordingType;
    getRecordingName(): string;
    isComplete(): boolean;
    getEntryForRecordingIndex(): RecordingIndexEntry;
    makeRecording(backend: IAnalyticalBackend, workspace: string, newWorkspaceId?: string): Promise<void>;
}
//# sourceMappingURL=dashboards.d.ts.map