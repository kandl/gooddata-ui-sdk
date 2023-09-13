import { ApiEntitlementNameEnum } from "@gooddata/api-client-tiger";
import { getSettingsForCurrentUser } from "../settings/index.js";
import { DefaultColorPalette } from "./mocks/colorPalette.js";
import { DefaultTheme } from "./mocks/theme.js";
import { unwrapColorPaletteContent } from "../../../convertors/fromBackend/ColorPaletteConverter.js";
export class TigerWorkspaceStyling {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.getColorPalette = async () => {
            var _a, _b;
            const userSettings = await getSettingsForCurrentUser(this.authCall, this.workspace);
            const activeColorPaletteId = (_b = (_a = userSettings.activeColorPalette) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "";
            return (await this.isStylizable(activeColorPaletteId))
                ? this.authCall(async (client) => client.entities
                    .getAllEntitiesColorPalettes({
                    filter: `id=="${activeColorPaletteId}"`,
                })
                    .then((colorPalettes) => {
                    if (colorPalettes.data.data.length !== 0) {
                        return unwrapColorPaletteContent(colorPalettes.data.data[0].attributes.content);
                    }
                    return DefaultColorPalette;
                })
                    .catch(() => {
                    // Failed theme loading should not break application
                    return DefaultColorPalette;
                }))
                : DefaultColorPalette;
        };
        this.getTheme = async () => {
            var _a, _b;
            const userSettings = await getSettingsForCurrentUser(this.authCall, this.workspace);
            const activeThemeId = (_b = (_a = userSettings.activeTheme) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "";
            return (await this.isStylizable(activeThemeId))
                ? this.authCall(async (client) => client.entities
                    .getAllEntitiesThemes({
                    filter: `id=="${activeThemeId}"`,
                })
                    .then((themes) => {
                    if (themes.data.data.length !== 0) {
                        return themes.data.data[0].attributes.content;
                    }
                    return DefaultTheme;
                })
                    .catch(() => {
                    // Failed theme loading should not break application
                    return DefaultTheme;
                }))
                : DefaultTheme;
        };
    }
    /**
     * Checks if Theming needs to be loaded.
     * Theming needs to be enabled by license entitlement
     * and activeTheme needs to be defined
     *
     * @returns boolean
     */
    async isStylizable(activeStyleId) {
        const isCustomThemingIncludedInEntitlements = await this.authCall(async (client) => client.actions
            .resolveRequestedEntitlements({
            entitlementsRequest: { entitlementsName: [ApiEntitlementNameEnum.CUSTOM_THEMING] },
        })
            .then((res) => { var _a; return ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.length) === 1; }));
        return isCustomThemingIncludedInEntitlements && activeStyleId !== "";
    }
}
//# sourceMappingURL=index.js.map