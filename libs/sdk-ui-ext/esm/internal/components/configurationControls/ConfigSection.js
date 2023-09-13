// (C) 2019-2023 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import cx from "classnames";
import cloneDeep from "lodash/cloneDeep.js";
import noop from "lodash/noop.js";
import set from "lodash/set.js";
import DisabledBubbleMessage from "../DisabledBubbleMessage.js";
import { getTranslation } from "../../utils/translations.js";
class ConfigSection extends React.Component {
    constructor(props) {
        var _a, _b, _c;
        super(props);
        this.toggleCollapsed = this.toggleCollapsed.bind(this);
        this.toggleValue = this.toggleValue.bind(this);
        const collapsed = (_c = (_b = (_a = props.propertiesMeta) === null || _a === void 0 ? void 0 : _a[props.id]) === null || _b === void 0 ? void 0 : _b.collapsed) !== null && _c !== void 0 ? _c : true;
        this.state = {
            collapsed,
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        var _a, _b, _c;
        // TODO: should the indexer be "nextProps.id"? Leaving as-is for now to be safe.
        const collapsed = (_c = (_b = (_a = nextProps.propertiesMeta) === null || _a === void 0 ? void 0 : _a[this.props.id]) === null || _b === void 0 ? void 0 : _b.collapsed) !== null && _c !== void 0 ? _c : true;
        this.setState({ collapsed });
    }
    render() {
        const { collapsed } = this.state;
        const { title, intl, subtitle, className } = this.props;
        const configSectionClassName = `adi-bucket-configuration ${className}`;
        return (React.createElement("div", { className: this.getSectionClassNames(), "aria-label": "Configuration section" },
            React.createElement("div", { className: this.getHeaderClassNames(), onClick: this.toggleCollapsed }, getTranslation(title, intl) + (subtitle ? ` (${getTranslation(subtitle, intl)})` : "")),
            this.renderToggleSwitch(),
            React.createElement("div", { className: configSectionClassName }, !collapsed && this.props.children)));
    }
    renderToggleSwitch() {
        if (this.props.canBeToggled) {
            const { toggledOn, toggleDisabled, showDisabledMessage, id, toggleMessageId } = this.props;
            return (React.createElement(DisabledBubbleMessage, { className: "adi-bucket-item-toggle", showDisabledMessage: showDisabledMessage, messageId: toggleMessageId },
                React.createElement("label", { className: this.getToggleLabelClassNames() },
                    React.createElement("input", { "aria-label": id, type: "checkbox", checked: toggledOn, disabled: toggleDisabled, onChange: this.toggleValue, className: `s-checkbox-toggle ${toggleDisabled ? "s-disabled" : "s-enabled"}` }),
                    React.createElement("span", { className: "input-label-text" }))));
        }
        return null;
    }
    getHeaderClassNames() {
        const { collapsed } = this.state;
        return cx("adi-bucket-item-header", "adi-configuration-section-header", "s-configuration-panel-item-header", {
            expanded: !collapsed,
            "adi-bucket-item-header-has-toggle": this.props.canBeToggled,
            collapsed,
        });
    }
    getToggleLabelClassNames() {
        return cx("input-checkbox-toggle", "s-checkbox-toggle-label");
    }
    getSectionClassNames() {
        return cx("adi-bucket-item", `s-config-section-${this.props.id}`);
    }
    toggleCollapsed() {
        const { collapsed } = this.state;
        const propertiesMeta = {};
        propertiesMeta[this.props.id] = {
            collapsed: !collapsed,
        };
        this.setState({ collapsed: !collapsed });
        this.props.pushData({ propertiesMeta });
    }
    toggleValue(event) {
        const { valuePath, properties, pushData } = this.props;
        if (valuePath && properties && pushData) {
            const clonedProperties = cloneDeep(properties);
            set(clonedProperties, `controls.${valuePath}`, event.target.checked);
            pushData({ properties: clonedProperties });
        }
    }
}
ConfigSection.defaultProps = {
    collapsed: true,
    canBeToggled: false,
    toggleDisabled: false,
    toggledOn: true,
    disabled: false,
    pushData: noop,
    showDisabledMessage: false,
    className: "",
    properties: {},
};
export { ConfigSection };
export default injectIntl(ConfigSection);
//# sourceMappingURL=ConfigSection.js.map