// (C) 2007-2022 GoodData Corporation
import React, { PureComponent } from "react";
import { injectIntl } from "react-intl";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import cx from "classnames";
import { ResponsiveText, LoadingDots } from "@gooddata/sdk-ui-kit";
import { calculateHeadlineHeightFontSize } from "@gooddata/sdk-ui-vis-commons";
import { HYPHEN, formatMetric, isValueUnhandledNull } from "./utils/format.js";
const NO_DATA_PLACEHOLDER = HYPHEN;
const SMALLEST_HEIGHT = 54;
class KpiValue extends PureComponent {
    getKpiValueClassNames() {
        return cx("kpi-value", {
            "is-smallest-height": this.props.enableCompactSize &&
                this.props.clientHeight &&
                this.props.clientHeight < SMALLEST_HEIGHT,
            "is-error-value": !this.props.isLoading && !!this.props.error,
            "is-empty-value": !this.props.isLoading && this.isValueUnhandledNull(),
        });
    }
    getKpiCustomHeightStyles() {
        if (this.props.enableCompactSize) {
            const { height } = calculateHeadlineHeightFontSize(this.props.hasComparison, this.props.clientHeight);
            return {
                height: `${height}px`,
                lineHeight: `${height}px`,
            };
        }
        return undefined;
    }
    render() {
        if (this.props.enableCompactSize && !this.props.clientHeight) {
            return null;
        }
        return (React.createElement(TransitionGroup, { style: this.getKpiCustomHeightStyles(), className: this.getKpiValueClassNames() },
            React.createElement(CSSTransition, { classNames: "kpi-animation", timeout: 300, title: this.getTitle() }, this.renderValue())));
    }
    renderValue() {
        const { isLoading, error, disableKpiDrillUnderline, enableCompactSize, clientHeight, intl } = this.props;
        if (isLoading) {
            return React.createElement(LoadingDots, { className: "kpi-value-loading gd-loading-dots-centered" });
        }
        const value = error ? intl.formatMessage({ id: "error" }) : this.renderFormattedValue();
        const valueClassNames = cx("kpi-value-value", "s-kpi-value", {
            "kpi-link-style-underline": !disableKpiDrillUnderline,
        });
        if (enableCompactSize) {
            // As clientHeight first render returns undefined, need to wait to have correct value
            // so we can adjust fontSize and make the calculations accordingly.
            if (!clientHeight) {
                return React.createElement(LoadingDots, { className: "kpi-value-loading gd-loading-dots-centered" });
            }
            const { fontSize } = calculateHeadlineHeightFontSize(this.props.hasComparison, clientHeight);
            return (React.createElement("div", { style: { fontSize: `${fontSize}px` } },
                React.createElement(ResponsiveText, null,
                    React.createElement("span", { className: valueClassNames }, value))));
        }
        return (React.createElement(ResponsiveText, null,
            React.createElement("span", { className: valueClassNames }, value)));
    }
    renderFormattedValue() {
        if (this.isValueUnhandledNull()) {
            return NO_DATA_PLACEHOLDER;
        }
        return formatMetric(this.props.value, this.props.format, this.props.separators);
    }
    isValueUnhandledNull() {
        var _a;
        return isValueUnhandledNull(this.props.value, (_a = this.props.format) !== null && _a !== void 0 ? _a : "");
    }
    getTitle() {
        const { intl } = this.props;
        if (this.props.isLoading) {
            return "";
        }
        if (this.props.error && this.props.errorHelp) {
            return this.props.errorHelp;
        }
        if (this.isValueUnhandledNull()) {
            return intl.formatMessage({ id: "kpi.noData" });
        }
        return "";
    }
}
KpiValue.defaultProps = {
    error: null,
    value: "",
    isLoading: false,
    disableKpiDrillUnderline: false,
};
export default injectIntl(KpiValue);
//# sourceMappingURL=KpiValue.js.map