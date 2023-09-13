// (C) 2019 GoodData Corporation
import { InputWithNumberFormat } from "@gooddata/sdk-ui-kit";
import React from "react";
const RangeInput = ({ from, to, usePercentage, disableAutofocus, onFromChange, onToChange, onEnterKeyPress, separators, }) => {
    return (React.createElement("div", { className: "gd-mvf-range-input" },
        React.createElement(InputWithNumberFormat, { className: "s-mvf-range-from-input", value: from, onChange: onFromChange, onEnterKeyPress: onEnterKeyPress, isSmall: true, autofocus: !disableAutofocus, suffix: usePercentage ? "%" : "", separators: separators }),
        React.createElement(InputWithNumberFormat, { className: "s-mvf-range-to-input", value: to, onChange: onToChange, onEnterKeyPress: onEnterKeyPress, isSmall: true, suffix: usePercentage ? "%" : "", separators: separators })));
};
export default RangeInput;
//# sourceMappingURL=RangeInput.js.map