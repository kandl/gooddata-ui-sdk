// (C) 2022 GoodData Corporation
import { NotSupported } from "@gooddata/sdk-backend-spi";
export class OrganizationStylingService {
    constructor() {
        this.defaultReject = (message) => Promise.reject(new NotSupported(message));
        this.defaultRejectTheme = () => this.defaultReject("Backend does not support theming on organization level");
        this.defaultRejectColorPalette = () => this.defaultReject("Backend does not support color palette on organization level");
        this.getThemes = () => this.defaultRejectTheme();
        this.getActiveTheme = () => this.defaultRejectTheme();
        this.setActiveTheme = () => this.defaultRejectTheme();
        this.clearActiveTheme = () => this.defaultRejectTheme();
        this.createTheme = (_theme) => this.defaultRejectTheme();
        /**
         * Update existing theme on organization level.
         *
         * @returns promise
         */
        this.updateTheme = (_theme) => this.defaultRejectTheme();
        /**
         * Delete theme on organization level.
         *
         * @returns promise
         */
        this.deleteTheme = (_themeRef) => this.defaultRejectTheme();
        this.getColorPalettes = () => this.defaultRejectColorPalette();
        this.getActiveColorPalette = () => this.defaultRejectColorPalette();
        this.setActiveColorPalette = () => this.defaultRejectColorPalette();
        this.clearActiveColorPalette = () => this.defaultRejectColorPalette();
        this.createColorPalette = (_colorPalette) => this.defaultRejectColorPalette();
        this.updateColorPalette = (_colorPalette) => this.defaultRejectColorPalette();
        this.deleteColorPalette = (_colorPaletteRef) => this.defaultRejectColorPalette();
    }
}
//# sourceMappingURL=styling.js.map