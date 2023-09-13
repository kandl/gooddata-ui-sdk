import { IUserSettingsService, IUserSettings } from "@gooddata/sdk-backend-spi";
import { TigerAuthenticatedCallGuard, TigerSettingsType } from "../../types/index.js";
import { TigerSettingsService } from "../settings/index.js";
export declare class TigerUserSettingsService extends TigerSettingsService<IUserSettings> implements IUserSettingsService {
    private readonly authCall;
    constructor(authCall: TigerAuthenticatedCallGuard);
    getSettings(): Promise<IUserSettings>;
    protected getSettingByType(type: TigerSettingsType): Promise<import("axios").AxiosResponse<import("@gooddata/api-client-tiger").JsonApiUserSettingOutList, any>>;
    protected updateSetting(type: TigerSettingsType, id: string, content: any): Promise<any>;
    protected createSetting(type: TigerSettingsType, id: string, content: any): Promise<any>;
    protected deleteSettingByType(type: TigerSettingsType): Promise<any>;
}
//# sourceMappingURL=settings.d.ts.map