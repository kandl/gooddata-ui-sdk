// (C) 2020-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { IdentifierParametersSection } from "./CustomUrlEditorParametersSections/IdentifierParametersSection.js";
import { InsightParametersSection, } from "./CustomUrlEditorParametersSections/InsightParametersSection.js";
export const ParametersPanel = ({ attributeDisplayForms, loadingAttributeDisplayForms, enableClientIdParameter, enableDataProductIdParameter, enableWidgetIdParameter, onAdd, intl, }) => (React.createElement("div", null,
    React.createElement("label", { className: "gd-label" },
        React.createElement(FormattedMessage, { id: "configurationPanel.drillIntoUrl.editor.parametersPanelLabel" }),
        React.createElement(BubbleHoverTrigger, { className: "gd-list-item-tooltip", showDelay: 0, hideDelay: 0 },
            React.createElement("span", { className: "gd-icon-circle-question gd-list-item-tooltip-icon" }),
            React.createElement(Bubble, { className: "bubble-primary", alignPoints: [{ align: "cr cl" }] },
                React.createElement(FormattedMessage, { id: "configurationPanel.drillIntoUrl.editor.parametersPanelTooltip" })))),
    React.createElement("div", { className: "gd-drill-to-url-parameters gd-drill-to-url-list" },
        React.createElement(InsightParametersSection, { attributeDisplayForms: attributeDisplayForms, loadingAttributeDisplayForms: loadingAttributeDisplayForms, onAdd: onAdd, intl: intl }),
        React.createElement(IdentifierParametersSection, { enableClientIdParameter: enableClientIdParameter, enableDataProductIdParameter: enableDataProductIdParameter, enableWidgetIdParameter: enableWidgetIdParameter, onAdd: onAdd, intl: intl }))));
//# sourceMappingURL=CustomUrlEditorParameters.js.map