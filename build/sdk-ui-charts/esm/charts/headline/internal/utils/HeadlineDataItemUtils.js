import cx from "classnames";
import isEmpty from "lodash/isEmpty.js";
import isNaN from "lodash/isNaN.js";
import { getHeadlineResponsiveClassName } from "@gooddata/sdk-ui-vis-commons";
import { ClientFormatterFacade } from "@gooddata/number-formatter";
const DEFAULT_VALUE_WHEN_EMPTY = "–";
const INVALID_VALUE = "NaN";
const PERCENTAGE_VALUE_LIMIT = 999;
function formatValueToLabelWithColors(value, format, separators) {
    const parsedNumber = ClientFormatterFacade.convertValue(value);
    // Based on the tests, when a format is not provided, we should refrain from formatting the value using the formatter, as the default format "#,##0.00" will be used.
    // Additionally, the test necessitates that the value should remain unformatted.
    if (!isEmpty(format)) {
        return ClientFormatterFacade.formatValue(parsedNumber, format, separators);
    }
    if (parsedNumber === null || parsedNumber === undefined) {
        return { formattedValue: "", colors: {} };
    }
    else {
        return { formattedValue: parsedNumber.toString(), colors: {} };
    }
}
function buildCssStyle(color, backgroundColor) {
    const style = {};
    if (color !== undefined) {
        style.color = color;
    }
    if (backgroundColor !== undefined) {
        style.backgroundColor = backgroundColor;
    }
    return style;
}
function isShortenedLabel(titleRef) {
    if (!titleRef.current) {
        return false;
    }
    const { height } = titleRef.current.getBoundingClientRect();
    const { lineHeight } = window.getComputedStyle(titleRef.current);
    return height > parseFloat(lineHeight) * 2;
}
/**
 * Format {@link IHeadlineDataItem} value.
 *
 * The method processes the provided item and returns object with value that can be rendered as it is and 'cssStyle'
 * object that can be passed into the react element 'style' attribute.
 */
export function formatItemValue(item, config = {}) {
    const { separators } = config;
    const { formattedValue: label, colors } = formatValueToLabelWithColors(item.value, item.format, separators);
    const isValueEmpty = label === INVALID_VALUE || label === "";
    const value = isValueEmpty ? DEFAULT_VALUE_WHEN_EMPTY : label;
    const usedColors = isValueEmpty ? {} : colors;
    return {
        cssStyle: buildCssStyle(usedColors.color, usedColors.backgroundColor),
        value,
        isValueEmpty,
    };
}
/**
 * The method processes the provided IHeadlineDataItem and returns object with formatted value and isValueEmpty flag.
 *
 * Formatted value conditions:
 *  - value is rounded to Integer
 *  - shows `>999%` when value is above the limit
 *  - shows `<-999%` when value is below the limit
 *  - otherwise shows 'value%'
 */
export function formatPercentageValue(item) {
    if (!item || item.value === null || isNaN(parseFloat(item.value))) {
        return {
            value: DEFAULT_VALUE_WHEN_EMPTY,
            isValueEmpty: true,
        };
    }
    const roundedNumber = Math.round(parseFloat(item.value));
    const isOverLimit = roundedNumber > PERCENTAGE_VALUE_LIMIT;
    const isUnderLimit = roundedNumber < -PERCENTAGE_VALUE_LIMIT;
    let formattedValue = `${roundedNumber}%`;
    if (isOverLimit) {
        formattedValue = `>${PERCENTAGE_VALUE_LIMIT}%`;
    }
    else if (isUnderLimit) {
        formattedValue = `<-${PERCENTAGE_VALUE_LIMIT}%`;
    }
    return {
        value: formattedValue,
        isValueEmpty: false,
    };
}
export function getDrillableClasses(isDrillable) {
    return isDrillable ? ["is-drillable", "s-is-drillable"] : [];
}
export function getCompareSectionClasses(clientWidth, secondaryItemTitleWrapperRef) {
    const responsiveClassName = getHeadlineResponsiveClassName(clientWidth, isShortenedLabel(secondaryItemTitleWrapperRef));
    return cx("gd-flex-container", "headline-compare-section", responsiveClassName);
}
//# sourceMappingURL=HeadlineDataItemUtils.js.map