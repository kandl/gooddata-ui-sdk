import { IOrganizationStylingService } from "@gooddata/sdk-backend-spi";
import { IThemeMetadataObject, ObjRef, IThemeDefinition, IColorPaletteMetadataObject, IColorPaletteDefinition } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../types/index.js";
export declare class OrganizationStylingService implements IOrganizationStylingService {
    readonly authCall: TigerAuthenticatedCallGuard;
    constructor(authCall: TigerAuthenticatedCallGuard);
    private settingsService;
    getThemes(): Promise<IThemeMetadataObject[]>;
    private getActiveSetting;
    getActiveTheme: () => Promise<ObjRef | undefined>;
    setActiveTheme(themeRef: ObjRef): Promise<void>;
    clearActiveTheme(): Promise<void>;
    createTheme(theme: IThemeDefinition): Promise<IThemeMetadataObject>;
    updateTheme(theme: IThemeDefinition): Promise<IThemeMetadataObject>;
    private parseResult;
    deleteTheme(themeRef: ObjRef): Promise<void>;
    getColorPalettes(): Promise<IColorPaletteMetadataObject[]>;
    getActiveColorPalette: () => Promise<ObjRef | undefined>;
    setActiveColorPalette(colorPaletteRef: ObjRef): Promise<void>;
    clearActiveColorPalette(): Promise<void>;
    createColorPalette(colorPalette: IColorPaletteDefinition): Promise<IColorPaletteMetadataObject>;
    updateColorPalette(colorPalette: IColorPaletteDefinition): Promise<IColorPaletteMetadataObject>;
    deleteColorPalette(colorPaletteRef: ObjRef): Promise<void>;
    private parseColorPaletteResult;
}
//# sourceMappingURL=styling.d.ts.map