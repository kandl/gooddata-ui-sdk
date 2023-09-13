// (C) 2020-2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import { DialogBase } from "./DialogBase.js";
import noop from "lodash/noop.js";
import { Checkbox } from "../Form/index.js";
import { ConfirmDialogBase } from "./ConfirmDialogBase.js";
/**
 * @internal
 */
class ExportDialogBase extends DialogBase {
    constructor() {
        super(...arguments);
        this.state = {
            includeFilterContext: this.props.includeFilterContext,
            mergeHeaders: this.props.mergeHeaders,
        };
        this.onFilterContextChange = (value) => {
            this.setState({ includeFilterContext: value });
        };
        this.onMergeHeadersChange = (value) => {
            this.setState({ mergeHeaders: value });
        };
        this.onSubmit = () => {
            const { filterContextVisible } = this.props;
            const { includeFilterContext, mergeHeaders } = this.state;
            this.props.onSubmit({
                includeFilterContext: filterContextVisible && includeFilterContext,
                mergeHeaders,
            });
        };
    }
    render() {
        const { className, displayCloseButton, isPositive, isSubmitDisabled, headline, cancelButtonText, submitButtonText, onCancel, filterContextText, filterContextTitle, filterContextVisible, mergeHeadersDisabled, mergeHeadersText, mergeHeadersTitle, } = this.props;
        const { includeFilterContext, mergeHeaders } = this.state;
        let filterContextCheckbox;
        if (filterContextVisible) {
            filterContextCheckbox = (React.createElement(Checkbox, { name: "gs.dialog.export.checkbox.includeFilterContext", text: filterContextText, title: filterContextTitle, value: includeFilterContext, onChange: this.onFilterContextChange }));
        }
        return (React.createElement(ConfirmDialogBase, { className: cx("gd-export-dialog", className), displayCloseButton: displayCloseButton, isPositive: isPositive, isSubmitDisabled: isSubmitDisabled, headline: headline, cancelButtonText: cancelButtonText, submitButtonText: submitButtonText, onCancel: onCancel, onSubmit: this.onSubmit },
            React.createElement(Checkbox, { disabled: mergeHeadersDisabled, name: "gs.dialog.export.checkbox.mergeHeaders", text: mergeHeadersText, title: mergeHeadersTitle, value: mergeHeaders, onChange: this.onMergeHeadersChange }),
            filterContextCheckbox));
    }
}
ExportDialogBase.defaultProps = {
    displayCloseButton: true,
    isPositive: true,
    isSubmitDisabled: false,
    headline: "Export to XLSX",
    cancelButtonText: "Cancel",
    submitButtonText: "Export",
    filterContextText: "Include applied filters",
    filterContextTitle: "INSIGHT CONTEXT",
    filterContextVisible: true,
    includeFilterContext: true,
    mergeHeaders: true,
    mergeHeadersDisabled: false,
    mergeHeadersText: "Keep attribute cells merged",
    mergeHeadersTitle: "CELLS",
    onCancel: noop,
    onSubmit: noop,
};
export { ExportDialogBase };
//# sourceMappingURL=ExportDialogBase.js.map