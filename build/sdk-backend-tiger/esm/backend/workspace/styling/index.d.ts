import { IWorkspaceStylingService } from "@gooddata/sdk-backend-spi";
import { IColorPaletteItem, ITheme } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
export declare class TigerWorkspaceStyling implements IWorkspaceStylingService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string);
    /**
     * Checks if Theming needs to be loaded.
     * Theming needs to be enabled by license entitlement
     * and activeTheme needs to be defined
     *
     * @returns boolean
     */
    private isStylizable;
    getColorPalette: () => Promise<IColorPaletteItem[]>;
    getTheme: () => Promise<ITheme>;
}
//# sourceMappingURL=index.d.ts.map