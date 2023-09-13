// (C) 2020-2023 GoodData Corporation
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { DropdownSectionHeader } from "../DropdownSectionHeader.js";
import { AttributeDisplayFormParameterDetail } from "../ParameterDetails/AttributeDisplayFormParameterDetail.js";
import { Parameter } from "./Parameter.js";
import { useWorkspaceStrict } from "@gooddata/sdk-ui";
import { selectAllCatalogAttributesMap, useDashboardSelector } from "../../../../../model/index.js";
const ParameterX = ({ item, onAdd }) => {
    const x = useDashboardSelector(selectAllCatalogAttributesMap);
    const y = x.get(item.attribute);
    const intl = useIntl();
    const projectId = useWorkspaceStrict();
    return (React.createElement(Parameter, { key: item.id, name: (y === null || y === void 0 ? void 0 : y.attribute.title) || "", description: item.title, detailContent: React.createElement(AttributeDisplayFormParameterDetail, { title: (y === null || y === void 0 ? void 0 : y.attribute.title) || "", label: item.title, type: item.displayFormType, projectId: projectId, displayFormRef: item.ref, showValues: true }), iconClassName: getDisplayFormIcon(item.displayFormType), onAdd: () => onAdd(`{attribute_title(${item.id})}`), intl: intl }));
};
const getDisplayFormIcon = (type) => {
    switch (type) {
        case "GDC.link":
            return "gd-icon-hyperlink-warning";
        case "GDC.geo.pin":
        case "GDC.geo.pin_latitude":
        case "GDC.geo.pin_longitude":
            return "gd-icon-earth";
        default:
            return "gd-icon-label-warning";
    }
};
export const InsightParametersSection = ({ attributeDisplayForms, loadingAttributeDisplayForms, onAdd, }) => {
    return (React.createElement(React.Fragment, null, (attributeDisplayForms && attributeDisplayForms.length > 0) || loadingAttributeDisplayForms ? (React.createElement(React.Fragment, null,
        React.createElement(DropdownSectionHeader, null,
            React.createElement(FormattedMessage, { id: "configurationPanel.drillIntoUrl.editor.insightParametersSectionLabel" })),
        loadingAttributeDisplayForms ? (React.createElement("div", { className: "gd-drill-to-url-section-loading s-drill-to-custom-url-attr-section-loading" },
            React.createElement("div", { className: "gd-spinner small" }))) : (attributeDisplayForms === null || attributeDisplayForms === void 0 ? void 0 : attributeDisplayForms.map((item) => (React.createElement(ParameterX, { key: item.displayForm.id, item: item.displayForm, onAdd: onAdd })))))) : null));
};
//# sourceMappingURL=InsightParametersSection.js.map