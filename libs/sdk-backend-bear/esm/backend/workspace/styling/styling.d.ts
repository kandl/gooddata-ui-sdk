import { IWorkspaceStylingService } from "@gooddata/sdk-backend-spi";
import { IColorPaletteItem, ITheme } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearWorkspaceStyling implements IWorkspaceStylingService {
    private readonly authCall;
    readonly workspace: string;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    getColorPalette: () => Promise<IColorPaletteItem[]>;
    getTheme: () => Promise<ITheme>;
}
//# sourceMappingURL=styling.d.ts.map