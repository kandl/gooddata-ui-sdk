// (C) 2022 GoodData Corporation
import { idRef, colorPaletteToColors, } from "@gooddata/sdk-model";
import { DefaultColorPalette } from "@gooddata/sdk-ui";
/**
 * Dummy theme metadata object which represents the default colors of GD.
 *
 * This object is used as default when rendering theme as a sequence of colored elements in styling
 * picker. It's properties are also used as defaults when some custom theme is missing a crucial
 * property for the same rendering purposes.
 *
 * @internal
 */
export const defaultThemeMetadataObject = {
    id: "default-theme",
    ref: idRef("default-theme"),
    uri: "",
    type: "theme",
    description: "",
    production: false,
    deprecated: false,
    unlisted: false,
    title: "Indigo",
    theme: {
        palette: {
            primary: {
                base: "#14b2e2",
            },
            complementary: {
                c0: "#fff",
                c1: "#303442",
                c7: "#778491",
                c8: "#464e56",
                c9: "#000",
            },
        },
    },
};
/**
 * This function transforms a theme metadata object into an array of colors which is used
 * to render the theme in styling picker. When provided theme object is missing some properties,
 * defaults are taken from the {@link defaultThemeMetadataObject}.
 *
 * @internal
 */
export const getColorsPreviewFromTheme = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const { theme: defaultTheme } = defaultThemeMetadataObject;
    const color1 = ((_b = (_a = theme.dashboards) === null || _a === void 0 ? void 0 : _a.navigation) === null || _b === void 0 ? void 0 : _b.backgroundColor) ||
        ((_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.complementary) === null || _d === void 0 ? void 0 : _d.c1) ||
        defaultTheme.palette.complementary.c1;
    const color2 = ((_f = (_e = theme.dashboards) === null || _e === void 0 ? void 0 : _e.content) === null || _f === void 0 ? void 0 : _f.backgroundColor) ||
        ((_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.complementary) === null || _h === void 0 ? void 0 : _h.c0) ||
        defaultTheme.palette.complementary.c0;
    const color3 = ((_k = (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.primary) === null || _k === void 0 ? void 0 : _k.base) || defaultTheme.palette.primary.base;
    const color4 = ((_p = (_o = (_m = (_l = theme.dashboards) === null || _l === void 0 ? void 0 : _l.content) === null || _m === void 0 ? void 0 : _m.kpiWidget) === null || _o === void 0 ? void 0 : _o.kpi) === null || _p === void 0 ? void 0 : _p.primaryMeasureColor) ||
        ((_r = (_q = theme.palette) === null || _q === void 0 ? void 0 : _q.complementary) === null || _r === void 0 ? void 0 : _r.c9) ||
        defaultTheme.palette.complementary.c9;
    const color5 = ((_t = (_s = theme.dashboards) === null || _s === void 0 ? void 0 : _s.title) === null || _t === void 0 ? void 0 : _t.color) ||
        ((_v = (_u = theme.palette) === null || _u === void 0 ? void 0 : _u.complementary) === null || _v === void 0 ? void 0 : _v.c8) ||
        defaultTheme.palette.complementary.c8;
    const color6 = ((_x = (_w = theme.palette) === null || _w === void 0 ? void 0 : _w.complementary) === null || _x === void 0 ? void 0 : _x.c7) || defaultTheme.palette.complementary.c7;
    return [color1, color2, color3, color4, color5, color6];
};
/**
 * Dummy theme metadata object which represents the default colors of GD.
 *
 * This object is used as default when rendering theme as a sequence of colored elements in styling
 * picker. It's properties are also used as defaults when some custom theme is missing a crucial
 * property for the same rendering purposes.
 *
 * @internal
 */
export const defaultColorPaletteMetadataObject = {
    id: "default-color-palette",
    ref: idRef("default-color-palette"),
    uri: "",
    type: "colorPalette",
    description: "",
    production: false,
    deprecated: false,
    unlisted: false,
    title: "Indigo",
    colorPalette: DefaultColorPalette,
};
/**
 * This function transforms a color palette into an array of max ten colors which is used
 * to render the color palette in styling picker.
 *
 * @internal
 */
export const getColorsPreviewFromColorPalette = (colorPalette) => {
    return colorPaletteToColors(colorPalette).slice(0, 10);
};
//# sourceMappingURL=utils.js.map