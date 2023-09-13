// (C) 2022-2023 GoodData Corporation
import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { dialogChangeMessageLabels } from "../../../../locales.js";
import { ComponentTypeItem } from "./ComponentTypeItem.js";
/**
 * @internal
 */
export const ComponentTypeSelect = (props) => {
    const { selectedComponentType, onComponentTypeChanged } = props;
    const onCheck = useCallback((e) => {
        const value = e.target.value;
        onComponentTypeChanged(value);
    }, [onComponentTypeChanged]);
    return (React.createElement("div", { className: "embed-insight-dialog-lang-selector" },
        React.createElement("strong", { className: "bottom-space" },
            React.createElement(FormattedMessage, { id: "embedInsightDialog.component.type" })),
        React.createElement(ComponentTypeItem, { className: "s-component-type-reference", itemText: "Referential", itemValue: "reference", onChange: onCheck, checked: selectedComponentType === "reference", questionMarkMessage: getChangesLabelId("reference") }),
        React.createElement(ComponentTypeItem, { className: "s-component-type-definition", itemText: "Programmatic", itemValue: "definition", onChange: onCheck, checked: selectedComponentType === "definition", questionMarkMessage: getChangesLabelId("definition") })));
};
const getChangesLabelId = (codeType) => {
    return dialogChangeMessageLabels[codeType].id;
};
//# sourceMappingURL=ComponentTypeSelect.js.map