import { IColorPaletteItem, IFeatureFlags } from "./interfaces.js";
export interface IStyleSettingsResponse {
    styleSettings: IStyleSettings;
}
export interface IStyleSettings {
    chartPalette: IColorPaletteItem[];
    chartFont?: IChartFont;
}
export interface IChartFont {
    family: string;
}
export interface IFeatureFlagsResponse {
    featureFlags: IFeatureFlags;
}
//# sourceMappingURL=apiResponsesInterfaces.d.ts.map