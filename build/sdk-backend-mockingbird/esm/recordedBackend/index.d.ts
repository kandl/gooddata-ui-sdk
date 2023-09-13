import { IAnalyticalBackend, IBackendCapabilities } from "@gooddata/sdk-backend-spi";
import { RecordedBackendConfig, RecordingIndex } from "./types.js";
/**
 * @internal
 */
export declare const defaultRecordedBackendCapabilities: IBackendCapabilities;
/**
 * Creates new backend that will be providing recorded results to the caller. The recorded results are provided
 * to the backend in the form of RecordingIndex. This contains categorized recordings for the different service
 * calls.
 *
 * Note that:
 * - the 'tools/mock-handling' program can be used to create recordings AND the recording index.
 * - typically you want to use this recordedBackend with the recordings from the reference workspace; there
 *   is already tooling and infrastructure around populating that project
 *
 * @param index - recording index
 * @param config - backend config, for now just for compatibility sakes with the analytical backend config
 * @param capabilities - backend capabilities to use
 * @internal
 */
export declare function recordedBackend(index: RecordingIndex, config?: RecordedBackendConfig, capabilities?: IBackendCapabilities): IAnalyticalBackend;
//# sourceMappingURL=index.d.ts.map