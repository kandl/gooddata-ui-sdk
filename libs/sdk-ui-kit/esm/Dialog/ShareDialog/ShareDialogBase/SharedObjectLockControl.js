// (C) 2021 GoodData Corporation
import React from "react";
import { useComponentLabelsContext } from "./ComponentLabelsContext.js";
import { SharedObjectCheckboxControl } from "./SharedObjectCheckboxControl.js";
/**
 * @internal
 */
export const SharedObjectLockControl = ({ isLocked, isLockingSupported, onLockChange, }) => {
    const labels = useComponentLabelsContext();
    return (React.createElement(SharedObjectCheckboxControl, { isChecked: isLocked, isSupported: isLockingSupported, onChange: onLockChange, label: labels.accessTypeLabel, name: "shared-dialog-lock", className: "s-shared-object-lock" }));
};
//# sourceMappingURL=SharedObjectLockControl.js.map