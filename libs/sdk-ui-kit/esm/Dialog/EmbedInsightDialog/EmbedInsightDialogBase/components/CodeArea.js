import { __rest } from "tslib";
// (C) 2022-2023 GoodData Corporation
import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { dialogEmptyInsightMessageLabels } from "../../../../locales.js";
/**
 * @internal
 */
export const CodeArea = (props) => {
    const { code, onCopyCode } = props;
    const onAreaCopyCode = useCallback(() => {
        onCopyCode(code);
    }, [code, onCopyCode]);
    return (React.createElement("div", { className: "embed-insight-dialog-code-content" },
        React.createElement("textarea", { className: "embed-insight-dialog-code-area s-code-content", readOnly: true, value: code, onCopy: onAreaCopyCode })));
};
/**
 * @internal
 */
export const CodeAreaDisableMessage = (props) => {
    const { componentType, embedType, openSaveInsightDialog } = props;
    const getEmptyMessage = useCallback(() => {
        const isDefinitionMsg = embedType === "react" && componentType === "definition";
        return (React.createElement(FormattedMessage, { id: dialogEmptyInsightMessageLabels[isDefinitionMsg ? "definition" : "reference"].id, values: {
                a: (chunk) => {
                    return React.createElement("a", { onClick: openSaveInsightDialog }, chunk);
                },
            } }));
    }, [embedType, componentType, openSaveInsightDialog]);
    return (React.createElement("div", { className: `embed-insight-dialog-code-empty ${componentType}` },
        React.createElement("div", { className: "embed-insight-dialog-code-empty-msg" }, getEmptyMessage())));
};
/**
 * @internal
 */
export const EmbedInsightCodeArea = (props) => {
    const { code, onCopyCode } = props, restProps = __rest(props, ["code", "onCopyCode"]);
    return code ? (React.createElement(CodeArea, { code: code, onCopyCode: onCopyCode })) : (React.createElement(CodeAreaDisableMessage, Object.assign({}, restProps)));
};
//# sourceMappingURL=CodeArea.js.map