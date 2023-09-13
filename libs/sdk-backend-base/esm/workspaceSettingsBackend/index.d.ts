import { IAnalyticalBackend, IUserWorkspaceSettings, IWorkspaceSettings } from "@gooddata/sdk-backend-spi";
import { ISettings } from "@gooddata/sdk-model";
/**
 * Adjusts workspace config
 *
 * @beta
 */
export type SettingsWrapper = (settings: IWorkspaceSettings) => IWorkspaceSettings;
/**
 * Adjusts current user config
 *
 * @beta
 */
export type CurrentUserSettingsWrapper = (settings: IUserWorkspaceSettings) => IUserWorkspaceSettings;
/**
 * Adjusts both workspace and user settings
 *
 * @beta
 */
export type CommonSettingsWrapper = (settings: ISettings) => ISettings;
/**
 * Specifies workspace settings and current user settings to be adjusted by the decorator.
 *
 * @beta
 */
export interface WorkspaceSettingsConfiguration {
    /**
     * Transforms both workspace settings and user settings obtained from the real backend. Can add,
     * remove or alter settings or provide a completely new settings.
     * Execution of this wrapper precedes execution of the specific wrappers for user and workspace settings
     */
    commonSettingsWrapper?: CommonSettingsWrapper;
    /**
     * Transforms workspace settings obtained from the real backend. Can add, remove or alter settings
     * or provide a completely new settings
     */
    settingsWrapper?: SettingsWrapper;
    /**
     * Transforms user settings obtained from the real backend. Can add, remove or alter settings
     * or provide a completely new settings
     */
    currentUserSettingsWrapper?: CurrentUserSettingsWrapper;
}
/**
 * Adjusts workspace configs and current user configs from the real backend.
 *
 * @remarks see {@link WorkspaceSettingsConfiguration} properties for more information.
 * @param realBackend - real backend to decorate with custom workspace settings
 * @param config - workspace configs configuration
 * @beta
 */
export declare function withCustomWorkspaceSettings(realBackend: IAnalyticalBackend, config: WorkspaceSettingsConfiguration): IAnalyticalBackend;
//# sourceMappingURL=index.d.ts.map