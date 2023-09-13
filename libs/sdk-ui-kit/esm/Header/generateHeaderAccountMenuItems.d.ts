import { ISettings, IWorkspacePermissions } from "@gooddata/sdk-model";
import { IHeaderMenuItem } from "./typings.js";
/**
 * @internal
 */
export interface IUiSettings {
    displayAccountPage: boolean;
}
/**
 * @internal
 */
export declare function generateHeaderAccountMenuItems(workspacePermissions: IWorkspacePermissions, // bootstrapResource.current.projectPermissions
uiSettings: IUiSettings, // bootstrapResource.settings
workspaceId?: string, // parsed from bootstrapResource.current.project.links.self
showOnlyLogoutItem?: boolean, featureFlags?: ISettings): IHeaderMenuItem[];
//# sourceMappingURL=generateHeaderAccountMenuItems.d.ts.map