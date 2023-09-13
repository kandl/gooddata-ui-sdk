// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { IntlWrapper } from "@gooddata/sdk-ui";
import { Overlay } from "@gooddata/sdk-ui-kit";
import { DropdownBody } from "./DropdownBody.js";
const alignPoints = ["bl tl", "tl bl", "br tr", "tr br"];
/*
 * TODO: same thing is in sdk-ui-ext .. but filters must not depend on it. we may be in need of some lower-level
 *  project on which both of filters and ext can depend. perhaps the purpose of the new project would be to provide
 *  thin layer on top of goodstrap (?)
 */
const DROPDOWN_ALIGNMENTS = alignPoints.map((align) => ({ align, offset: { x: 1, y: 0 } }));
class DropdownWrapped extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onApply = (operator, value, treatNullValuesAsZero) => {
            this.props.onApply(operator, value, treatNullValuesAsZero);
        };
    }
    render() {
        const { operator, value, usePercentage, warningMessage, locale, onCancel, anchorEl, separators, displayTreatNullAsZeroOption, treatNullAsZeroValue, enableOperatorSelection, } = this.props;
        const selectedOperator = operator !== null ? operator : "ALL";
        return (React.createElement(Overlay, { alignTo: anchorEl, alignPoints: DROPDOWN_ALIGNMENTS, closeOnOutsideClick: true, closeOnParentScroll: true, closeOnMouseDrag: true, onClose: onCancel },
            React.createElement(DropdownBody, { operator: selectedOperator, value: value, usePercentage: usePercentage, warningMessage: warningMessage, locale: locale, onCancel: onCancel, onApply: this.onApply, separators: separators, displayTreatNullAsZeroOption: displayTreatNullAsZeroOption, treatNullAsZeroValue: treatNullAsZeroValue, enableOperatorSelection: enableOperatorSelection })));
    }
}
DropdownWrapped.defaultProps = {
    value: {},
    operator: "ALL",
    displayTreatNullAsZeroOption: false,
    treatNullAsZeroValue: false,
};
export const DropdownWithIntl = injectIntl(DropdownWrapped);
export class Dropdown extends React.PureComponent {
    render() {
        return (React.createElement(IntlWrapper, { locale: this.props.locale },
            React.createElement(DropdownWithIntl, Object.assign({}, this.props))));
    }
}
//# sourceMappingURL=Dropdown.js.map