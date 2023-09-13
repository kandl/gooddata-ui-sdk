// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import DisabledBubbleMessage from "../DisabledBubbleMessage.js";
import { getTranslation } from "../../utils/translations.js";
class CheckboxControl extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChanged = this.onValueChanged.bind(this);
    }
    render() {
        const { checked, disabled, labelText, showDisabledMessage, intl, valuePath, disabledMessageId } = this.props;
        return (React.createElement(DisabledBubbleMessage, { showDisabledMessage: showDisabledMessage, messageId: disabledMessageId },
            React.createElement("label", { className: "input-checkbox-label" },
                React.createElement("input", { "aria-label": valuePath, checked: checked, disabled: disabled, type: "checkbox", className: "input-checkbox", onChange: this.onValueChanged }),
                React.createElement("span", { className: "input-label-text" }, getTranslation(labelText, intl)))));
    }
    onValueChanged(event) {
        const { valuePath, properties, pushData } = this.props;
        const clonedProperties = cloneDeep(properties);
        set(clonedProperties, `controls.${valuePath}`, event.target.checked);
        pushData({ properties: clonedProperties });
    }
}
CheckboxControl.defaultProps = {
    checked: false,
    disabled: false,
    showDisabledMessage: false,
};
export default injectIntl(CheckboxControl);
//# sourceMappingURL=CheckboxControl.js.map