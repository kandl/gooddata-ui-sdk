// (C) 2007-2020 GoodData Corporation
import React, { PureComponent, Fragment } from "react";
import { getHslFromHexColor, getHexFromHslColor, isHexColorValid } from "../utils.js";
import { Input } from "../../Form/index.js";
class HexColorInput extends PureComponent {
    constructor() {
        super(...arguments);
        this.onInputChange = (value) => {
            if (isHexColorValid(value)) {
                const newHsl = getHslFromHexColor(value);
                this.props.onInputChanged(newHsl);
            }
        };
    }
    render() {
        const hexValue = getHexFromHslColor(this.props.initColor);
        return (React.createElement(Fragment, null,
            React.createElement(Input, { className: "s-color-picker-hex", value: hexValue, onChange: this.onInputChange, placeholder: this.props.placeholder }),
            React.createElement("p", null, this.props.label)));
    }
}
HexColorInput.defaultProps = {
    placeholder: "",
    label: "",
};
export { HexColorInput };
//# sourceMappingURL=HexColorInput.js.map