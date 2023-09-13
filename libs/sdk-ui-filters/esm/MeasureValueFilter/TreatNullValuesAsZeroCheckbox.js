// (C) 2020 GoodData Corporation
import React from "react";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
const TreatNullValuesAsZeroCheckbox = ({ checked = false, onChange, intl, }) => {
    const handleOnChange = (e) => onChange(e.target.checked);
    return (React.createElement("label", { className: "input-checkbox-label gd-mvf-treat-null-values-as-zero s-treat-null-values-as-zero" },
        React.createElement("input", { type: "checkbox", name: "treat-null-values-as", className: "input-checkbox", checked: checked, onChange: handleOnChange }),
        React.createElement("span", { className: "input-label-text" },
            intl.formatMessage({ id: "mvf.treatNullValuesAsZeroLabel" }),
            React.createElement(BubbleHoverTrigger, { showDelay: 400, hideDelay: 200 },
                React.createElement("span", { className: "inlineBubbleHelp" }),
                React.createElement(Bubble, { className: "bubble-primary", alignPoints: [{ align: "tc bl" }] }, intl.formatMessage({ id: "mvf.treatNullValuesAsZeroTooltip" }))))));
};
export default TreatNullValuesAsZeroCheckbox;
//# sourceMappingURL=TreatNullValuesAsZeroCheckbox.js.map