import { IUserWorkspaceSettings } from "@gooddata/sdk-backend-spi";
import { ISettings } from "@gooddata/sdk-model";
/**
 * Given an object with settings that include user and workspace information, convert to a new object that
 * contains just the settings.
 *
 * @param userWorkspaceSettings - full object to strip of extra user and workspace data
 */
export declare function stripUserAndWorkspaceProps(userWorkspaceSettings: IUserWorkspaceSettings): ISettings;
