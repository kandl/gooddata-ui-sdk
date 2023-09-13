// (C) 2023 GoodData Corporation
import React, { useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import { MeasureNumberFormat } from "@gooddata/sdk-ui-kit";
import NumberFormatToggleButton from "./NumberFormatToggleButton.js";
import DisabledBubbleMessage from "../../../../DisabledBubbleMessage.js";
import { COMPARISON_FORMAT_VALUE_PATH } from "../../ComparisonValuePath.js";
import { comparisonMessages } from "../../../../../../locales.js";
import { getNumberFormat, getPresets, getTemplates } from "../../../../../utils/comparisonHelper.js";
const NumberFormatControl = ({ disabled, showDisabledMessage, defaultFormat, separators, properties, pushData, }) => {
    const intl = useIntl();
    const format = getNumberFormat(properties, defaultFormat);
    const selectFormat = (format) => {
        const clonedProperties = cloneDeep(properties);
        set(clonedProperties.controls, COMPARISON_FORMAT_VALUE_PATH, format);
        pushData({ properties: clonedProperties });
    };
    const presets = useMemo(() => getPresets(intl), [intl]);
    const templates = useMemo(() => getTemplates(intl), [intl]);
    return (React.createElement(DisabledBubbleMessage, { showDisabledMessage: showDisabledMessage },
        React.createElement("div", { className: "adi-properties-dropdown-container measure-number-format-control" },
            React.createElement("span", { className: "input-label-text" },
                React.createElement(FormattedMessage, { id: comparisonMessages.formatTitle.id })),
            React.createElement("label", { className: "adi-bucket-inputfield gd-input gd-input-small measure-number-format-control-dropdown" },
                React.createElement(MeasureNumberFormat, { disabled: disabled, toggleButton: NumberFormatToggleButton, presets: presets, templates: templates, separators: separators, selectedFormat: format, setFormat: selectFormat, locale: intl.locale, key: format })))));
};
export default NumberFormatControl;
//# sourceMappingURL=NumberFormatControl.js.map