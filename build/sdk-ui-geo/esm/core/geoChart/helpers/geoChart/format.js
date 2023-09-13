// (C) 2019-2020 GoodData Corporation
import { ClientFormatterFacade } from "@gooddata/number-formatter";
import escape from "lodash/escape.js";
import unescape from "lodash/unescape.js";
const customEscape = (str) => str && escape(unescape(str));
export function formatValueForTooltip(val, format, separators) {
    if (!format) {
        return `${val}`;
    }
    const convertedValue = ClientFormatterFacade.convertValue(val);
    const { formattedValue } = ClientFormatterFacade.formatValue(convertedValue, format, separators);
    return customEscape(formattedValue);
}
export function getTooltipContentWidth(isFullScreenTooltip, chartWidth, tooltipMaxWidth) {
    return isFullScreenTooltip ? chartWidth : Math.min(chartWidth, tooltipMaxWidth);
}
//# sourceMappingURL=format.js.map