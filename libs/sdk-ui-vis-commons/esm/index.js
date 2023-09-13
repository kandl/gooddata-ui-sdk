// (C) 2019-2022 GoodData Corporation
/**
 * This package provides functions commonly used when building visualizations.
 *
 * @remarks
 * This package is mainly used internally by other `@gooddata/sdk-ui-*` packages, and we do not recommend using
 * it directly outside of GoodData because its API can change at any time.
 *
 * @packageDocumentation
 */
export { AttributeColorStrategy } from "./coloring/attribute.js";
export { ColorStrategy, getAttributeColorAssignment, isValidMappedColor, } from "./coloring/base.js";
export { getColorByGuid, getColorFromMapping, getColorMappingPredicate, getColorPaletteFromColors, getLighterColor, getLighterColorFromRGB, getRgbString, getRgbStringFromRGB, isCustomPalette, normalizeColorToRGB, parseRGBColorCode, getValidColorPalette, ColorUtils, parseRGBString, } from "./coloring/color.js";
export { Legend } from "./legend/Legend.js";
export { StaticLegend } from "./legend/StaticLegend.js";
export { PopUpLegend } from "./legend/PopUpLegend/PopUpLegend.js";
export { FluidLegend } from "./legend/FluidLegend.js";
export { HeatmapLegend } from "./legend/HeatmapLegend.js";
export { ColorLegend } from "./legend/ColorLegend.js";
export { Paging } from "./legend/Paging.js";
export { HeadlinePagination } from "./compactSize/HeadlinePagination.js";
export { formatLegendLabel, shouldShowFluid, FLUID_LEGEND_THRESHOLD } from "./legend/helpers.js";
export { DEFAULT_LEGEND_CONFIG, LegendPosition, SupportedLegendPositions, } from "./legend/types.js";
export { fixEmptyHeaderItems } from "./utils/fixEmptyHeaderItems.js";
export { valueWithEmptyHandling } from "./utils/valueWithEmptyHandling.js";
export { shouldRenderPagination, calculateHeadlineHeightFontSize } from "./utils/calculateCustomHeight.js";
export { getHeadlineResponsiveClassName } from "./utils/headlineResponsiveClassName.js";
export { getLegendDetails } from "./legend/PopUpLegend/helpers.js";
//# sourceMappingURL=index.js.map