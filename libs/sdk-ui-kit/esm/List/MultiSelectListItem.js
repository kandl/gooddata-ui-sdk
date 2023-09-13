// (C) 2007-2022 GoodData Corporation
import React, { PureComponent } from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
/**
 * @internal
 */
export class MultiSelectListItem extends PureComponent {
    constructor() {
        super(...arguments);
        this.getClassNames = () => {
            const { title, isSelected } = this.props;
            return cx({
                "gd-list-item": true,
                [`s-${stringUtils.simplifyText(title)}`]: true,
                "has-only-visible": true,
                "is-selected": isSelected,
            });
        };
        this.renderOnly = () => {
            const { onOnly } = this.props;
            return (React.createElement("span", { className: "gd-list-item-only", onClick: (e) => {
                    e.stopPropagation();
                    if (onOnly) {
                        onOnly();
                    }
                } },
                React.createElement(FormattedMessage, { id: "gs.list.only" })));
        };
    }
    render() {
        const { title, onClick, onMouseOver, onMouseOut, isSelected } = this.props;
        return (React.createElement("div", { className: this.getClassNames(), onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut },
            React.createElement("label", { className: "input-checkbox-label" },
                React.createElement("input", { type: "checkbox", className: "input-checkbox", readOnly: true, checked: isSelected }),
                React.createElement("span", { className: "input-label-text" }, title)),
            this.renderOnly()));
    }
}
//# sourceMappingURL=MultiSelectListItem.js.map