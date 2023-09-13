// (C) 2022 GoodData Corporation
import React, { useState, useMemo, useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Typography, Dropdown, DropdownList, SingleSelectListItem, DropdownButton, } from "@gooddata/sdk-ui-kit";
import { InsightDescription } from "./InsightDescription.js";
import { useDashboardSelector, selectInsightByRef } from "../../../../../model/index.js";
import { IncludeMetrics } from "./IncludeMetrics.js";
const getStateFromConfig = (descriptionConfig, widgetDescription, insightDescription) => {
    var _a;
    if (!descriptionConfig.visible) {
        return {
            config: "none",
            description: "",
            includeMetrics: false,
        };
    }
    const useInsightDescription = descriptionConfig.source === "insight";
    return {
        config: descriptionConfig.source,
        description: useInsightDescription ? insightDescription : widgetDescription,
        includeMetrics: (_a = descriptionConfig.includeMetrics) !== null && _a !== void 0 ? _a : false,
    };
};
export function InsightDescriptionConfig(props) {
    var _a, _b;
    const { descriptionConfig, widget, setDescriptionConfiguration, isWidgetDescriptionEnabled, setWidgetDescription, } = props;
    const intl = useIntl();
    const dropdownItems = useMemo(() => [
        {
            id: "insight",
            title: intl.formatMessage({ id: "configurationPanel.visualprops.inheritDescription" }),
            info: intl.formatMessage({ id: "configurationPanel.visualprops.inheritDescriptionHelp" }),
        },
        {
            id: "widget",
            title: intl.formatMessage({ id: "configurationPanel.visualprops.customDescription" }),
            info: intl.formatMessage({ id: "configurationPanel.visualprops.customDescriptionHelp" }),
        },
        {
            id: "none",
            title: intl.formatMessage({ id: "configurationPanel.visualprops.noneDescription" }),
        },
    ], [intl]);
    const insight = useDashboardSelector(selectInsightByRef(widget.insight));
    const [widgetDescriptionState, setWidgetDescriptionState] = useState(getStateFromConfig(descriptionConfig, widget.description, (_a = insight === null || insight === void 0 ? void 0 : insight.insight) === null || _a === void 0 ? void 0 : _a.summary));
    const [lastCustomWidgetDescription, setLastCustomWidgetDescription] = useState(widget.description);
    const handleDescriptionChange = useCallback((newDescription) => {
        setWidgetDescription(widget, newDescription);
        setWidgetDescriptionState((prevState) => (Object.assign(Object.assign({}, prevState), { description: newDescription })));
        setLastCustomWidgetDescription(newDescription);
    }, [widget, setWidgetDescription, setWidgetDescriptionState]);
    const handleDescriptionConfigChange = useCallback((config) => {
        var _a;
        let newConfig;
        const insightDescription = (_a = insight === null || insight === void 0 ? void 0 : insight.insight) === null || _a === void 0 ? void 0 : _a.summary;
        if (config === "none") {
            newConfig = {
                includeMetrics: false,
                visible: false,
                source: "insight",
            };
            setWidgetDescriptionState(getStateFromConfig(newConfig, "", ""));
        }
        else {
            newConfig = {
                includeMetrics: widgetDescriptionState.includeMetrics,
                visible: true,
                source: config,
            };
            setWidgetDescriptionState(getStateFromConfig(newConfig, config === "widget" ? lastCustomWidgetDescription : "", insightDescription));
        }
        setDescriptionConfiguration(widget, newConfig);
        if (config === "widget") {
            setWidgetDescription(widget, lastCustomWidgetDescription !== null && lastCustomWidgetDescription !== void 0 ? lastCustomWidgetDescription : "");
        }
        if (config === "none" || config === "insight") {
            setWidgetDescription(widget, "");
        }
    }, [
        widget,
        insight,
        setDescriptionConfiguration,
        setWidgetDescription,
        widgetDescriptionState.includeMetrics,
        lastCustomWidgetDescription,
    ]);
    const handleIncludeMetricChange = useCallback((includeMetrics) => {
        const newConfigState = Object.assign(Object.assign({}, widgetDescriptionState), { includeMetrics });
        setWidgetDescriptionState(newConfigState);
        setDescriptionConfiguration(widget, Object.assign(Object.assign({}, descriptionConfig), { includeMetrics }));
    }, [descriptionConfig, setDescriptionConfiguration, widget, widgetDescriptionState]);
    return (React.createElement(React.Fragment, null, isWidgetDescriptionEnabled ? (React.createElement("div", { className: "configuration-category s-description-configuration description-configuration-section" },
        React.createElement(Typography, { tagName: "h3" },
            React.createElement(FormattedMessage, { id: "configurationPanel.visualprops.sectionDescription" })),
        React.createElement(Dropdown, { closeOnParentScroll: true, renderBody: ({ closeDropdown }) => (React.createElement(DropdownList, { items: dropdownItems, renderItem: ({ item }) => {
                    return (React.createElement(SingleSelectListItem, { title: item.title, info: item.info, isSelected: item.id === widgetDescriptionState.config, onClick: () => {
                            handleDescriptionConfigChange(item.id);
                            closeDropdown();
                        } }));
                } })), renderButton: ({ openDropdown, isOpen }) => {
                var _a;
                return (React.createElement(DropdownButton, { value: (_a = dropdownItems.find((item) => item.id === widgetDescriptionState.config)) === null || _a === void 0 ? void 0 : _a.title, isOpen: isOpen, onClick: openDropdown, className: "description-config-dropdown-button s-description-config-dropdown-button" }));
            } }),
        widgetDescriptionState.config === "widget" ||
            widgetDescriptionState.config === "insight" ? (React.createElement(InsightDescription, { description: (_b = widgetDescriptionState.description) !== null && _b !== void 0 ? _b : "", setDescription: handleDescriptionChange, readOnly: widgetDescriptionState.config === "insight" })) : null,
        // TODO INE: enable this section as part of TNT-1134
        // eslint-disable-next-line no-constant-condition, sonarjs/no-redundant-boolean
        false && widgetDescriptionState.config !== "none" ? (React.createElement(IncludeMetrics, { onChange: handleIncludeMetricChange, value: widgetDescriptionState.includeMetrics })) : null)) : null));
}
//# sourceMappingURL=InsightDescriptionConfig.js.map