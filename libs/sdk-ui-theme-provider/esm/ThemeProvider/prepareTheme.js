import { getContrast, shade } from "polished";
import { getComplementaryPalette } from "../complementaryPalette.js";
/**
 * Minimum contrast ratio n:1 recommended by W3C
 * https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */
const MIN_CONTRAST_RATIO = 3;
const DEFAULT_BACKGROUND_COLOR = "#fff";
export const prepareComplementaryPalette = (theme) => {
    var _a;
    if ((_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) {
        return Object.assign(Object.assign({}, theme), { palette: Object.assign(Object.assign({}, theme.palette), { complementary: getComplementaryPalette(theme.palette.complementary) }) });
    }
    return theme;
};
export const prepareBaseColors = (theme) => {
    var _a;
    const defaultPrimary = "#14b2e2";
    const defaultSuccess = "#00c18d";
    const defaultError = "#e54d42";
    const defaultWarning = "#fada23";
    if ((_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) {
        return Object.assign(Object.assign({}, theme), { palette: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, theme.palette), (theme.palette.primary ? {} : { primary: { base: defaultPrimary } })), (theme.palette.success ? {} : { success: { base: defaultSuccess } })), (theme.palette.error ? {} : { error: { base: defaultError } })), (theme.palette.warning ? {} : { warning: { base: defaultWarning } })) });
    }
    return theme;
};
export const stripComplementaryPalette = (theme) => {
    var _a;
    const strippedTheme = Object.assign({}, theme);
    ((_a = strippedTheme === null || strippedTheme === void 0 ? void 0 : strippedTheme.palette) === null || _a === void 0 ? void 0 : _a.complementary) && delete strippedTheme.palette.complementary;
    (strippedTheme === null || strippedTheme === void 0 ? void 0 : strippedTheme.chart) && delete strippedTheme.chart;
    (strippedTheme === null || strippedTheme === void 0 ? void 0 : strippedTheme.table) && delete strippedTheme.table;
    return strippedTheme;
};
export const preparePrimaryColor = (theme) => {
    var _a, _b, _c;
    const primaryColor = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.primary) === null || _b === void 0 ? void 0 : _b.base;
    if (!((_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.complementary) || !primaryColor) {
        return theme;
    }
    let contrastPrimaryColor = primaryColor;
    while (getContrast(contrastPrimaryColor, DEFAULT_BACKGROUND_COLOR) < MIN_CONTRAST_RATIO) {
        contrastPrimaryColor = shade(0.05, contrastPrimaryColor);
    }
    return Object.assign(Object.assign({}, theme), { palette: Object.assign(Object.assign({}, theme.palette), { primary: Object.assign(Object.assign({}, theme.palette.primary), { base: contrastPrimaryColor }) }) });
};
export const prepareTheme = (theme, enableComplementaryPalette = true) => {
    if (!enableComplementaryPalette) {
        const themeWithContrastPrimaryColor = preparePrimaryColor(theme);
        return stripComplementaryPalette(themeWithContrastPrimaryColor);
    }
    const themeWithComplementaryPalette = prepareComplementaryPalette(theme);
    return prepareBaseColors(themeWithComplementaryPalette);
};
//# sourceMappingURL=prepareTheme.js.map