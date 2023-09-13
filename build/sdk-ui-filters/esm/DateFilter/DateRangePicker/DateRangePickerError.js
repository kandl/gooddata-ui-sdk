// (C) 2019 GoodData Corporation
import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { getLocalizedDateFormat } from "../utils/FormattingUtils.js";
const DateRangePickerErrorComponent = (props) => {
    const { dateFormat, errorId, intl } = props;
    return (React.createElement("div", { className: "gd-date-range-picker-error-message s-absolute-range-error" },
        React.createElement(FormattedMessage, { id: errorId, values: { format: dateFormat || getLocalizedDateFormat(intl.locale) } })));
};
export const DateRangePickerError = injectIntl(DateRangePickerErrorComponent);
//# sourceMappingURL=DateRangePickerError.js.map