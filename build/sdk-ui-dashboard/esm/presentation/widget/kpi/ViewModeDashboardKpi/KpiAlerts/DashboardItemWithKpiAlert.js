// (C) 2007-2023 GoodData Corporation
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { isNoDataSdkError } from "@gooddata/sdk-ui";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { DashboardItemKpi } from "../../../../presentationComponents/index.js";
import { isAlertingTemporarilyDisabledForGivenFilter } from "./utils/filterUtils.js";
import { KpiDescriptionTrigger } from "./KpiDescriptionTrigger.js";
// adapted from jQuery:
// https://github.com/jquery/jquery/blob/a503c691dc06c59acdafef6e54eca2613c6e4032/src/offset.js#L83-L97
function getNodeDocumentRelativeOffsetTop(node) {
    var _a;
    // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
    // Support: IE <=11+
    // Running getBoundingClientRect on a
    // disconnected node in IE throws an error
    if (!node.getClientRects().length) {
        return 0;
    }
    // Get document-relative position by adding viewport scroll to viewport-relative gBCR
    const rect = node.getBoundingClientRect();
    const win = node.ownerDocument.defaultView;
    return rect.top + ((_a = win === null || win === void 0 ? void 0 : win.pageYOffset) !== null && _a !== void 0 ? _a : 0);
}
const disabledBubbleAlignPoints = [{ align: "cr cl" }, { align: "cl cr" }];
const enabledBubbleAlignPoints = [{ align: "tc bc" }, { align: "tc br" }];
class DashboardItemWithKpiAlert extends Component {
    constructor() {
        super(...arguments);
        this.timeouts = {};
        this.isScrolledToHighlightedAlert = false;
        this.node = React.createRef();
        this.state = {
            isKpiAlertAfterSaving: false,
            isKpiAlertAfterDeleting: false,
            isAlertHighlighted: false,
        };
        this.renderAlertBox = () => {
            const isAlertingTemporarilyDisabled = isAlertingTemporarilyDisabledForGivenFilter(this.props.kpi, this.props.filters, this.props.userWorkspaceSettings);
            const alertIconClasses = cx("dash-item-action", "dash-item-action-alert", "s-dash-item-action-alert", "gd-icon-bell", {
                "alert-set": this.state.isKpiAlertAfterSaving,
                "alert-deleted": this.state.isKpiAlertAfterDeleting,
            });
            // TODO: Remove "isAlertingTemporarilyDisabledForGivenFilter" when alerts support absolute filters (RAIL-1456, RAIL-1457).
            //       When alert is set, we allow opening the alert box so user can edit/delete it.
            if (this.props.isReadOnlyMode ||
                !this.props.canSetAlert ||
                (isAlertingTemporarilyDisabled && !this.props.alert)) {
                return (React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0, tagName: "div", className: cx(alertIconClasses, "disabled") },
                    React.createElement(Bubble, { className: "bubble-primary", alignPoints: disabledBubbleAlignPoints }, this.getBubbleMessage(isAlertingTemporarilyDisabled))));
            }
            return (React.createElement("div", { onClick: this.onAlertDialogOpenClick },
                React.createElement(BubbleHoverTrigger, { className: alertIconClasses, showDelay: 500, hideDelay: 0, tagName: "div" },
                    React.createElement(Bubble, { className: "bubble-primary", alignPoints: enabledBubbleAlignPoints },
                        React.createElement(FormattedMessage, { id: "kpi.alertBox.title" })))));
        };
        this.onAlertDialogOpenClick = () => {
            this.props.onAlertDialogOpenClick();
        };
    }
    componentDidMount() {
        // handle cases when this component is rendered already highlighted
        if (this.props.isAlertHighlighted) {
            this.updateStatePropertyForTime("isAlertHighlighted", 5000);
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.isKpiAlertSaved(nextProps)) {
            this.updateStatePropertyForTime("isKpiAlertAfterSaving", 1000);
        }
        if (this.isKpiAlertDeleted(nextProps)) {
            this.updateStatePropertyForTime("isKpiAlertAfterDeleting", 1000);
        }
        if (!this.props.isAlertHighlighted && nextProps.isAlertHighlighted) {
            this.updateStatePropertyForTime("isAlertHighlighted", 5000);
        }
    }
    componentDidUpdate() {
        if (this.props.isAlertHighlighted && !this.isScrolledToHighlightedAlert) {
            this.isScrolledToHighlightedAlert = true;
            const node = this.node.current;
            if (node) {
                window.scrollTo(0, getNodeDocumentRelativeOffsetTop(node));
            }
        }
    }
    componentWillUnmount() {
        this.clearUpdatingTimeout();
    }
    // toggle property to true for given amount of time
    updateStatePropertyForTime(name, timeout) {
        const { isKpiAlertAfterSaving, isKpiAlertAfterDeleting, isAlertHighlighted } = this.state;
        this.clearUpdatingTimeout(name);
        this.setState({
            isKpiAlertAfterSaving,
            isKpiAlertAfterDeleting,
            isAlertHighlighted,
            [name]: true,
        });
        this.timeouts[name] = setTimeout(() => {
            this.setState({
                isKpiAlertAfterSaving,
                isKpiAlertAfterDeleting,
                isAlertHighlighted,
                [name]: false,
            });
        }, timeout);
    }
    clearUpdatingTimeout(name) {
        if (name && this.timeouts[name]) {
            clearTimeout(this.timeouts[name]);
            delete this.timeouts[name];
        }
        else {
            Object.keys(this.timeouts).forEach((key) => clearTimeout(this.timeouts[key]));
            this.timeouts = {};
        }
    }
    isKpiAlertSaved(nextProps) {
        return (!this.state.isKpiAlertAfterSaving &&
            this.props.alertSavingStatus === "inProgress" &&
            nextProps.alertSavingStatus === "idle");
    }
    isKpiAlertDeleted(nextProps) {
        return (!this.state.isKpiAlertAfterDeleting &&
            this.props.alertDeletingStatus === "inProgress" &&
            nextProps.alertDeletingStatus === "idle");
    }
    getClassNames() {
        var _a;
        const { kpiAlertResult } = this.props;
        const isNoData = isNoDataSdkError(this.props.alertExecutionError);
        const hasEvaluationResult = isNoData || (kpiAlertResult === null || kpiAlertResult === void 0 ? void 0 : kpiAlertResult.measureResult) !== undefined;
        const content = cx(this.props.contentClassName, {
            "is-alert-dialog": this.props.isAlertDialogOpen,
            "has-set-alert": !!this.props.alert,
            "is-alert-triggered": hasEvaluationResult && ((_a = this.props.alert) === null || _a === void 0 ? void 0 : _a.isTriggered) && !this.props.suppressAlertTriggered,
            "is-alert-broken": hasEvaluationResult && this.props.isAlertBroken,
            "is-alert-highlighted": this.state.isAlertHighlighted,
            "is-alert-evaluating": this.props.isAlertExecutionLoading,
        });
        const kpi = cx(this.props.kpiClassName, "s-dashboard-kpi-component", "widget-loaded", "visualization", {
            "kpi-with-pop": this.props.kpi.kpi.comparisonType !== "none",
            "content-loading": this.props.isLoading,
            "content-loaded": !this.props.isLoading,
        });
        return {
            content,
            kpi,
        };
    }
    getBubbleMessage(isAlertingTemporarilyDisabled) {
        const { isReadOnlyMode } = this.props;
        if (isReadOnlyMode) {
            return React.createElement(FormattedMessage, { id: "kpi.alertBox.disabledInReadOnly" });
        }
        if (isAlertingTemporarilyDisabled) {
            return React.createElement(FormattedMessage, { id: "visualization.alert_not_supported" });
        }
        return React.createElement(FormattedMessage, { id: "kpi.alertBox.unverifiedEmail" });
    }
    render() {
        const classnames = this.getClassNames();
        return (React.createElement(DashboardItemKpi, { contentClassName: classnames.content, visualizationClassName: classnames.kpi, contentRef: this.node, renderAfterContent: () => this.props.isAlertDialogOpen && this.props.renderAlertDialog(), renderBeforeVisualization: () => {
                var _a;
                return !this.props.suppressDescriptionTrigger &&
                    ((_a = this.props.userWorkspaceSettings) === null || _a === void 0 ? void 0 : _a.enableDescriptions) ? (React.createElement(KpiDescriptionTrigger, { kpi: this.props.kpi })) : null;
            }, renderHeadline: (clientHeight) => (React.createElement(React.Fragment, null,
                this.renderAlertBox(),
                this.props.renderHeadline(clientHeight))), isSelectable: this.props.isSelectable, isSelected: this.props.isSelected, onSelected: this.props.onSelected }, this.props.children));
    }
}
DashboardItemWithKpiAlert.defaultProps = {
    isAlertHighlighted: false,
    filters: [],
    alertDeletingStatus: "idle",
    alertSavingStatus: "idle",
    alertUpdatingStatus: "idle",
    suppressAlertTriggered: false,
    suppressDescriptionTrigger: false,
    isReadOnlyMode: false,
};
export { DashboardItemWithKpiAlert };
//# sourceMappingURL=DashboardItemWithKpiAlert.js.map