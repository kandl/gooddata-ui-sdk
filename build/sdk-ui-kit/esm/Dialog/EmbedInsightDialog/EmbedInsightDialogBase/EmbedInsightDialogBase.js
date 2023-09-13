// (C) 2022-2023 GoodData Corporation
import React, { useCallback } from "react";
import cx from "classnames";
import copy from "copy-to-clipboard";
import { useIntl } from "react-intl";
import { ConfirmDialogBase } from "../../ConfirmDialogBase.js";
import { Tabs } from "../../../Tabs/index.js";
import { dialogEmbedTabLabels, dialogHeadlineLabels } from "../../../locales.js";
import { CompleteListPropsMessage } from "./components/CompleteListPropsMessage.js";
import { EmbedInsightContent } from "./components/EmbedInsightContent.js";
/**
 * @internal
 */
export const EmbedInsightDialogBase = (props) => {
    const { code, propertiesLink, integrationDocLink, embedTab, embedTypeOptions, openSaveInsightDialog, onClose, onCopyCode, onOptionsChange, onTabChange, showWebComponentsTab, } = props;
    const intl = useIntl();
    const onCopyButtonClick = useCallback(() => {
        copy(code);
        onCopyCode(code, "button", embedTab);
    }, [code, onCopyCode, embedTab]);
    const onAreaCopy = useCallback(() => {
        copy(code);
        onCopyCode(code, "keyboard", embedTab);
    }, [code, onCopyCode, embedTab]);
    return (React.createElement(ConfirmDialogBase, { isPositive: true, onClose: onClose, onCancel: onClose, onSubmit: onCopyButtonClick, cancelButtonText: intl.formatMessage({ id: "embedInsightDialog.actions.close" }), submitButtonText: intl.formatMessage({ id: "embedInsightDialog.actions.copyCode" }), isSubmitDisabled: !code, headline: intl.formatMessage({ id: dialogHeadlineLabels.embedInsight.id }), className: cx("embed-insight-dialog", "s-embed-insight-dialog"), dialogHeaderClassName: "embed-insight-dialog-header", footerLeftRenderer: propertiesLink
            ? () => {
                return (React.createElement("div", { className: "embed-insight-dialog-left-footer-renderer" },
                    React.createElement(CompleteListPropsMessage, { documentationLink: propertiesLink })));
            }
            : undefined },
        showWebComponentsTab ? (React.createElement(Tabs, { tabs: getTabIds(), onTabSelect: (tab) => {
                onTabChange(tab.id.includes("react") ? "react" : "webComponents");
            }, selectedTabId: dialogEmbedTabLabels[embedTab].id })) : null,
        React.createElement(EmbedInsightContent, { integrationDocLink: integrationDocLink, code: code, embedTypeOptions: embedTypeOptions, onCopyCode: onAreaCopy, openSaveInsightDialog: openSaveInsightDialog, onOptionsChange: onOptionsChange })));
};
const getTabIds = () => {
    return [{ id: dialogEmbedTabLabels.react.id }, { id: dialogEmbedTabLabels.webComponents.id }];
};
//# sourceMappingURL=EmbedInsightDialogBase.js.map