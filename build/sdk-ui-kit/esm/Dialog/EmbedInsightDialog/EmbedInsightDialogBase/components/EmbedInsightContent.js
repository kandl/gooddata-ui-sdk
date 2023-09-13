// (C) 2022-2023 GoodData Corporation
import React, { useMemo } from "react";
import { EmbedInsightCodeArea } from "./CodeArea.js";
import { PrepareEnvMessage } from "./PrepareEnvMessage.js";
import { ReactOptions } from "./ReactOptions.js";
import { WebComponentsOptions } from "./WebComponentsOptions.js";
/**
 * @internal
 */
export const EmbedInsightContent = (props) => {
    const { integrationDocLink, embedTypeOptions, code, openSaveInsightDialog, onCopyCode, onOptionsChange } = props;
    const renderEmbedOptions = useMemo(() => {
        return embedTypeOptions.type === "react" ? (React.createElement(ReactOptions, { option: embedTypeOptions, onChange: onOptionsChange })) : (React.createElement(WebComponentsOptions, { option: embedTypeOptions, onChange: onOptionsChange }));
    }, [embedTypeOptions, onOptionsChange]);
    return (React.createElement("div", { className: "embed-insight-dialog-content" },
        React.createElement(PrepareEnvMessage, { integrationDocLink: integrationDocLink }),
        React.createElement("div", { className: "embed-insight-dialog-code" },
            React.createElement("div", { className: "embed-insight-dialog-code-settings" }, renderEmbedOptions),
            React.createElement("div", { className: "embed-insight-dialog-code-wrapper" },
                React.createElement(EmbedInsightCodeArea, { code: code, componentType: embedTypeOptions === null || embedTypeOptions === void 0 ? void 0 : embedTypeOptions.componentType, onCopyCode: onCopyCode, embedType: embedTypeOptions.type, openSaveInsightDialog: openSaveInsightDialog })))));
};
//# sourceMappingURL=EmbedInsightContent.js.map