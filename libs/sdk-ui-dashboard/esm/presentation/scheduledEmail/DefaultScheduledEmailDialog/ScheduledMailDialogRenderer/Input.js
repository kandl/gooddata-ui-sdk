// (C) 2019-2020 GoodData Corporation
import * as React from "react";
import { Input as InputSDK } from "@gooddata/sdk-ui-kit";
export const Input = (props) => {
    const { className = "", label, maxlength, placeholder, value, onChange } = props;
    const classNames = `gd-input-component ${className}`;
    return (React.createElement("div", { className: classNames },
        React.createElement("label", { className: "gd-label" }, label),
        React.createElement(InputSDK, { hasError: false, maxlength: maxlength, placeholder: placeholder, value: value, onChange: 
            // as any, the value will indeed always be string
            // TODO improve typings of Input in ui-kit to have properly typed the onChange related to the input type
            onChange })));
};
//# sourceMappingURL=Input.js.map