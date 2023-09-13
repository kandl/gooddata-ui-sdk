// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import DropdownControl from "../DropdownControl";
import { legendPositionDropdownItems } from "../../../constants/dropdowns";
import { getTranslatedDropdownItems } from "../../../utils/translations";
import { messages } from "../../../../locales";
class LegendPositionControl extends React.PureComponent {
    render() {
        return (React.createElement(DropdownControl, { value: this.props.value, valuePath: "legend.position", labelText: messages.position.id, disabled: this.props.disabled, properties: this.props.properties, pushData: this.props.pushData, items: this.generateDropdownItems(), showDisabledMessage: this.props.showDisabledMessage }));
    }
    generateDropdownItems() {
        return getTranslatedDropdownItems(legendPositionDropdownItems, this.props.intl);
    }
}
export default injectIntl(LegendPositionControl);
//# sourceMappingURL=LegendPositionControl.js.map