// (C) 2007-2022 GoodData Corporation
import React, { createRef } from "react";
import { injectIntl } from "react-intl";
class WrappedFilterLabel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { hasEllipsis: false };
        this.labelRef = createRef();
    }
    componentDidMount() {
        this.checkEllipsis();
    }
    componentDidUpdate() {
        this.checkEllipsis();
    }
    getIsDate() {
        return this.props.isDate;
    }
    isAllSelected() {
        return this.props.isAllSelected;
    }
    checkEllipsis() {
        const { offsetWidth, scrollWidth } = this.labelRef.current;
        // for some reason, IE11 returns offsetWidth = scrollWidth - 1 even when there is no ellipsis
        const hasEllipsis = offsetWidth < scrollWidth - 1;
        if (hasEllipsis !== this.state.hasEllipsis) {
            this.setState({ hasEllipsis });
        }
    }
    renderSelectionLabel(content) {
        return React.createElement("span", { className: "count s-total-count" }, content);
    }
    renderSelection() {
        if (!this.getIsDate() && !this.props.noData) {
            const { selectionSize, intl } = this.props;
            if (this.isAllSelected()) {
                return this.renderSelectionLabel(intl.formatMessage({ id: "gs.filterLabel.all" }));
            }
            if (selectionSize === 0) {
                return this.renderSelectionLabel(intl.formatMessage({ id: "gs.filterLabel.none" }));
            }
            if (this.state.hasEllipsis && selectionSize > 0) {
                return this.renderSelectionLabel(`(${selectionSize})`);
            }
        }
        return false;
    }
    renderTitle() {
        return [
            React.createElement("span", { className: "filter-label-title", key: "title", title: this.props.title }, this.props.title),
            this.isAllSelected() && !this.getIsDate() && !this.props.noData ? (React.createElement("span", { key: "title-colon" }, ": ")) : (false),
        ];
    }
    renderSelectedElements() {
        if (!this.props.selection || this.isAllSelected()) {
            return false;
        }
        return [
            React.createElement("span", { key: "selection-colon" }, ": "),
            React.createElement("span", { className: "filter-label-selection", key: "selection" }, this.props.selection),
        ];
    }
    render() {
        return (React.createElement("div", { role: "attribute-filter-label", className: "adi-attribute-filter-label s-attribute-filter-label" },
            React.createElement("span", { className: "label", ref: this.labelRef },
                this.renderTitle(),
                this.renderSelectedElements()),
            this.renderSelection()));
    }
}
WrappedFilterLabel.defaultProps = {
    isAllSelected: false,
    isDate: false,
    selection: "",
    noData: false,
};
/**
 * @internal
 */
export const FilterLabel = injectIntl(WrappedFilterLabel);
//# sourceMappingURL=FilterLabel.js.map