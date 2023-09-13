// (C) 2022 GoodData Corporation
import React from "react";
import { defineMessage, FormattedMessage } from "react-intl";
import { createSelector } from "@reduxjs/toolkit";
import { Message } from "@gooddata/sdk-ui-kit";
import { selectDateFilterConfigValidationWarnings, selectEnableRenamingProjectToWorkspace, selectIsInEditMode, selectIsNewDashboard, useDashboardSelector, } from "../../../model/index.js";
const workspaceValidationMessagesMapping = {
    ConflictingIdentifiers: defineMessage({ id: "filters.config.warning.conflictingIdentifiers" }),
    NO_CONFIG: defineMessage({ id: "filters.config.warning.workspace.notAvailable" }),
    NoVisibleOptions: defineMessage({ id: "filters.config.warning.allOptionsHidden" }),
    SelectedOptionInvalid: defineMessage({ id: "filters.config.warning.selectedFilterNotValid" }),
    TOO_MANY_CONFIGS: defineMessage({ id: "filters.config.warning.multipleWorkspacesConfigs" }),
};
const projectValidationMessagesMapping = Object.assign(Object.assign({}, workspaceValidationMessagesMapping), { NO_CONFIG: defineMessage({ id: "filters.config.warning.notAvailable" }), TOO_MANY_CONFIGS: defineMessage({ id: "filters.config.warning.multipleProjectConfigs" }) });
// Some warnings make sense only when creating a new dashboard, for existing dashboards they are irrelevant
// because existing dashboard just has some option selected anyway.
const validationsRelevantToNewDashboardOnly = new Set([
    "NoVisibleOptions",
    "SelectedOptionInvalid",
]);
const selectRelevantWarnings = createSelector(selectDateFilterConfigValidationWarnings, selectIsNewDashboard, (warnings, isNew) => {
    return isNew
        ? warnings
        : warnings.filter((warning) => !validationsRelevantToNewDashboardOnly.has(warning));
});
export const DateFilterConfigWarnings = () => {
    const isInEditMode = useDashboardSelector(selectIsInEditMode);
    const warnings = useDashboardSelector(selectRelevantWarnings);
    const enableRenamingProjectToWorkspace = useDashboardSelector(selectEnableRenamingProjectToWorkspace);
    const effectiveMapping = enableRenamingProjectToWorkspace
        ? workspaceValidationMessagesMapping
        : projectValidationMessagesMapping;
    return isInEditMode && warnings.length > 0 ? (React.createElement(Message, { type: "warning", contrast: true, className: "gd-date-filter-config-warning-message" },
        React.createElement("ul", { className: "gd-date-filter-config-warning-message-items" }, warnings.map((warning) => {
            const message = effectiveMapping[warning];
            if (message) {
                return (React.createElement("li", { key: warning },
                    React.createElement(FormattedMessage, { id: message.id })));
            }
            return null;
        })))) : null;
};
//# sourceMappingURL=DateFilterConfigWarnings.js.map