import { IOrganizationSettingsService } from "@gooddata/sdk-backend-spi";
import { ISettings, IWhiteLabeling } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard, TigerSettingsType } from "../../types/index.js";
import { TigerSettingsService } from "../settings/index.js";
export declare class OrganizationSettingsService extends TigerSettingsService<ISettings> implements IOrganizationSettingsService {
    readonly authCall: TigerAuthenticatedCallGuard;
    constructor(authCall: TigerAuthenticatedCallGuard);
    setWhiteLabeling(whiteLabeling: IWhiteLabeling): Promise<void>;
    setTimezone(timezone: string): Promise<void>;
    setDateFormat(dateFormat: string): Promise<void>;
    setWeekStart(weekStart: string): Promise<void>;
    setTheme(activeThemeId: string): Promise<void>;
    deleteTheme(): Promise<void>;
    setColorPalette(activeColorPaletteId: string): Promise<void>;
    deleteColorPalette(): Promise<void>;
    getSettings(): Promise<ISettings>;
    protected getSettingByType(type: TigerSettingsType): Promise<import("axios").AxiosResponse<import("@gooddata/api-client-tiger").JsonApiOrganizationSettingOutList, any>>;
    protected updateSetting(type: TigerSettingsType, id: string, content: any): Promise<any>;
    protected createSetting(type: TigerSettingsType, id: string, content: any): Promise<any>;
    protected deleteSettingByType(type: TigerSettingsType): Promise<void>;
}
//# sourceMappingURL=settings.d.ts.map