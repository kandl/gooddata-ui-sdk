// (C) 2023 GoodData Corporation
import React from "react";
import { Input } from "@gooddata/sdk-ui-kit";
import { ConfigurationCategory } from "../ConfigurationCategory.js";
export const AttributeTitleRenaming = (props) => {
    const { categoryTitle, resetTitleText, showResetTitle, attributeTitle, onClick, onChange } = props;
    const buttonClassNames = "gd-button gd-button-link attribute-filter-renaming-title-reset s-attribute-filter-renaming-title-reset";
    return (React.createElement("div", null,
        React.createElement("div", { className: "configuration-category-title" },
            React.createElement(ConfigurationCategory, { categoryTitle: categoryTitle }),
            showResetTitle ? (React.createElement("a", { className: buttonClassNames, target: "_blank", rel: "noopener noreferrer", onClick: onClick }, resetTitleText)) : null),
        React.createElement(Input, { className: "configuration-attribute-filter-title s-configuration-attribute-filter-title", value: attributeTitle, onChange: onChange })));
};
//# sourceMappingURL=AttributeTitleRenaming.js.map