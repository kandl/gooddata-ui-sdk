// (C) 2019 GoodData Corporation
import React from "react";
import { InputWithNumberFormat } from "@gooddata/sdk-ui-kit";
const ComparisonInput = ({ value, usePercentage, disableAutofocus, onValueChange, onEnterKeyPress, separators, }) => {
    return (React.createElement(InputWithNumberFormat, { className: "s-mvf-comparison-value-input", value: value, onEnterKeyPress: onEnterKeyPress, onChange: onValueChange, isSmall: true, autofocus: !disableAutofocus, suffix: usePercentage ? "%" : "", separators: separators }));
};
export default ComparisonInput;
//# sourceMappingURL=ComparisonInput.js.map