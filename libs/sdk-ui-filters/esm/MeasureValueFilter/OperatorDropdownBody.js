// (C) 2019 GoodData Corporation
import React from "react";
import { Separator, Overlay } from "@gooddata/sdk-ui-kit";
import OperatorDropdownItem from "./OperatorDropdownItem.js";
import { injectIntl } from "react-intl";
class OperatorDropdownBody extends React.PureComponent {
    render() {
        const { onSelect, onClose, selectedOperator, alignTo, intl } = this.props;
        return (React.createElement(Overlay, { closeOnOutsideClick: true, alignTo: alignTo, alignPoints: [{ align: "bl tl" }], onClose: onClose },
            React.createElement("div", { className: "gd-dropdown overlay" },
                React.createElement("div", { className: "gd-mvf-operator-dropdown-body s-mvf-operator-dropdown-body" },
                    React.createElement(OperatorDropdownItem, { operator: "ALL", selectedOperator: selectedOperator, onClick: onSelect }),
                    React.createElement(Separator, null),
                    React.createElement(OperatorDropdownItem, { operator: "GREATER_THAN", selectedOperator: selectedOperator, onClick: onSelect }),
                    React.createElement(OperatorDropdownItem, { operator: "GREATER_THAN_OR_EQUAL_TO", selectedOperator: selectedOperator, onClick: onSelect }),
                    React.createElement(Separator, null),
                    React.createElement(OperatorDropdownItem, { operator: "LESS_THAN", selectedOperator: selectedOperator, onClick: onSelect }),
                    React.createElement(OperatorDropdownItem, { operator: "LESS_THAN_OR_EQUAL_TO", selectedOperator: selectedOperator, onClick: onSelect }),
                    React.createElement(Separator, null),
                    React.createElement(OperatorDropdownItem, { operator: "BETWEEN", selectedOperator: selectedOperator, onClick: onSelect, bubbleText: intl.formatMessage({ id: "mvf.operator.between.tooltip.bubble" }) }),
                    React.createElement(OperatorDropdownItem, { operator: "NOT_BETWEEN", selectedOperator: selectedOperator, onClick: onSelect, bubbleText: intl.formatMessage({ id: "mvf.operator.notBetween.tooltip.bubble" }) }),
                    React.createElement(Separator, null),
                    React.createElement(OperatorDropdownItem, { operator: "EQUAL_TO", selectedOperator: selectedOperator, onClick: onSelect }),
                    React.createElement(OperatorDropdownItem, { operator: "NOT_EQUAL_TO", selectedOperator: selectedOperator, onClick: onSelect })))));
    }
}
export default injectIntl(OperatorDropdownBody);
//# sourceMappingURL=OperatorDropdownBody.js.map