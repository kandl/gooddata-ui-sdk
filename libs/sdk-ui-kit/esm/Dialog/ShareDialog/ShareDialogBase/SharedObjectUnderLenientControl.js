// (C) 2021 GoodData Corporation
import React from "react";
import { useComponentLabelsContext } from "./ComponentLabelsContext.js";
import { SharedObjectCheckboxControl } from "./SharedObjectCheckboxControl.js";
/**
 * @internal
 */
export const SharedObjectUnderLenientControl = ({ isUnderLenientControl, isLeniencyControlSupported, onUnderLenientControlChange, }) => {
    const labels = useComponentLabelsContext();
    return (React.createElement(SharedObjectCheckboxControl, { isChecked: isUnderLenientControl, isSupported: isLeniencyControlSupported, onChange: onUnderLenientControlChange, label: labels.accessRegimeLabel, name: "shared-accessRegimeLabel-control", className: "s-shared-object-under-lenient-control" }));
};
//# sourceMappingURL=SharedObjectUnderLenientControl.js.map