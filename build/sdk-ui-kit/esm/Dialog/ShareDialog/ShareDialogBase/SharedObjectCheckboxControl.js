// (C) 2021-2023 GoodData Corporation
import React from "react";
import cx from "classnames";
export const SharedObjectCheckboxControl = ({ isChecked, isSupported, onChange, name, label, className, }) => {
    if (!isSupported) {
        return null;
    }
    const handleOnChange = (e) => onChange(e.target.checked);
    const classNames = cx("input-checkbox-label", className);
    return (React.createElement("label", { className: classNames },
        React.createElement("input", { type: "checkbox", name: name, className: "input-checkbox", checked: isChecked, onChange: handleOnChange, "aria-label": name }),
        React.createElement("span", { className: "input-label-text" }, label)));
};
//# sourceMappingURL=SharedObjectCheckboxControl.js.map