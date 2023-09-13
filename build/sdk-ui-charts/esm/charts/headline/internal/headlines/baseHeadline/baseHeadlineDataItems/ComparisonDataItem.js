// (C) 2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import { ResponsiveText } from "@gooddata/sdk-ui-kit";
import { EvaluationType } from "../../../interfaces/BaseHeadlines.js";
import { useBaseHeadlineDataItem } from "./useBaseHeadlineDataItem.js";
import { withTitle } from "./withTitle.js";
import { useBaseHeadline } from "../BaseHeadlineContext.js";
import { getComparisonColor } from "../../../utils/ComparisonDataItemUtils.js";
const ComparisonDataItem = ({ dataItem, evaluationType }) => {
    var _a;
    const { config } = useBaseHeadline();
    const { formattedItem } = useBaseHeadlineDataItem(dataItem);
    const { colorConfig, isArrowEnabled } = config.comparison;
    const color = getComparisonColor(colorConfig, evaluationType, config.colorPalette);
    const cssStyle = Object.assign(Object.assign({}, ((_a = formattedItem.cssStyle) !== null && _a !== void 0 ? _a : {})), (color ? { color } : {}));
    const valueClassNames = cx(["comparison-headline-value", "s-comparison-headline-value", "headline-value", "s-headline-value"], {
        "headline-value--empty s-headline-value--empty": formattedItem.isValueEmpty && !color,
        "gd-icon-trend-up s-indicator-up": isArrowEnabled && evaluationType === EvaluationType.POSITIVE_VALUE,
        "gd-icon-trend-down s-indicator-down": isArrowEnabled && evaluationType === EvaluationType.NEGATIVE_VALUE,
    });
    return (React.createElement("div", { className: "comparison-headline-value-wrapper s-comparison-headline-value-wrapper headline-value-wrapper s-headline-value-wrapper", style: cssStyle },
        React.createElement(ResponsiveText, null,
            React.createElement("div", { className: valueClassNames }, formattedItem.value))));
};
export default withTitle(ComparisonDataItem);
//# sourceMappingURL=ComparisonDataItem.js.map