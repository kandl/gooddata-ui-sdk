// (C) 2023 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import { comparisonMessages } from "../../../../../locales.js";
import ConfigSubsection from "../../ConfigSubsection.js";
import InputControl from "../../InputControl.js";
import { COMPARISON_LABEL_UNCONDITIONAL_VALUE_PATH } from "../ComparisonValuePath.js";
import { ComparisonPositionValues } from "@gooddata/sdk-ui-charts";
const LabelSubSection = ({ sectionDisabled, showDisabledMessage, defaultLabelKey, properties, pushData, }) => {
    var _a, _b, _c, _d, _e;
    const { formatMessage } = useIntl();
    const isPositionOnTop = ((_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.comparison) === null || _b === void 0 ? void 0 : _b.position) === ComparisonPositionValues.TOP;
    const disabled = sectionDisabled || isPositionOnTop;
    const shouldShowDisabledMessage = showDisabledMessage || isPositionOnTop;
    const disabledMessageId = isPositionOnTop ? comparisonMessages.labelPositionOnTopDisabled.id : undefined;
    const defaultValue = ((_e = (_d = (_c = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _c === void 0 ? void 0 : _c.comparison) === null || _d === void 0 ? void 0 : _d.labelConfig) === null || _e === void 0 ? void 0 : _e.unconditionalValue) ||
        formatMessage({ id: defaultLabelKey });
    return (React.createElement(ConfigSubsection, { title: comparisonMessages.labelSubSectionTitle.id, canBeToggled: false },
        React.createElement(InputControl, { type: "text", valuePath: COMPARISON_LABEL_UNCONDITIONAL_VALUE_PATH, properties: properties, labelText: comparisonMessages.labelNameTitle.id, disabled: disabled, showDisabledMessage: shouldShowDisabledMessage, disabledMessageId: disabledMessageId, placeholder: defaultLabelKey, pushData: pushData, value: defaultValue })));
};
export default LabelSubSection;
//# sourceMappingURL=LabelSubSection.js.map