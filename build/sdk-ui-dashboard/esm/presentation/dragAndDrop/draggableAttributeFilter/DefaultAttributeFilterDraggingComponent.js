// (C) 2007-2022 GoodData Corporation
import React from "react";
import { Icon, ShortenedText } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { areObjRefsEqual, idRef, uriRef, } from "@gooddata/sdk-model";
import { createSelector } from "@reduxjs/toolkit";
import { selectCatalogAttributes, useDashboardSelector } from "../../../model/index.js";
function isDisplayFormEqual(displayForm, identifierOrUriRef) {
    return (areObjRefsEqual(idRef(displayForm.id, displayForm.type), identifierOrUriRef) ||
        areObjRefsEqual(uriRef(displayForm.uri), identifierOrUriRef));
}
const selectFilterAttribute = (filter) => createSelector(selectCatalogAttributes, (attributes) => attributes.find((attribute) => attribute.displayForms.some((displayForm) => isDisplayFormEqual(displayForm, filter.attributeFilter.displayForm))));
export const DefaultAttributeFilterDraggingComponent = ({ item }) => {
    var _a, _b;
    const theme = useTheme();
    const filterAttribute = useDashboardSelector(selectFilterAttribute(item.filter));
    if (!filterAttribute) {
        return null;
    }
    return (React.createElement("div", { className: "attribute-filter-button is-dragging" },
        React.createElement(Icon.DragHandle, { width: 7, height: 26, className: "drag-handle-icon", color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c5 }),
        React.createElement("div", { className: "button-content" },
            React.createElement("div", { className: "button-title" },
                React.createElement(ShortenedText, null, filterAttribute.attribute.title)))));
};
//# sourceMappingURL=DefaultAttributeFilterDraggingComponent.js.map