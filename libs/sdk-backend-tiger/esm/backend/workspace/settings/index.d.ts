import { IWorkspaceSettings, IWorkspaceSettingsService, IUserWorkspaceSettings } from "@gooddata/sdk-backend-spi";
import { TigerAuthenticatedCallGuard, TigerSettingsType } from "../../../types/index.js";
import { TigerSettingsService } from "../../settings/index.js";
export declare class TigerWorkspaceSettings extends TigerSettingsService<IWorkspaceSettings> implements IWorkspaceSettingsService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string);
    getSettings(): Promise<IWorkspaceSettings>;
    getSettingsForCurrentUser(): Promise<IUserWorkspaceSettings>;
    protected getSettingByType(type: TigerSettingsType): Promise<import("axios").AxiosResponse<import("@gooddata/api-client-tiger").JsonApiWorkspaceSettingOutList, any>>;
    protected updateSetting(type: TigerSettingsType, id: string, content: any): Promise<any>;
    protected createSetting(type: TigerSettingsType, content: any): Promise<any>;
    protected deleteSettingByType(type: TigerSettingsType): Promise<any>;
}
/**
 * Expose this wrapper to other SPI implementations
 *
 * @internal
 */
export declare function getSettingsForCurrentUser(authCall: TigerAuthenticatedCallGuard, workspace: string): Promise<IUserWorkspaceSettings>;
//# sourceMappingURL=index.d.ts.map