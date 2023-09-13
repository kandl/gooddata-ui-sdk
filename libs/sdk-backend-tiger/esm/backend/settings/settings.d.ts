import { TigerSettingsType } from "../../types/index.js";
export declare class TigerSettingsService<T> {
    constructor();
    getSettings(): Promise<T>;
    setLocale(locale: string): Promise<void>;
    protected setSetting(type: TigerSettingsType, content: any): Promise<void>;
    protected getSettingByType(_type: TigerSettingsType): Promise<any>;
    protected deleteSettingByType(_type: TigerSettingsType): Promise<any>;
    protected updateSetting(_type: TigerSettingsType, _id: string, _content: any): Promise<any>;
    protected createSetting(_type: TigerSettingsType, _id: string, _content: any): Promise<any>;
}
//# sourceMappingURL=settings.d.ts.map