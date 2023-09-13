// (C) 2023 GoodData Corporation
import React from "react";
import CheckboxControl from "../../CheckboxControl.js";
import { comparisonMessages } from "../../../../../locales.js";
import { COMPARISON_IS_ARROW_ENABLED_PATH } from "../ComparisonValuePath.js";
const ArrowControl = ({ disabled, showDisabledMessage, properties, pushData, }) => {
    var _a, _b;
    const isArrowEnabled = (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.comparison) === null || _b === void 0 ? void 0 : _b.isArrowEnabled;
    return (React.createElement("div", { className: "comparison-arrow-control s-comparison-arrow-control" },
        React.createElement(CheckboxControl, { valuePath: COMPARISON_IS_ARROW_ENABLED_PATH, labelText: comparisonMessages.arrowControlTitle.id, properties: properties, checked: isArrowEnabled, disabled: disabled, showDisabledMessage: showDisabledMessage, pushData: pushData })));
};
export default ArrowControl;
//# sourceMappingURL=ArrowControl.js.map