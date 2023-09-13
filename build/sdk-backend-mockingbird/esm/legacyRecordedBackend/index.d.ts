import { IAnalyticalBackendConfig, IAnalyticalBackend, IDataView } from "@gooddata/sdk-backend-spi";
import { IExecutionDefinition, IAttributeDisplayFormMetadataObject, IAttributeElement } from "@gooddata/sdk-model";
/**
 * Master Index is the input needed to initialize the recorded backend.
 * @internal
 * @deprecated this implementation is deprecated, use non-legacy recorded backend
 */
export type LegacyRecordingIndex = {
    [workspace: string]: LegacyWorkspaceRecordings;
};
/**
 * Workspace-specific recordings
 *
 * @internal
 * @deprecated this implementation is deprecated, use non-legacy recorded backend
 */
export type LegacyWorkspaceRecordings = {
    execution?: {
        [fp: string]: LegacyExecutionRecording;
    };
    metadata?: {
        attributeDisplayForm?: {
            [id: string]: IAttributeDisplayFormMetadataObject;
        };
    };
    elements?: {
        [id: string]: IAttributeElement[];
    };
};
/**
 * Each recording in the master index has these 3 entries
 *
 * @internal
 * @deprecated this implementation is deprecated, use non-legacy recorded backend
 */
export type LegacyExecutionRecording = {
    definition: IExecutionDefinition;
    response: any;
    result: any;
};
/**
 * This is legacy implementation of the recorded backend. Do not use for new tests.
 * @internal
 * @deprecated this implementation is deprecated, use non-legacy recorded backend
 */
export declare function legacyRecordedBackend(index: LegacyRecordingIndex, config?: IAnalyticalBackendConfig): IAnalyticalBackend;
/**
 * Creates a new data view facade for the provided recording.
 *
 * This is legacy implementation of recorded backend. Do not use for new tests.
 *
 * @param recording - recorded definition, AFM response and AFM result
 * @internal
 * @deprecated this implementation is deprecated, use non-legacy recorded backend
 */
export declare function legacyRecordedDataView(recording: LegacyExecutionRecording): IDataView;
//# sourceMappingURL=index.d.ts.map