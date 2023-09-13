import { IBackendCapabilities } from "@gooddata/sdk-backend-spi";
/**
 * @public
 */
export interface BackendCapabilitiesState {
    backendCapabilities?: IBackendCapabilities;
}
export declare const backendCapabilitiesInitialState: BackendCapabilitiesState;
