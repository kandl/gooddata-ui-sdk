// (C) 2020-2022 GoodData Corporation
import React from "react";
import noop from "lodash/noop.js";
import { MeasureValueFilterDropdown } from "./MeasureValueFilterDropdown.js";
import MeasureValueFilterButton from "./MeasureValueFilterButton.js";
/**
 * @beta
 */
class MeasureValueFilter extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            displayDropdown: false,
        };
        this.buttonRef = React.createRef();
        this.onApply = (filter) => {
            this.closeDropdown();
            this.props.onApply(filter);
        };
        this.onCancel = () => {
            this.closeDropdown();
            this.props.onCancel();
        };
        this.closeDropdown = () => {
            this.setState({ displayDropdown: false });
        };
        this.toggleDropdown = () => {
            this.setState((state) => (Object.assign(Object.assign({}, state), { displayDropdown: !state.displayDropdown })));
        };
    }
    render() {
        const { displayDropdown } = this.state;
        const { filter, measureIdentifier, buttonTitle, usePercentage, warningMessage, locale, separators, displayTreatNullAsZeroOption, treatNullAsZeroDefaultValue, enableOperatorSelection, } = this.props;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { ref: this.buttonRef },
                React.createElement(MeasureValueFilterButton, { onClick: this.toggleDropdown, isActive: displayDropdown, buttonTitle: buttonTitle })),
            displayDropdown ? (React.createElement(MeasureValueFilterDropdown, { onApply: this.onApply, onCancel: this.onCancel, filter: filter, measureIdentifier: measureIdentifier, usePercentage: usePercentage, warningMessage: warningMessage, locale: locale, separators: separators, displayTreatNullAsZeroOption: displayTreatNullAsZeroOption, treatNullAsZeroDefaultValue: treatNullAsZeroDefaultValue, enableOperatorSelection: enableOperatorSelection, anchorEl: this.buttonRef.current })) : null));
    }
}
MeasureValueFilter.defaultProps = {
    onCancel: noop,
};
export { MeasureValueFilter };
//# sourceMappingURL=MeasureValueFilter.js.map