// (C) 2022-2023 GoodData Corporation
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IntlWrapper } from "@gooddata/sdk-ui";
import { EmbedInsightDialogBase, Overlay, getDefaultEmbedTypeOptions, getHeightWithUnitsForEmbedCode, } from "@gooddata/sdk-ui-kit";
import { FullVisualizationCatalog } from "../../VisualizationCatalog";
import { insightViewCodeGenerator } from "../../../utils/embeddingInsightViewCodeGenerator/insightViewCodeGenerator";
import { getWebComponentsCodeGenerator } from "../../../utils/embeddingCodeGenerator/getWebComponentsCodeGenerator";
const INSIGHT_VIEW_PROPERTIES_LINK = "https://sdk.gooddata.com/gooddata-ui/docs/visualization_component.html#properties";
/**
 * @internal
 */
export const EmbedInsightDialog = (props) => {
    const { locale, openSaveInsightDialog, onClose, onCopyCode, showWebComponentsTab } = props;
    const { code, documentationLink, integrationDocLink, currentTab, codeOption, onTabChange, onOptionsChange, } = useEmbedInsightDialog(props);
    return (React.createElement(IntlWrapper, { locale: locale },
        React.createElement(ModalOverlay, null,
            React.createElement(EmbedInsightDialogBase, { code: code, propertiesLink: documentationLink, showWebComponentsTab: showWebComponentsTab, integrationDocLink: integrationDocLink, openSaveInsightDialog: openSaveInsightDialog, onClose: onClose, onCopyCode: onCopyCode, embedTab: currentTab, onTabChange: onTabChange, embedTypeOptions: codeOption, onOptionsChange: onOptionsChange }))));
};
const useEmbedInsightDialog = (props) => {
    const { insight, backend, settings, colorPalette, executionConfig, reactIntegrationDocLink, webComponentIntegrationDocLink, workspaceId, } = props;
    const [currentTab, setCurrentTab] = useState("react");
    const [codeOption, setCodeOption] = useState(getDefaultEmbedTypeOptions(currentTab));
    useEffect(() => {
        setCodeOption(getDefaultEmbedTypeOptions(currentTab));
    }, [currentTab]);
    const code = useMemo(() => {
        const isReactDefinitionCode = codeOption.type === "react" && codeOption.componentType === "definition";
        if (!insight.insight.identifier && !isReactDefinitionCode) {
            return null;
        }
        const inputBase = {
            insight,
            settings,
            backend,
            colorPalette,
            executionConfig,
            workspaceId,
        };
        return codeOption.type === "react"
            ? generateCodeByReact(Object.assign(Object.assign({}, inputBase), { codeOption: codeOption }))
            : generateCodeByWebComponents(Object.assign(Object.assign({}, inputBase), { codeOption }));
    }, [codeOption, insight, settings, backend, colorPalette, executionConfig, workspaceId]);
    const documentationLink = useMemo(() => {
        if (codeOption.type === "react") {
            return getLinkToPropertiesDocumentation(codeOption.componentType, insight);
        }
        return getLinkToPropertiesDocumentation("definition", insight);
    }, [insight, codeOption]);
    const integrationDocLink = useMemo(() => {
        return currentTab === "react" ? reactIntegrationDocLink : webComponentIntegrationDocLink;
    }, [currentTab, reactIntegrationDocLink, webComponentIntegrationDocLink]);
    const onTabChange = useCallback((selectedTab) => {
        setCurrentTab(selectedTab);
    }, []);
    const onOptionsChange = useCallback((opt) => setCodeOption(opt), []);
    return {
        code,
        documentationLink,
        integrationDocLink,
        currentTab,
        codeOption,
        onTabChange,
        onOptionsChange,
    };
};
const getLinkToPropertiesDocumentation = (codeType, insight) => {
    if (codeType === "definition") {
        const meta = FullVisualizationCatalog.forInsight(insight).getMeta();
        if (meta === null || meta === void 0 ? void 0 : meta.documentationUrl) {
            return `${meta === null || meta === void 0 ? void 0 : meta.documentationUrl}#properties`;
        }
    }
    return INSIGHT_VIEW_PROPERTIES_LINK;
};
const generateCodeByReact = (input) => {
    var _a;
    const { backend, codeOption, colorPalette, executionConfig, insight, settings } = input;
    const height = getHeightWithUnitsForEmbedCode(codeOption);
    const generateCodeConfig = {
        context: {
            settings,
            backend,
            colorPalette,
            executionConfig,
        },
        language: codeOption.codeType,
        height,
        omitChartProps: codeOption.displayConfiguration ? [] : ["config"],
    };
    if (codeOption.componentType === "definition") {
        const descriptor = FullVisualizationCatalog.forInsight(insight);
        return (_a = descriptor.getEmbeddingCode) === null || _a === void 0 ? void 0 : _a.call(descriptor, insight, generateCodeConfig);
    }
    return insightViewCodeGenerator(insight, generateCodeConfig);
};
const generateCodeByWebComponents = (input) => {
    const { codeOption, insight, workspaceId } = input;
    const height = getHeightWithUnitsForEmbedCode(codeOption);
    return getWebComponentsCodeGenerator(workspaceId, insight, Object.assign(Object.assign({}, codeOption), { height }));
};
const BUBBLE_ALIGN_POINTS = [{ align: "cc cc" }];
const ModalOverlay = (props) => {
    const { children } = props;
    return (React.createElement(Overlay, { alignPoints: BUBBLE_ALIGN_POINTS, isModal: true, positionType: "fixed" }, children));
};
//# sourceMappingURL=EmbedInsightDialog.js.map