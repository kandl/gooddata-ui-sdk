// (C) 2019-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import noop from "lodash/noop.js";
/**
 * @internal
 */
class Checkbox extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onChange = (e) => {
            this.props.onChange(e.target.checked);
        };
    }
    render() {
        const { disabled, name, text, title, value, labelSize } = this.props;
        const labelClasses = cx("input-label-text", {
            "gd-label-small gd-checkbox-label-small": labelSize === "small",
            "gd-label gd-checkbox-label": labelSize === "normal",
        });
        return (React.createElement(React.Fragment, null,
            title ? React.createElement("h6", null, title) : null,
            React.createElement("label", { className: "input-checkbox-label" },
                React.createElement("input", { type: "checkbox", className: "input-checkbox", name: name, checked: value, disabled: disabled, onChange: this.onChange }),
                React.createElement("span", { className: labelClasses }, text))));
    }
}
Checkbox.defaultProps = {
    disabled: false,
    name: "",
    text: "",
    title: "",
    value: false,
    labelSize: "small",
    onChange: noop,
};
export { Checkbox };
//# sourceMappingURL=Checkbox.js.map