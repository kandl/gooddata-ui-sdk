// (C) 2007-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import cx from "classnames";
import capitalize from "lodash/capitalize.js";
import noop from "lodash/noop.js";
import { stringUtils } from "@gooddata/util";
import { getOperatorTranslationKey, getOperatorIcon } from "./helpers/measureValueFilterOperator.js";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
class OperatorDropdownItem extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleOnClick = (e) => {
            const { operator, onClick } = this.props;
            onClick(operator);
            e.preventDefault();
        };
    }
    render() {
        const { intl, operator, selectedOperator, bubbleText } = this.props;
        const className = cx("gd-list-item", "gd-list-item-shortened", `s-mvf-operator-${stringUtils.simplifyText(operator)}`, {
            "is-selected": selectedOperator === operator,
        });
        const title = intl.formatMessage({ id: getOperatorTranslationKey(operator) });
        return (React.createElement("div", { className: className, onClick: this.handleOnClick },
            React.createElement("div", { className: `gd-icon-${getOperatorIcon(operator)}`, title: title }),
            React.createElement("span", { title: title }, capitalize(title)),
            bubbleText ? this.renderBubble(bubbleText) : null));
    }
    renderBubble(message) {
        return (React.createElement("div", { className: "tooltip-bubble" },
            React.createElement(BubbleHoverTrigger, { tagName: "div", showDelay: 400, hideDelay: 200 },
                React.createElement("div", { className: "inlineBubbleHelp" }),
                React.createElement(Bubble, { className: "bubble-primary", alignPoints: [{ align: "tc bl" }] }, message))));
    }
}
OperatorDropdownItem.defaultProps = {
    onClick: noop,
    bubbleText: null,
};
export { OperatorDropdownItem };
export default injectIntl(OperatorDropdownItem);
//# sourceMappingURL=OperatorDropdownItem.js.map