// (C) 2023 GoodData Corporation
import React from "react";
export const ConfigDummySection = ({ id, children }) => {
    const className = `adi-bucket-configuration s-config-section-${id}`;
    return (React.createElement("div", { className: className, "aria-label": "Configuration section" }, children));
};
//# sourceMappingURL=ConfigDummySection.js.map