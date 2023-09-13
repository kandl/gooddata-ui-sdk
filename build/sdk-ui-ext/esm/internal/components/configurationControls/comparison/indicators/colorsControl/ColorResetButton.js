// (C) 2023 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import cx from "classnames";
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import { Button } from "@gooddata/sdk-ui-kit";
import { messages } from "../../../../../../locales.js";
import { COMPARISON_COLOR_CONFIG_EQUALS, COMPARISON_COLOR_CONFIG_NEGATIVE, COMPARISON_COLOR_CONFIG_POSITIVE, } from "../../ComparisonValuePath.js";
import { isComparisonDefaultColors } from "../../../../../utils/comparisonHelper.js";
const ColorResetButton = ({ disabled, properties, pushData }) => {
    var _a, _b;
    const { formatMessage } = useIntl();
    const label = formatMessage(messages.resetColors);
    const isDefaultColors = isComparisonDefaultColors((_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.comparison) === null || _b === void 0 ? void 0 : _b.colorConfig);
    const resetColors = () => {
        const clonedProperties = cloneDeep(properties);
        set(clonedProperties.controls, COMPARISON_COLOR_CONFIG_POSITIVE, undefined);
        set(clonedProperties.controls, COMPARISON_COLOR_CONFIG_NEGATIVE, undefined);
        set(clonedProperties.controls, COMPARISON_COLOR_CONFIG_EQUALS, undefined);
        pushData({ properties: clonedProperties });
    };
    const classNames = cx(["gd-color-reset-colors-section", "s-gd-color-reset-colors-section"], {
        disabled: disabled || isDefaultColors,
    });
    return (React.createElement("div", { className: classNames },
        React.createElement(Button, { value: label, className: "gd-button-link", onClick: resetColors, disabled: disabled })));
};
export default ColorResetButton;
//# sourceMappingURL=ColorResetButton.js.map