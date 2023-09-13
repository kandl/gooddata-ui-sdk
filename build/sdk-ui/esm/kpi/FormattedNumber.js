// (C) 2019 GoodData Corporation
import React from "react";
import { ClientFormatterFacade } from "@gooddata/number-formatter";
/**
 * @internal
 */
export const FormattedNumber = ({ className, value, format, separators, }) => {
    const valueToFormat = ClientFormatterFacade.convertValue(value);
    const { formattedValue: label, colors } = ClientFormatterFacade.formatValue(valueToFormat, format, separators);
    const { color, backgroundColor } = colors;
    return (React.createElement("span", { className: className, style: { color, backgroundColor } }, label));
};
//# sourceMappingURL=FormattedNumber.js.map