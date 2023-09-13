// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import cloneDeep from "lodash/cloneDeep";
import noop from "lodash/noop";
import set from "lodash/set";
import DisabledBubbleMessage from "../DisabledBubbleMessage";
import { getTranslation } from "../../utils/translations";
class ConfigSubsection extends React.Component {
    constructor(props) {
        super(props);
        this.toggleValue = this.toggleValue.bind(this);
    }
    render() {
        const { title, intl } = this.props;
        const className = `configuration-subsection ${this.getTestClassName()}`;
        return (React.createElement("div", { className: className, "aria-label": "Configuration subsection" },
            React.createElement("fieldset", null,
                React.createElement("legend", null,
                    React.createElement("span", { className: "legend-title" }, getTranslation(title, intl)),
                    this.renderToggleSwitch()),
                React.createElement("div", null, this.props.children))));
    }
    renderToggleSwitch() {
        if (this.props.canBeToggled) {
            const { toggledOn, toggleDisabled, showDisabledMessage, title, intl, axisType } = this.props;
            return (React.createElement(DisabledBubbleMessage, { className: "input-checkbox-toggle", showDisabledMessage: showDisabledMessage },
                React.createElement("label", { className: "s-checkbox-toggle-label" },
                    React.createElement("input", { "aria-label": `${axisType} ${getTranslation(title, intl)}`, type: "checkbox", checked: toggledOn, disabled: toggleDisabled, onChange: this.toggleValue, className: "s-checkbox-toggle" }),
                    React.createElement("span", { className: "input-label-text" }))));
        }
        return null;
    }
    toggleValue(event) {
        const { valuePath, properties, pushData } = this.props;
        if (valuePath && properties && pushData) {
            const clonedProperties = cloneDeep(properties);
            set(clonedProperties, `controls.${valuePath}`, event.target.checked);
            pushData({ properties: clonedProperties });
        }
    }
    getTestClassName() {
        return `s-configuration-subsection-${this.props.title.replace(/\./g, "-")}`;
    }
}
ConfigSubsection.defaultProps = {
    collapsed: true,
    canBeToggled: false,
    toggleDisabled: false,
    toggledOn: true,
    pushData: noop,
    showDisabledMessage: false,
};
export default injectIntl(ConfigSubsection);
//# sourceMappingURL=ConfigSubsection.js.map