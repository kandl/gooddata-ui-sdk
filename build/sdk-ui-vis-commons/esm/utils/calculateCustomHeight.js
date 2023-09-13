// (C) 2021 GoodData Corporation
//Obtained from substrabting the widget title and paddings/margins of visualization.
const MINIMUM_HEIGHT_FOR_PAGINATION = 160;
/**
 * @internal
 * If the headline is narrower than this, the compare section will be rendered
 * vertically to save horizontal space.
 */
export const SMALL_COMPARE_SECTION_THRESHOLD = 160;
var HEIGHT;
(function (HEIGHT) {
    HEIGHT[HEIGHT["SMALLEST"] = 34] = "SMALLEST";
    HEIGHT[HEIGHT["EXTRA_SMALL"] = 44] = "EXTRA_SMALL";
    HEIGHT[HEIGHT["SMALL"] = 54] = "SMALL";
    HEIGHT[HEIGHT["NORMAL"] = 64] = "NORMAL";
    HEIGHT[HEIGHT["MEDIUM"] = 94] = "MEDIUM";
    HEIGHT[HEIGHT["LARGE"] = 114] = "LARGE";
})(HEIGHT || (HEIGHT = {}));
var FONT_SIZE;
(function (FONT_SIZE) {
    FONT_SIZE[FONT_SIZE["SMALLEST"] = 30] = "SMALLEST";
    FONT_SIZE[FONT_SIZE["SMALL"] = 36] = "SMALL";
    FONT_SIZE[FONT_SIZE["MEDIUM"] = 46] = "MEDIUM";
    FONT_SIZE[FONT_SIZE["LARGE"] = 50] = "LARGE";
})(FONT_SIZE || (FONT_SIZE = {}));
/**
 * @internal
 * Calculate widget height and font size for Kpi's and Headlines
 * when enableCompactSize is set to true.
 */
export function calculateHeadlineHeightFontSize(secondaryItem, clientHeight) {
    let height;
    let fontSize;
    if (!clientHeight) {
        return { height: undefined, fontSize: undefined };
    }
    if (!secondaryItem) {
        if (clientHeight <= HEIGHT.SMALLEST) {
            height = HEIGHT.SMALLEST;
            fontSize = FONT_SIZE.SMALLEST;
        }
        else if (clientHeight <= HEIGHT.EXTRA_SMALL) {
            height = HEIGHT.EXTRA_SMALL;
            fontSize = FONT_SIZE.SMALL;
        }
        else {
            height = HEIGHT.NORMAL;
            fontSize = FONT_SIZE.LARGE;
        }
    }
    else {
        if (clientHeight <= HEIGHT.MEDIUM) {
            height = HEIGHT.SMALLEST;
            fontSize = FONT_SIZE.SMALLEST;
        }
        else if (clientHeight <= HEIGHT.LARGE) {
            height = HEIGHT.SMALL;
            fontSize = FONT_SIZE.MEDIUM;
        }
        else {
            height = HEIGHT.NORMAL;
            fontSize = FONT_SIZE.LARGE;
        }
    }
    return { height, fontSize };
}
/**
 * @internal
 * Check if Kpi's and Headlines should display pagination according to widget height.
 */
export const shouldRenderPagination = (enableCompactSize, width, height) => {
    const paged = height <= MINIMUM_HEIGHT_FOR_PAGINATION;
    return enableCompactSize && paged && width < SMALL_COMPARE_SECTION_THRESHOLD;
};
//# sourceMappingURL=calculateCustomHeight.js.map