// (C) 2021-2022 GoodData Corporation
import { mix } from "polished";
const COMPLEMENTARY_PALETTE_PREFIX = "c";
const getShade = (palette, index) => {
    const paletteKeys = Object.keys(palette)
        .sort()
        .map((shade) => parseInt(shade.replace(COMPLEMENTARY_PALETTE_PREFIX, "")));
    const nearestPrevShadeKey = paletteKeys.filter((paletteKey) => paletteKey < index).slice(-1)[0] || 0;
    const nearestNextShadeKey = paletteKeys.filter((paletteKey) => paletteKey > index)[0] || 9;
    const shadesCount = nearestNextShadeKey - nearestPrevShadeKey;
    const mixStep = 1 / shadesCount;
    const nearestPrevShade = palette[`${COMPLEMENTARY_PALETTE_PREFIX}${nearestPrevShadeKey}`] ||
        "#fff";
    const nearestNextShade = palette[`${COMPLEMENTARY_PALETTE_PREFIX}${nearestNextShadeKey}`] ||
        "#000";
    return mix(mixStep * (nearestNextShadeKey - index), nearestPrevShade, nearestNextShade);
};
/**
 * Completes provided complementary palette with missing shades by mixing nearest known shades
 *
 * @internal
 */
export const getComplementaryPalette = (palette) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return {
        c0: palette.c0,
        c1: (_a = palette.c1) !== null && _a !== void 0 ? _a : getShade(palette, 1),
        c2: (_b = palette.c2) !== null && _b !== void 0 ? _b : getShade(palette, 2),
        c3: (_c = palette.c3) !== null && _c !== void 0 ? _c : getShade(palette, 3),
        c4: (_d = palette.c4) !== null && _d !== void 0 ? _d : getShade(palette, 4),
        c5: (_e = palette.c5) !== null && _e !== void 0 ? _e : getShade(palette, 5),
        c6: (_f = palette.c6) !== null && _f !== void 0 ? _f : getShade(palette, 6),
        c7: (_g = palette.c7) !== null && _g !== void 0 ? _g : getShade(palette, 7),
        c8: (_h = palette.c8) !== null && _h !== void 0 ? _h : getShade(palette, 8),
        c9: palette.c9,
    };
};
//# sourceMappingURL=complementaryPalette.js.map