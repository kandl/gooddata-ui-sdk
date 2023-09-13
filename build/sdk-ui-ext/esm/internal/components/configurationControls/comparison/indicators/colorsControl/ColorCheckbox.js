// (C) 2023 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import { Checkbox } from "@gooddata/sdk-ui-kit";
import { comparisonMessages } from "../../../../../../locales.js";
import { COMPARISON_COLOR_CONFIG_DISABLED } from "../../ComparisonValuePath.js";
import DisabledBubbleMessage from "../../../../DisabledBubbleMessage.js";
const ColorCheckbox = ({ disabled, showDisabledMessage, properties, pushData, }) => {
    var _a, _b, _c;
    const { formatMessage } = useIntl();
    const checked = !((_c = (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.comparison) === null || _b === void 0 ? void 0 : _b.colorConfig) === null || _c === void 0 ? void 0 : _c.disabled);
    const label = formatMessage(comparisonMessages.colorsConfigTitle);
    const handleChange = (value) => {
        const clonedProperties = cloneDeep(properties);
        set(clonedProperties.controls, COMPARISON_COLOR_CONFIG_DISABLED, !value);
        pushData({ properties: clonedProperties });
    };
    return (React.createElement(DisabledBubbleMessage, { showDisabledMessage: showDisabledMessage },
        React.createElement(Checkbox, { text: label, value: checked, disabled: disabled, onChange: handleChange })));
};
export default ColorCheckbox;
//# sourceMappingURL=ColorCheckbox.js.map