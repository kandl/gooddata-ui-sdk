// (C) 2007-2021 GoodData Corporation
import React, { PureComponent } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import cx from "classnames";
import noop from "lodash/noop.js";
import { stringUtils } from "@gooddata/util";
/**
 * @internal
 * @deprecated This component is deprecated use MultiSelectListItem instead
 */
class LegacyMultiSelectListItem extends PureComponent {
    constructor(props) {
        super(props);
        this.handleSelect = () => {
            this.props.onSelect(this.props.source);
        };
        this.handleMouseOver = () => {
            this.props.onMouseOver(this.props.source);
        };
        this.handleMouseOut = () => {
            this.props.onMouseOut(this.props.source);
        };
        this.handleOnly = (ev) => {
            ev.stopPropagation();
            this.props.onOnly(this.props.source);
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleOnly = this.handleOnly.bind(this);
    }
    getClassNames() {
        return cx({
            "gd-list-item": true,
            [`s-${stringUtils.simplifyText(this.props.source.title)}`]: true,
            "has-only-visible": true,
            "is-selected": this.props.selected,
        });
    }
    renderOnly() {
        return (React.createElement("span", { className: "gd-list-item-only", onClick: this.handleOnly },
            React.createElement(FormattedMessage, { id: "gs.list.only" })));
    }
    render() {
        return (React.createElement("div", { className: this.getClassNames(), onClick: this.handleSelect, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut },
            React.createElement("label", { className: "input-checkbox-label" },
                React.createElement("input", { type: "checkbox", className: "input-checkbox", readOnly: true, checked: this.props.selected }),
                React.createElement("span", { className: "input-label-text" }, this.props.source.title)),
            this.renderOnly()));
    }
}
LegacyMultiSelectListItem.defaultProps = {
    isLoading: false,
    onMouseOver: noop,
    onMouseOut: noop,
    onOnly: noop,
    onSelect: noop,
    selected: false,
    source: {},
};
export { LegacyMultiSelectListItem };
export default injectIntl(LegacyMultiSelectListItem);
//# sourceMappingURL=LegacyMultiSelectListItem.js.map