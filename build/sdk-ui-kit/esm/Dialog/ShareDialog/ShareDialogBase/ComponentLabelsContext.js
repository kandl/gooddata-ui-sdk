// (C) 2021 GoodData Corporation
import React, { useContext } from "react";
const defaultLabels = {
    accessTypeLabel: "access-type-label",
    accessRegimeLabel: "access-regime-label",
    removeAccessGranteeTooltip: "remove-access-grantee-tooltip",
    removeAccessCreatorTooltip: "remove-access-creator-tooltip",
};
const LabelsContext = React.createContext(defaultLabels);
/**
 * @internal
 */
export const useComponentLabelsContext = () => useContext(LabelsContext);
/**
 * @internal
 */
export const ComponentLabelsProvider = (props) => {
    const { children, labels } = props;
    return React.createElement(LabelsContext.Provider, { value: labels }, children);
};
//# sourceMappingURL=ComponentLabelsContext.js.map