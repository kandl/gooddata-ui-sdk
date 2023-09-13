// (C) 2020-2023 GoodData Corporation
import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { areObjRefsEqual, objRefToString } from "@gooddata/sdk-model";
import { AttributeUrlSectionItem } from "./AttributeUrlSectionItem.js";
import { DropdownSectionHeader } from "./DropdownSectionHeader.js";
export const AttributeUrlSection = (props) => {
    const { attributeDisplayForms, loading = false, selected, onSelect } = props;
    const onClickHandler = useCallback((target) => {
        onSelect(target.attributeDisplayFormRef, target.displayForm.ref);
    }, [onSelect]);
    if (!loading && attributeDisplayForms.length === 0) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(DropdownSectionHeader, { className: "s-drill-to-attribute-url-section-title" },
            React.createElement(FormattedMessage, { id: "configurationPanel.drillIntoUrl.attributeUrlSectionTitle" })),
        loading ? (React.createElement("div", { className: "gd-drill-to-url-section-loading s-drill-to-attribute-url-section-loading" },
            React.createElement("div", { className: "gd-spinner small" }))) : (React.createElement("div", { className: "gd-drill-to-url-section-items" }, attributeDisplayForms.map((item) => (React.createElement(AttributeUrlSectionItem, { key: objRefToString(item.displayForm.ref), item: item, isSelected: areObjRefsEqual(item.displayForm.ref, selected || undefined), onClickHandler: onClickHandler })))))));
};
//# sourceMappingURL=AttributeUrlSection.js.map