// (C) 2022 GoodData Corporation
import React, { useState, useMemo, useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Typography, Dropdown, DropdownList, SingleSelectListItem, DropdownButton, } from "@gooddata/sdk-ui-kit";
import { areObjRefsEqual, } from "@gooddata/sdk-model";
import { InsightDescription } from "../../insight/configuration/InsightDescriptionConfig/InsightDescription.js";
const getKpiMetricDescription = (metrics, ref) => {
    var _a;
    return (_a = metrics.find((metric) => areObjRefsEqual(metric.measure.ref, ref))) === null || _a === void 0 ? void 0 : _a.measure.description;
};
const getStateFromConfig = (descriptionConfig, kpiDescription, metricDescription) => {
    if (!descriptionConfig.visible) {
        return {
            config: "none",
            description: "",
        };
    }
    const useMetricDescription = descriptionConfig.source === "metric";
    return {
        config: descriptionConfig.source,
        description: useMetricDescription ? metricDescription : kpiDescription,
    };
};
export function KpiDescriptionConfig(props) {
    var _a, _b;
    const { descriptionConfig, kpi, metrics, setDescriptionConfiguration, isKpiDescriptionEnabled, setKpiDescription, } = props;
    const intl = useIntl();
    const dropdownItems = useMemo(() => [
        {
            id: "metric",
            title: intl.formatMessage({ id: "configurationPanel.visualprops.inheritDescription" }),
            info: intl.formatMessage({ id: "configurationPanel.visualprops.inheritKpiDescriptionHelp" }),
        },
        {
            id: "kpi",
            title: intl.formatMessage({ id: "configurationPanel.visualprops.customDescription" }),
            info: intl.formatMessage({ id: "configurationPanel.visualprops.customKpiDescriptionHelp" }),
        },
        {
            id: "none",
            title: intl.formatMessage({ id: "configurationPanel.visualprops.noneDescription" }),
        },
    ], [intl]);
    const metricDescription = (_a = getKpiMetricDescription(metrics, kpi.kpi.metric)) !== null && _a !== void 0 ? _a : "";
    const [kpiDescriptionState, setKpiDescriptionState] = useState(getStateFromConfig(descriptionConfig, kpi.description, metricDescription));
    const [lastCustomKpiDescription, setLastCustomKpiDescription] = useState(kpi.description);
    const handleDescriptionChange = useCallback((newDescription) => {
        setKpiDescription(kpi, newDescription);
        setKpiDescriptionState((prevState) => (Object.assign(Object.assign({}, prevState), { description: newDescription })));
        setLastCustomKpiDescription(newDescription);
    }, [kpi, setKpiDescription, setKpiDescriptionState]);
    const handleDescriptionConfigChange = useCallback((config) => {
        let newConfig;
        if (config === "none") {
            newConfig = {
                visible: false,
                source: "metric",
            };
            setKpiDescriptionState(getStateFromConfig(newConfig, "", ""));
        }
        else {
            newConfig = {
                visible: true,
                source: config,
            };
            setKpiDescriptionState(getStateFromConfig(newConfig, config === "kpi" ? lastCustomKpiDescription : "", metricDescription));
        }
        setDescriptionConfiguration(kpi, newConfig);
        if (config === "kpi") {
            setKpiDescription(kpi, lastCustomKpiDescription !== null && lastCustomKpiDescription !== void 0 ? lastCustomKpiDescription : "");
        }
        if (config === "none" || config === "metric") {
            setKpiDescription(kpi, "");
        }
    }, [kpi, metricDescription, setDescriptionConfiguration, setKpiDescription, lastCustomKpiDescription]);
    return (React.createElement(React.Fragment, null, isKpiDescriptionEnabled ? (React.createElement("div", { className: "configuration-category s-description-configuration description-configuration-section" },
        React.createElement(Typography, { tagName: "h3" },
            React.createElement(FormattedMessage, { id: "configurationPanel.visualprops.sectionDescription" })),
        React.createElement(Dropdown, { closeOnParentScroll: true, renderBody: ({ closeDropdown }) => (React.createElement(DropdownList, { items: dropdownItems, renderItem: ({ item }) => {
                    return (React.createElement(SingleSelectListItem, { title: item.title, info: item.info, isSelected: item.id === kpiDescriptionState.config, onClick: () => {
                            handleDescriptionConfigChange(item.id);
                            closeDropdown();
                        } }));
                } })), renderButton: ({ openDropdown, isOpen }) => {
                var _a;
                return (React.createElement(DropdownButton, { value: (_a = dropdownItems.find((item) => item.id === kpiDescriptionState.config)) === null || _a === void 0 ? void 0 : _a.title, isOpen: isOpen, onClick: openDropdown, className: "description-config-dropdown-button s-description-config-dropdown-button" }));
            } }),
        kpiDescriptionState.config === "kpi" || kpiDescriptionState.config === "metric" ? (React.createElement(InsightDescription, { description: (_b = kpiDescriptionState.description) !== null && _b !== void 0 ? _b : "", setDescription: handleDescriptionChange, readOnly: kpiDescriptionState.config === "metric" })) : null)) : null));
}
//# sourceMappingURL=KpiDescriptionConfig.js.map