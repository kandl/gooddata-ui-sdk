// (C) 2007-2022 GoodData Corporation
import React, { PureComponent } from "react";
import cx from "classnames";
import { FormattedMessage, injectIntl } from "react-intl";
import { ResponsiveText } from "@gooddata/sdk-ui-kit";
import { formatMetric, HYPHEN, isValueUnhandledNull } from "./utils/format.js";
import { getErrorPopInfo, getPopInfo } from "./utils/pop.js";
import { HeadlinePagination, shouldRenderPagination, getHeadlineResponsiveClassName, } from "@gooddata/sdk-ui-vis-commons";
const LOADING_PLACEHOLDER = "…";
const NO_DATA_PLACEHOLDER = HYPHEN;
class KpiPop extends PureComponent {
    constructor() {
        super(...arguments);
        this.kpiSectionItemNode = React.createRef();
        this.renderPercentage = () => {
            const popInfo = this.props.disabled || !!this.props.error
                ? getErrorPopInfo()
                : getPopInfo(this.props.previousPeriodValue, this.props.currentPeriodValue, this.props.meaning);
            const tooltip = this.props.isLoading ? "" : popInfo.percentage;
            return (React.createElement("dl", { className: "gd-flex-item kpi-pop-section-item kpi-pop-change headline-compare-section-item headline-tertiary-item" },
                React.createElement("div", { className: "headline-value-wrapper s-headline-value-wrapper" },
                    React.createElement(ResponsiveText, { title: tooltip, tagClassName: `is-kpi-${popInfo.meaning}`, tagName: "dt" }, this.renderPercentageValue(popInfo))),
                React.createElement("dd", null,
                    React.createElement(FormattedMessage, { id: "kpiPop.change" }))));
        };
        this.renderPreviousPeriod = () => {
            return (React.createElement("dl", { className: "gd-flex-item kpi-pop-section-item kpi-pop-period headline-compare-section-item headline-secondary-item", title: this.renderFormattedValue() },
                React.createElement(ResponsiveText, { tagName: "dt" }, this.renderPreviousPeriodValue()),
                this.renderPreviousPeriodName()));
        };
    }
    render() {
        const { enableCompactSize, clientHeight, clientWidth } = this.props;
        const pagination = shouldRenderPagination(enableCompactSize, clientWidth, clientHeight);
        if (pagination) {
            return (React.createElement("div", { className: "gd-flex-container headline-compare-section headline-paginated-compare-section" },
                React.createElement(HeadlinePagination, { renderSecondaryItem: this.renderPreviousPeriod, renderTertiaryItem: this.renderPercentage })));
        }
        return (React.createElement("div", { className: this.getKpiSectionClassName() },
            this.renderPercentage(),
            this.renderPreviousPeriod()));
    }
    renderPercentageValue(popInfo) {
        return this.props.isLoading ? (false) : (React.createElement(React.Fragment, null,
            React.createElement("span", { className: cx(`gd-icon-trend-${popInfo.trend}`, "gd-kpi-trend-icon") }),
            React.createElement("span", null, popInfo.percentage)));
    }
    renderPreviousPeriodName() {
        return this.props.previousPeriodName ? (React.createElement("dd", { className: "headline-title-wrapper", ref: this.kpiSectionItemNode, title: this.props.previousPeriodName }, this.props.previousPeriodName)) : (false);
    }
    renderPreviousPeriodValue() {
        if (this.props.isLoading) {
            return LOADING_PLACEHOLDER;
        }
        return this.props.error ? this.formatMessage("error") : this.renderFormattedValue();
    }
    renderFormattedValue() {
        var _a;
        const value = this.props.previousPeriodValue;
        if (this.props.disabled || isValueUnhandledNull(value, (_a = this.props.format) !== null && _a !== void 0 ? _a : "")) {
            return NO_DATA_PLACEHOLDER;
        }
        return formatMetric(value, this.props.format, this.props.separators);
    }
    getKpiSectionClassName() {
        const { clientWidth } = this.props;
        const kpiSectionItemNode = this.kpiSectionItemNode.current;
        const className = "gd-flex-container headline-compare-section";
        const responsiveClassName = getHeadlineResponsiveClassName(clientWidth);
        if (kpiSectionItemNode && responsiveClassName) {
            return `${className} ${responsiveClassName}`;
        }
        return className;
    }
    formatMessage(id) {
        return this.props.intl.formatMessage({ id });
    }
}
KpiPop.defaultProps = {
    error: null,
    disabled: false,
    isLoading: false,
    previousPeriodName: "",
    clientWidth: 0,
    clientHeight: 0,
    enableCompactSize: false,
};
export default injectIntl(KpiPop);
//# sourceMappingURL=KpiPop.js.map