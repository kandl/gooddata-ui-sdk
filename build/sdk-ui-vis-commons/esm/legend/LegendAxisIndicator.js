// (C) 2019-2023 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { messages } from "../locales.js";
export class LegendAxisIndicatorClass extends React.PureComponent {
    render() {
        const { labelKey, width, data, intl } = this.props;
        const style = width ? { width: `${width}px` } : {};
        const values = (data || []).reduce((result, key, index) => {
            result[index] = intl.formatMessage(messages[key]);
            return result;
        }, {});
        return (React.createElement("div", { style: style, className: "series-axis-indicator", "aria-label": "Legend axis indicator" },
            React.createElement("div", { className: "series-text" },
                intl.formatMessage(messages[labelKey], values),
                intl.formatMessage(messages["colon"]))));
    }
}
export const LegendAxisIndicator = injectIntl(LegendAxisIndicatorClass);
//# sourceMappingURL=LegendAxisIndicator.js.map