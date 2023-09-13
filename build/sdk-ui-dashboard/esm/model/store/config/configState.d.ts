import { ResolvedDashboardConfig } from "../../types/commonTypes.js";
/**
 * @public
 */
export interface ConfigState {
    /** @beta */
    config?: ResolvedDashboardConfig;
}
export declare const configInitialState: ConfigState;
