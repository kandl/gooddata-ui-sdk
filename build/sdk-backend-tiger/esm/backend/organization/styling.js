// (C) 2022 GoodData Corporation
import { v4 as uuidv4 } from "uuid";
import { jsonApiHeaders, MetadataUtilities, } from "@gooddata/api-client-tiger";
import { idRef, } from "@gooddata/sdk-model";
import { objRefToIdentifier } from "../../utils/api.js";
import { convertTheme as convertThemeFromBackend, convertThemeWithLinks, } from "../../convertors/fromBackend/ThemeConverter.js";
import { convertColorPalette as convertColorPaletteFromBackend, convertColorPaletteWithLinks, getColorPaletteFromMDObject, isValidColorPalette, } from "../../convertors/fromBackend/ColorPaletteConverter.js";
import { convertTheme as convertThemeToBackend } from "../../convertors/toBackend/ThemeConverter.js";
import { convertColorPalette as convertColorPaletteToBackend } from "../../convertors/toBackend/ColorPaletteConverter.js";
import { OrganizationSettingsService } from "./settings.js";
export class OrganizationStylingService {
    constructor(authCall) {
        this.authCall = authCall;
        this.settingsService = new OrganizationSettingsService(this.authCall);
        this.getActiveTheme = () => this.getActiveSetting("activeTheme");
        this.getActiveColorPalette = () => this.getActiveSetting("activeColorPalette");
    }
    async getThemes() {
        return await this.authCall((client) => MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesThemes, {
            sort: ["name"],
        })
            .then(MetadataUtilities.mergeEntitiesResults)
            .then((themes) => themes.data.map(convertThemeWithLinks)));
    }
    async getActiveSetting(setting) {
        const settings = await this.settingsService.getSettings();
        const foundSetting = settings === null || settings === void 0 ? void 0 : settings[setting];
        return (foundSetting === null || foundSetting === void 0 ? void 0 : foundSetting.id) ? idRef(foundSetting.id) : undefined;
    }
    async setActiveTheme(themeRef) {
        const themeId = await objRefToIdentifier(themeRef, this.authCall);
        await this.settingsService.setTheme(themeId);
    }
    async clearActiveTheme() {
        await this.settingsService.deleteTheme();
    }
    async createTheme(theme) {
        return await this.authCall((client) => client.entities
            .createEntityThemes({
            jsonApiThemeInDocument: {
                data: convertThemeToBackend(uuidv4(), theme),
            },
        }, {
            headers: jsonApiHeaders,
        })
            .then(this.parseResult));
    }
    async updateTheme(theme) {
        if (!theme.ref) {
            return this.createTheme(theme);
        }
        const id = await objRefToIdentifier(theme.ref, this.authCall);
        return await this.authCall((client) => client.entities
            .updateEntityThemes({
            id,
            jsonApiThemeInDocument: {
                data: convertThemeToBackend(id, theme),
            },
        }, {
            headers: jsonApiHeaders,
        })
            .then(this.parseResult));
    }
    parseResult(result) {
        return convertThemeFromBackend(result.data);
    }
    async deleteTheme(themeRef) {
        const id = await objRefToIdentifier(themeRef, this.authCall);
        await this.authCall((client) => client.entities.deleteEntityThemes({
            id,
        }));
    }
    async getColorPalettes() {
        return await this.authCall((client) => MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesColorPalettes, {
            sort: ["name"],
        })
            .then(MetadataUtilities.mergeEntitiesResults)
            .then((colorPalettes) => {
            return colorPalettes.data
                .filter((colorPaletteData) => isValidColorPalette(getColorPaletteFromMDObject(colorPaletteData)))
                .map(convertColorPaletteWithLinks);
        }));
    }
    async setActiveColorPalette(colorPaletteRef) {
        const colorPaletteId = await objRefToIdentifier(colorPaletteRef, this.authCall);
        await this.settingsService.setColorPalette(colorPaletteId);
    }
    async clearActiveColorPalette() {
        await this.settingsService.deleteColorPalette();
    }
    async createColorPalette(colorPalette) {
        if (isValidColorPalette(colorPalette.colorPalette)) {
            return await this.authCall((client) => client.entities
                .createEntityColorPalettes({
                jsonApiColorPaletteInDocument: {
                    data: convertColorPaletteToBackend(uuidv4(), colorPalette),
                },
            }, {
                headers: jsonApiHeaders,
            })
                .then(this.parseColorPaletteResult));
        }
        throw new Error("Invalid color palette format");
    }
    async updateColorPalette(colorPalette) {
        if (!colorPalette.ref) {
            return this.createColorPalette(colorPalette);
        }
        if (isValidColorPalette(colorPalette.colorPalette)) {
            const id = await objRefToIdentifier(colorPalette.ref, this.authCall);
            return await this.authCall((client) => client.entities
                .updateEntityColorPalettes({
                id,
                jsonApiColorPaletteInDocument: {
                    data: convertColorPaletteToBackend(id, colorPalette),
                },
            }, {
                headers: jsonApiHeaders,
            })
                .then(this.parseColorPaletteResult));
        }
        throw new Error("Invalid color palette format");
    }
    async deleteColorPalette(colorPaletteRef) {
        const id = await objRefToIdentifier(colorPaletteRef, this.authCall);
        await this.authCall((client) => client.entities.deleteEntityColorPalettes({ id }));
    }
    parseColorPaletteResult(result) {
        const { data } = result;
        return convertColorPaletteFromBackend(data);
    }
}
//# sourceMappingURL=styling.js.map