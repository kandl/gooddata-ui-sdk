// (C) 2021-2022 GoodData Corporation
import { transparentize, darken, lighten, mix, setLightness } from "polished";
import { getCssProperty } from "./cssProperty.js";
// keep it in sync with SCSS:$gd-color-text-light
const GD_COLOR_TEXT_LIGHT = "#fff";
const GD_COLOR_TEXT = "#464e56";
export const getHigherContrastColor = (amount, color, isDarkTheme) => color && ((isDarkTheme && lighten(amount, color)) || darken(amount, color));
export const getLowerContrastColor = (amount, color, isDarkTheme) => color && ((isDarkTheme && darken(amount, color)) || lighten(amount, color));
export const getLeastContrastColor = (color, isDarkTheme) => color && setLightness(isDarkTheme ? 0.04 : 0.96, color);
export const mixWith0ComplementaryColor = (amount, color, palette) => { var _a; return color && mix(amount, color, ((_a = palette === null || palette === void 0 ? void 0 : palette.complementary) === null || _a === void 0 ? void 0 : _a.c0) || GD_COLOR_TEXT_LIGHT); };
export const mixWith8ComplementaryColor = (amount, color, palette) => { var _a; return color && mix(amount, color, ((_a = palette === null || palette === void 0 ? void 0 : palette.complementary) === null || _a === void 0 ? void 0 : _a.c8) || GD_COLOR_TEXT); };
const getCommonDerivedColors = (palette, isDarkTheme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return [
        getCssProperty("palette-primary-dimmed", mixWith0ComplementaryColor(0.1, (_a = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _a === void 0 ? void 0 : _a.base, palette)),
        getCssProperty("palette-primary-dimmed50", mixWith0ComplementaryColor(0.5, (_b = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _b === void 0 ? void 0 : _b.base, palette)),
        getCssProperty("palette-primary-lightest", getLeastContrastColor((_c = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _c === void 0 ? void 0 : _c.base, isDarkTheme)),
        getCssProperty("palette-error-dimmed", mixWith0ComplementaryColor(0.1, (_d = palette === null || palette === void 0 ? void 0 : palette.error) === null || _d === void 0 ? void 0 : _d.base, palette)),
        getCssProperty("palette-error-lightest", getLeastContrastColor((_e = palette === null || palette === void 0 ? void 0 : palette.error) === null || _e === void 0 ? void 0 : _e.base, isDarkTheme)),
        getCssProperty("palette-error-dimmed90", mixWith0ComplementaryColor(0.9, (_f = palette === null || palette === void 0 ? void 0 : palette.error) === null || _f === void 0 ? void 0 : _f.base, palette)),
        getCssProperty("palette-warning-dimmed", mixWith0ComplementaryColor(0.2, (_g = palette === null || palette === void 0 ? void 0 : palette.warning) === null || _g === void 0 ? void 0 : _g.base, palette)),
        getCssProperty("palette-warning-dimmed40", mixWith8ComplementaryColor(0.4, (_h = palette === null || palette === void 0 ? void 0 : palette.warning) === null || _h === void 0 ? void 0 : _h.base, palette)),
        getCssProperty("palette-warning-text-dimmed", mixWith8ComplementaryColor(0.2, (_j = palette === null || palette === void 0 ? void 0 : palette.warning) === null || _j === void 0 ? void 0 : _j.base, palette)),
        getCssProperty("palette-success-dimmed", mixWith0ComplementaryColor(0.1, (_k = palette === null || palette === void 0 ? void 0 : palette.success) === null || _k === void 0 ? void 0 : _k.base, palette)),
    ];
};
const getMessagesDerivedColors = (palette) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return [
        getCssProperty("palette-primary-base-t02", ((_a = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _a === void 0 ? void 0 : _a.base) && transparentize(0.02, palette.primary.base)),
        getCssProperty("palette-error-base-t02", ((_b = palette === null || palette === void 0 ? void 0 : palette.error) === null || _b === void 0 ? void 0 : _b.base) && transparentize(0.02, palette.error.base)),
        getCssProperty("palette-success-base-t02", ((_c = palette === null || palette === void 0 ? void 0 : palette.success) === null || _c === void 0 ? void 0 : _c.base) && transparentize(0.02, palette.success.base)),
        getCssProperty("palette-error-base-t85", ((_d = palette === null || palette === void 0 ? void 0 : palette.error) === null || _d === void 0 ? void 0 : _d.base) && transparentize(0.85, palette.error.base)),
        getCssProperty("palette-warning-base-t85", ((_e = palette === null || palette === void 0 ? void 0 : palette.warning) === null || _e === void 0 ? void 0 : _e.base) && transparentize(0.85, palette.warning.base)),
        getCssProperty("palette-info-base-t85", ((_f = palette === null || palette === void 0 ? void 0 : palette.info) === null || _f === void 0 ? void 0 : _f.base) && transparentize(0.85, palette.info.base)),
        getCssProperty("palette-info-base-t02", ((_g = palette === null || palette === void 0 ? void 0 : palette.info) === null || _g === void 0 ? void 0 : _g.base) && transparentize(0.02, palette.info.base)),
        getCssProperty("palette-success-base-t85", ((_h = palette === null || palette === void 0 ? void 0 : palette.success) === null || _h === void 0 ? void 0 : _h.base) && transparentize(0.85, palette.success.base)),
    ];
};
const getDashboardsDerivedColors = (palette) => {
    var _a, _b, _c, _d, _e, _f;
    return [
        getCssProperty("palette-primary-base-t50", ((_a = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _a === void 0 ? void 0 : _a.base) && transparentize(0.5, palette.primary.base)),
        getCssProperty("palette-primary-base-t85", ((_b = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _b === void 0 ? void 0 : _b.base) && transparentize(0.85, palette.primary.base)),
        getCssProperty("palette-primary-base-t90", ((_c = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _c === void 0 ? void 0 : _c.base) && transparentize(0.9, palette.primary.base)),
        getCssProperty("palette-primary-base-mix15-white", ((_d = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _d === void 0 ? void 0 : _d.base) &&
            transparentize(0.075, mixWith0ComplementaryColor(0.5, (_e = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _e === void 0 ? void 0 : _e.base, palette))),
        getCssProperty("palette-warning-base-t50", ((_f = palette === null || palette === void 0 ? void 0 : palette.warning) === null || _f === void 0 ? void 0 : _f.base) && transparentize(0.5, palette.warning.base)),
    ];
};
const getButtonDerivedColors = (palette, isDarkTheme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    return [
        getCssProperty("palette-primary-base-t25", ((_a = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _a === void 0 ? void 0 : _a.base) && transparentize(0.25, palette.primary.base)),
        getCssProperty("palette-primary-base-t70", ((_b = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _b === void 0 ? void 0 : _b.base) && transparentize(0.7, palette.primary.base)),
        getCssProperty("palette-primary-base-t80", ((_c = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _c === void 0 ? void 0 : _c.base) && transparentize(0.8, palette.primary.base)),
        getCssProperty("palette-primary-base-d12", getHigherContrastColor(0.12, (_d = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _d === void 0 ? void 0 : _d.base, isDarkTheme)),
        getCssProperty("palette-primary-base-d06", getHigherContrastColor(0.06, (_e = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _e === void 0 ? void 0 : _e.base, isDarkTheme)),
        getCssProperty("palette-primary-disabled", ((_f = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _f === void 0 ? void 0 : _f.base) &&
            transparentize(0.4, getLowerContrastColor(0.12, palette.primary.base, isDarkTheme))),
        getCssProperty("palette-primary-focus", ((_g = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _g === void 0 ? void 0 : _g.base) &&
            transparentize(0.4, getLowerContrastColor(0.06, palette.primary.base, isDarkTheme))),
        getCssProperty("palette-error-disabled", ((_h = palette === null || palette === void 0 ? void 0 : palette.error) === null || _h === void 0 ? void 0 : _h.base) &&
            transparentize(0.4, getLowerContrastColor(0.2, palette.error.base, isDarkTheme))),
        getCssProperty("palette-error-focus", ((_j = palette === null || palette === void 0 ? void 0 : palette.error) === null || _j === void 0 ? void 0 : _j.base) &&
            transparentize(0.4, getLowerContrastColor(0.1, palette.error.base, isDarkTheme))),
        getCssProperty("palette-error-base-d10", getHigherContrastColor(0.1, (_k = palette === null || palette === void 0 ? void 0 : palette.error) === null || _k === void 0 ? void 0 : _k.base, isDarkTheme)),
        getCssProperty("palette-error-base-d20", getHigherContrastColor(0.2, (_l = palette === null || palette === void 0 ? void 0 : palette.error) === null || _l === void 0 ? void 0 : _l.base, isDarkTheme)),
        getCssProperty("palette-success-disabled", ((_m = palette === null || palette === void 0 ? void 0 : palette.success) === null || _m === void 0 ? void 0 : _m.base) &&
            transparentize(0.5, getLowerContrastColor(0.06, palette.success.base, isDarkTheme))),
        getCssProperty("palette-success-focus", ((_o = palette === null || palette === void 0 ? void 0 : palette.success) === null || _o === void 0 ? void 0 : _o.base) &&
            transparentize(0.5, getLowerContrastColor(0.06, palette.success.base, isDarkTheme))),
        getCssProperty("palette-success-base-d06", getHigherContrastColor(0.06, (_p = palette === null || palette === void 0 ? void 0 : palette.success) === null || _p === void 0 ? void 0 : _p.base, isDarkTheme)),
        getCssProperty("palette-success-base-d12", getHigherContrastColor(0.12, (_q = palette === null || palette === void 0 ? void 0 : palette.success) === null || _q === void 0 ? void 0 : _q.base, isDarkTheme)),
    ];
};
const getBubbleDerivedColors = (palette) => {
    var _a, _b;
    return [
        getCssProperty("palette-primary-base-t10", ((_a = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _a === void 0 ? void 0 : _a.base) && transparentize(0.1, palette.primary.base)),
        getCssProperty("palette-error-base-t10", ((_b = palette === null || palette === void 0 ? void 0 : palette.error) === null || _b === void 0 ? void 0 : _b.base) && transparentize(0.1, palette.error.base)),
    ];
};
const getDateFilterDerivedColors = (palette, isDarkTheme) => {
    var _a;
    return [
        getCssProperty("palette-primary-base-lighten45", getLowerContrastColor(0.45, (_a = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _a === void 0 ? void 0 : _a.base, isDarkTheme)),
    ];
};
const getMeasureNumberFormatDialogDerivedColors = (palette, isDarkTheme) => {
    var _a;
    return [
        getCssProperty("palette-primary-base-darken20", getHigherContrastColor(0.2, (_a = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _a === void 0 ? void 0 : _a.base, isDarkTheme)),
    ];
};
const getPivotTableDerivedColors = (palette, isDarkTheme) => {
    var _a, _b;
    return [
        getCssProperty("palette-primary-base-dimmed-darken03", ((_a = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _a === void 0 ? void 0 : _a.base) &&
            getHigherContrastColor(0.03, mixWith0ComplementaryColor(0.1, (_b = palette === null || palette === void 0 ? void 0 : palette.primary) === null || _b === void 0 ? void 0 : _b.base, palette), isDarkTheme)),
    ];
};
const getFormDerivedColors = (palette, isDarkTheme) => {
    var _a, _b, _c;
    return [
        getCssProperty("palette-error-base-t50", ((_a = palette === null || palette === void 0 ? void 0 : palette.error) === null || _a === void 0 ? void 0 : _a.base) && transparentize(0.5, palette.error.base)),
        getCssProperty("palette-error-base-t70d20", ((_b = palette === null || palette === void 0 ? void 0 : palette.error) === null || _b === void 0 ? void 0 : _b.base) &&
            transparentize(0.7, getHigherContrastColor(0.2, palette.error.base, isDarkTheme))),
        getCssProperty("palette-warning-base-t70d20", ((_c = palette === null || palette === void 0 ? void 0 : palette.warning) === null || _c === void 0 ? void 0 : _c.base) &&
            transparentize(0.7, getHigherContrastColor(0.2, palette.warning.base, isDarkTheme))),
    ];
};
const getComplementaryPaletteDerivedColors = (palette) => {
    var _a, _b;
    return [
        getCssProperty("palette-complementary-0-t50", ((_a = palette === null || palette === void 0 ? void 0 : palette.complementary) === null || _a === void 0 ? void 0 : _a.c0) && transparentize(0.5, palette.complementary.c0)),
        getCssProperty("palette-complementary-0-t10", ((_b = palette === null || palette === void 0 ? void 0 : palette.complementary) === null || _b === void 0 ? void 0 : _b.c0) && transparentize(0.1, palette.complementary.c0)),
    ];
};
/**
 * @internal
 */
export const generateDerivedColors = (palette, isDarkTheme) => {
    if (!palette) {
        return [];
    }
    return [
        ...getCommonDerivedColors(palette, isDarkTheme),
        ...getMessagesDerivedColors(palette),
        ...getDashboardsDerivedColors(palette),
        ...getButtonDerivedColors(palette, isDarkTheme),
        ...getBubbleDerivedColors(palette),
        ...getDateFilterDerivedColors(palette, isDarkTheme),
        ...getMeasureNumberFormatDialogDerivedColors(palette, isDarkTheme),
        ...getPivotTableDerivedColors(palette, isDarkTheme),
        ...getFormDerivedColors(palette, isDarkTheme),
        ...getComplementaryPaletteDerivedColors(palette),
    ].filter((property) => !!property);
};
//# sourceMappingURL=derivedColors.js.map