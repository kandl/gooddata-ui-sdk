// (C) 2007-2022 GoodData Corporation
import React, { Component } from "react";
import isEqual from "lodash/isEqual.js";
import last from "lodash/last.js";
import { FormattedMessage, injectIntl } from "react-intl";
import { Button, Input, Typography, Overlay, useMediaQuery, Spinner, Message } from "@gooddata/sdk-ui-kit";
import { isAttributeFilter, isDateFilter, isDashboardAttributeFilter, isDashboardDateFilter, } from "@gooddata/sdk-model";
import { KpiAlertDialogDateRange } from "./KpiAlertDialogDateRange.js";
import { kpiAlertDialogAlignPoints, kpiAlertDialogMobileAlignPoints } from "./alignPoints.js";
import { KpiAlertDialogBrokenFilters } from "./KpiAlertDialogBrokenFilters/KpiAlertDialogBrokenFilters.js";
import { thresholdFromDecimalToPercent, thresholdFromPercentToDecimal, } from "../utils/alertThresholdUtils.js";
import { areKpiAlertFiltersSameAsDashboard } from "./utils/filterUtils.js";
import { KpiAlertDialogWhenTriggeredPicker } from "./KpiAlertDialogWhenTriggeredPicker.js";
const DEFAULT_WHEN_TRIGGERED = "aboveThreshold";
const KpiAlertDialogWrapper = ({ children }) => {
    const isMobile = useMediaQuery("mobileDevice");
    return children(isMobile);
};
class KpiAlertDialog extends Component {
    constructor(props) {
        var _a, _b;
        super(props);
        this.threshold = React.createRef();
        this.saveButton = React.createRef();
        this.onCloseClick = (e) => {
            e.stopPropagation();
            this.closeDialog();
        };
        this.onCancelClick = (e) => {
            e.stopPropagation();
            this.closeDialog();
        };
        this.closeDialog = () => {
            this.props.onAlertDialogCloseClick();
        };
        this.onSelect = (alertType) => {
            this.setState({ alertType });
        };
        this.onChange = (value) => {
            this.setState({ threshold: value.toString() });
        };
        this.saveKpiAlert = () => {
            const whenTriggered = this.state.alertType;
            let threshold = parseFloat(this.state.threshold); // convert e.g. valid .2 to 0.2
            threshold = this.isThresholdRepresentingPercent()
                ? thresholdFromPercentToDecimal(threshold)
                : threshold;
            if (this.isAlertValid() && !this.isAlertEmpty()) {
                this.props.onAlertDialogSaveClick(threshold, whenTriggered);
            }
        };
        this.deleteKpiAlert = () => {
            this.props.onAlertDialogDeleteClick();
        };
        this.applyAlertFilterSetting = () => {
            setTimeout(() => {
                var _a, _b;
                (_b = (_a = this.props).onApplyAlertFiltersClick) === null || _b === void 0 ? void 0 : _b.call(_a);
            }, 0);
        };
        this.state = {
            alertType: (_b = (_a = props.alert) === null || _a === void 0 ? void 0 : _a.whenTriggered) !== null && _b !== void 0 ? _b : DEFAULT_WHEN_TRIGGERED,
            threshold: `${this.getVisualThreshold()}`,
        };
    }
    componentDidMount() {
        this.focusThresholdInput();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isAlertLoading) {
            this.focusThresholdInput();
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        var _a, _b;
        if (this.props.isAlertLoading || !isEqual(this.props.alert, nextProps.alert)) {
            this.setState({
                alertType: (_b = (_a = nextProps.alert) === null || _a === void 0 ? void 0 : _a.whenTriggered) !== null && _b !== void 0 ? _b : DEFAULT_WHEN_TRIGGERED,
                threshold: `${this.getVisualThreshold(nextProps)}`,
            });
        }
        if (this.props.isKpiFormatLoading) {
            this.setState({
                threshold: `${this.getVisualThreshold(nextProps)}`,
            });
        }
    }
    render() {
        return (React.createElement(KpiAlertDialogWrapper, null, (isMobile) => {
            return (React.createElement(Overlay, { alignTo: ".is-alert-dialog.dash-item-content", alignPoints: isMobile ? kpiAlertDialogMobileAlignPoints : kpiAlertDialogAlignPoints, closeOnOutsideClick: !isMobile, onClose: this.closeDialog, className: "kpi-alert-dialog-overlay" }, this.renderDialogBox()));
        }));
    }
    renderAttributeFiltersInfo() {
        var _a;
        const { alert, filters } = this.props;
        const attributeFilterCount = alert
            ? // for existing alerts, count the stored attribute filters
                (_a = alert.filterContext) === null || _a === void 0 ? void 0 : _a.filters.filter(isDashboardAttributeFilter).length
            : // otherwise (i.e. when creating a new alert) count attribute filters "from outside"
                filters.filter(isAttributeFilter).length;
        if (!attributeFilterCount) {
            return false;
        }
        return (React.createElement("div", { className: "kpi-alert-dialog-text text-info" },
            React.createElement(FormattedMessage, { id: "kpiAlertDialog.withAttributeFilters", values: { numFilters: attributeFilterCount } })));
    }
    getVisualThreshold(props = this.props) {
        var _a, _b, _c;
        const threshold = ((_a = props.alert) === null || _a === void 0 ? void 0 : _a.threshold) != undefined && this.isThresholdRepresentingPercent(props)
            ? thresholdFromDecimalToPercent((_b = props.alert) === null || _b === void 0 ? void 0 : _b.threshold)
            : (_c = props.alert) === null || _c === void 0 ? void 0 : _c.threshold;
        return threshold !== null && threshold !== void 0 ? threshold : "";
    }
    renderDialogBox() {
        return (React.createElement("div", { className: "kpi-alert-dialog" },
            React.createElement("div", { className: "action-close gd-icon-cross", onClick: this.onCloseClick }),
            this.renderDialogContent()));
    }
    renderDeleteLink() {
        const { alert, alertDeletingStatus, intl } = this.props;
        if (alert) {
            const isDeleting = alertDeletingStatus === "inProgress";
            const deleteButtonTitle = isDeleting
                ? intl.formatMessage({ id: "kpiAlertDialog.deleting" })
                : intl.formatMessage({ id: "kpiAlertDialog.delete" });
            return (React.createElement(Button, { key: "delete-button", className: "s-delete_button gd-button-link-dimmed delete-link", value: deleteButtonTitle, onClick: this.deleteKpiAlert, disabled: isDeleting }));
        }
        return false;
    }
    renderUpdateButton() {
        const { alert, alertUpdatingStatus, intl, onAlertDialogUpdateClick } = this.props;
        if (alert) {
            const isUpdating = alertUpdatingStatus === "inProgress";
            const updateButtonTitle = isUpdating
                ? intl.formatMessage({ id: "kpiAlertDialog.updatingTitle" })
                : intl.formatMessage({ id: "kpiAlertDialog.updateBrokenTitle" });
            return (React.createElement(Button, { key: "update-button", className: "s-update-button gd-button-action save-button", value: updateButtonTitle, onClick: onAlertDialogUpdateClick, disabled: isUpdating }));
        }
        return false;
    }
    renderBrokenAlert() {
        return (React.createElement("div", { className: "alert-broken" },
            React.createElement(Typography, { tagName: "h3" },
                React.createElement(FormattedMessage, { id: "kpiAlertDialog.brokenAlert" })),
            React.createElement(KpiAlertDialogBrokenFilters, { brokenFilters: this.props.brokenAlertFilters }),
            React.createElement("div", { className: "info" },
                React.createElement(FormattedMessage, { id: "kpiAlertDialog.brokenAlertAppeal" })),
            this.renderUpdatingErrorMessage(),
            this.renderDeletingErrorMessage(),
            React.createElement("div", { className: "buttons" },
                this.renderUpdateButton(),
                this.renderDeleteLink())));
    }
    renderDialogContent() {
        const { isAlertDialogOpening, isAlertLoading, thresholdPlaceholder, isKpiFormatLoading, intl, brokenAlertFilters, userEmail, } = this.props;
        const { threshold, alertType } = this.state;
        if (isAlertDialogOpening || isAlertLoading || isKpiFormatLoading) {
            return (React.createElement("div", { className: "kpi-alert-dialog-content" },
                React.createElement(Spinner, { className: "gd-dot-spinner-centered" })));
        }
        if (brokenAlertFilters === null || brokenAlertFilters === void 0 ? void 0 : brokenAlertFilters.length) {
            return React.createElement("div", { className: "kpi-alert-dialog-content" }, this.renderBrokenAlert());
        }
        const inputSuffix = this.isThresholdRepresentingPercent() ? "%" : "";
        const hasError = !this.isAlertValid() && !this.isAlertEmpty();
        const emailMe = (React.createElement("span", { className: "underline-dotted", title: userEmail },
            React.createElement(FormattedMessage, { id: "kpiAlertDialog.emailMe" })));
        return (React.createElement("div", { className: "kpi-alert-dialog-content" },
            React.createElement("div", { className: "kpi-alert-dialog-text kpi-alert-dialog-text-on-top" },
                React.createElement(FormattedMessage, { id: "kpiAlertDialog.emailMeWhen", values: { emailMe } })),
            React.createElement(KpiAlertDialogWhenTriggeredPicker, { whenTriggered: alertType, intl: intl, onWhenTriggeredChange: this.onSelect }),
            React.createElement("div", { className: "input-container" },
                React.createElement(Input, { className: "s-threshold-input", hasError: hasError, isSmall: true, maxlength: 16, onChange: this.onChange, onEscKeyPress: this.closeDialog, onEnterKeyPress: this.saveKpiAlert, placeholder: thresholdPlaceholder, ref: this.threshold, suffix: inputSuffix, value: threshold })),
            this.renderFiltersMessage(),
            this.renderFiltersDifferMessage(),
            this.renderValidationMessage(),
            this.renderSavingErrorMessage(),
            this.renderDeletingErrorMessage(),
            React.createElement("div", { className: "buttons" },
                React.createElement(Button, { ref: this.saveButton, className: "gd-button-action save-button s-save_button", value: this.getSaveButtonTitle(), onClick: this.saveKpiAlert, disabled: !this.isSavingEnabled() }),
                React.createElement(Button, { className: "gd-button-secondary cancel-button s-cancel_button", value: intl.formatMessage({ id: "cancel" }), onClick: this.onCancelClick }),
                this.renderDeleteLink())));
    }
    renderDateFilterInfo() {
        var _a, _b;
        if (this.props.isDateFilterIgnored) {
            return false;
        }
        const { dateFormat, filters, alert } = this.props;
        const dateFilters = alert
            ? (_b = (_a = alert.filterContext) === null || _a === void 0 ? void 0 : _a.filters.filter(isDashboardDateFilter)) !== null && _b !== void 0 ? _b : []
            : filters.filter(isDateFilter);
        const dateFilter = last(dateFilters);
        return React.createElement(KpiAlertDialogDateRange, { filter: dateFilter, dateFormat: dateFormat });
    }
    renderFiltersMessage() {
        const { intl, userEmail } = this.props;
        const emailInfo = intl.formatMessage({ id: "kpiAlertDialog.emailInfo" }, { userEmail });
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("div", { className: "kpi-alert-dialog-text text-info" },
                    this.renderDateFilterInfo(),
                    this.renderAttributeFiltersInfo()),
                React.createElement("div", { className: "kpi-alert-dialog-text email-info" }, emailInfo))));
    }
    renderFiltersDifferMessage() {
        const filtersDiffer = !areKpiAlertFiltersSameAsDashboard(this.props.alert, this.props.filters);
        const shouldShowFiltersDifferMessage = !!this.props.alert && filtersDiffer;
        return shouldShowFiltersDifferMessage ? (React.createElement(Message, { type: "warning" },
            React.createElement(FormattedMessage, { id: "kpiAlertDialog.filtersDiffer" }),
            !!this.props.onApplyAlertFiltersClick && (React.createElement(React.Fragment, null,
                " ",
                React.createElement("a", { className: "s-apply-alert-filters", onClick: this.applyAlertFilterSetting },
                    React.createElement(FormattedMessage, { id: "kpiAlertDialog.filtersApply" })))))) : (false);
    }
    renderValidationMessage() {
        if (!this.isAlertValid() && !this.isAlertEmpty()) {
            return (React.createElement(Message, { type: "error" },
                React.createElement(FormattedMessage, { id: "kpiAlertDialog.invalidNumber", values: {
                        strong: (chunks) => React.createElement("strong", null, chunks),
                        br: React.createElement("br", null),
                    } })));
        }
        return false;
    }
    renderSavingErrorMessage() {
        if (this.props.alertSavingStatus === "error") {
            return (React.createElement(Message, { type: "error" },
                React.createElement(FormattedMessage, { id: "kpiAlertDialog.savingFailed" })));
        }
        return false;
    }
    renderUpdatingErrorMessage() {
        if (this.props.alertUpdatingStatus === "error") {
            return (React.createElement(Message, { type: "error" },
                React.createElement(FormattedMessage, { id: "kpiAlertDialog.updateBrokenFailed" })));
        }
        return false;
    }
    renderDeletingErrorMessage() {
        if (this.props.alertDeletingStatus === "error") {
            return (React.createElement(Message, { type: "error" },
                React.createElement(FormattedMessage, { id: "kpiAlertDialog.deleteingFailed" })));
        }
        return false;
    }
    getSaveButtonTitle() {
        return this.props.alertSavingStatus === "inProgress"
            ? this.getUpdatingOrSavingTitle()
            : this.getUpdateOrSetTitle();
    }
    getUpdateOrSetTitle() {
        const { alert, intl } = this.props;
        return alert
            ? intl.formatMessage({ id: "kpiAlertDialog.updateTitle" })
            : intl.formatMessage({ id: "kpiAlertDialog.setTitle" });
    }
    getUpdatingOrSavingTitle() {
        const { alert, intl } = this.props;
        return alert
            ? intl.formatMessage({ id: "kpiAlertDialog.updatingTitle" })
            : intl.formatMessage({ id: "kpiAlertDialog.settingTitle" });
    }
    isThresholdRepresentingPercent(props = this.props) {
        return !!props.isThresholdRepresentingPercent;
    }
    isSavingEnabled() {
        return this.isAlertValid() && !this.isAlertEmpty() && this.props.alertSavingStatus !== "inProgress";
    }
    isAlertValid() {
        // This is some special function, which works also with strings
        return !isNaN(this.state.threshold); // eslint-disable-line no-restricted-globals
    }
    isAlertEmpty() {
        return this.state.threshold === undefined || this.state.threshold === "";
    }
    focusThresholdInput() {
        setTimeout(() => {
            var _a, _b, _c;
            if ((_c = (_b = (_a = this.threshold) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.inputNodeRef) === null || _c === void 0 ? void 0 : _c.inputNodeRef) {
                const thresholdInputElement = this.threshold.current.inputNodeRef.inputNodeRef;
                thresholdInputElement.focus();
                thresholdInputElement.select();
            }
        }, 100);
    }
}
KpiAlertDialog.defaultProps = {
    isAlertLoading: false,
    isKpiFormatLoading: false,
    thresholdPlaceholder: "",
    isDateFilterIgnored: false,
    isThresholdRepresentingPercent: false,
    filters: [],
    isAlertDialogOpening: false,
    alertDeletingStatus: "idle",
    alertSavingStatus: "idle",
    alertUpdatingStatus: "idle",
};
export { KpiAlertDialog };
export default injectIntl(KpiAlertDialog);
//# sourceMappingURL=KpiAlertDialog.js.map