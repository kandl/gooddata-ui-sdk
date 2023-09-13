// (C) 2022-2023 GoodData Corporation
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { widgetRef } from "@gooddata/sdk-model";
import { ScrollablePanel, Typography } from "@gooddata/sdk-ui-kit";
import { AttributeFilterConfiguration } from "../../common/index.js";
import { KpiComparison } from "./KpiComparison/KpiComparison.js";
import { KpiWidgetDateDatasetFilter } from "./KpiWidgetDateDatasetFilter.js";
import { KpiMetricDropdown } from "./KpiMetricDropdown/KpiMetricDropdown.js";
import { KpiConfigurationPanelHeader } from "./KpiConfigurationPanelHeader.js";
import { KpiConfigurationMessages } from "./KpiConfigurationMessages.js";
import { KpiDrillConfiguration } from "./KpiDrill/KpiDrillConfiguration.js";
import { safeSerializeObjRef } from "../../../../_staging/metadata/safeSerializeObjRef.js";
import { changeKpiWidgetConfiguration, changeKpiWidgetDescription, queryWidgetAlertCount, selectCatalogMeasures, selectHideKpiDrillInEmbedded, selectIsEmbedded, selectSettings, useDashboardDispatch, useDashboardQueryProcessing, useDashboardSelector, } from "../../../../model/index.js";
import { KpiDescriptionConfig } from "./KpiDescriptionConfig.js";
export const KpiConfigurationPanelCore = (props) => {
    var _a;
    const { widget, onMeasureChange, onClose } = props;
    const ref = widget && widgetRef(widget);
    const metric = widget === null || widget === void 0 ? void 0 : widget.kpi.metric;
    const { run: runAlertNumberQuery, result: numberOfAlerts, status, } = useDashboardQueryProcessing({
        queryCreator: queryWidgetAlertCount,
    });
    useEffect(() => {
        if (ref) {
            runAlertNumberQuery(ref);
        }
    }, [safeSerializeObjRef(ref)]);
    const isNumOfAlertsLoaded = status === "success";
    const configurationCategoryClasses = cx("configuration-category", {
        "s-widget-alerts-information-loaded": isNumOfAlertsLoaded,
    });
    const scrollablePanelClasses = cx("configuration-panel", "configuration-panel-kpi", "s-configuration-scrollable-panel");
    const sectionHeaderClasses = cx({ "is-disabled": !metric });
    const defaultDescriptionConfig = {
        source: "metric",
        visible: true,
    };
    const settings = useDashboardSelector(selectSettings);
    const measures = useDashboardSelector(selectCatalogMeasures);
    const isEmbedded = useDashboardSelector(selectIsEmbedded);
    const hideKpiDrillInEmbedded = useDashboardSelector(selectHideKpiDrillInEmbedded);
    const dispatch = useDashboardDispatch();
    return (React.createElement(React.Fragment, null,
        React.createElement(KpiConfigurationPanelHeader, { onCloseButtonClick: onClose }),
        React.createElement(ScrollablePanel, { className: scrollablePanelClasses },
            React.createElement("div", { className: configurationCategoryClasses },
                React.createElement(KpiConfigurationMessages, { numberOfAlerts: numberOfAlerts }),
                React.createElement(Typography, { tagName: "h3" },
                    React.createElement(FormattedMessage, { id: "configurationPanel.measure" })),
                React.createElement(KpiMetricDropdown, { widget: widget, onMeasureChange: onMeasureChange }),
                !!widget && (React.createElement(KpiDescriptionConfig, { kpi: widget, metrics: measures, isKpiDescriptionEnabled: settings.enableDescriptions || false, descriptionConfig: ((_a = widget.configuration) === null || _a === void 0 ? void 0 : _a.description) || defaultDescriptionConfig, setDescriptionConfiguration: (kpi, config) => {
                        dispatch(changeKpiWidgetConfiguration(kpi.ref, Object.assign(Object.assign({}, kpi.configuration), { description: config })));
                    }, setKpiDescription: (kpi, description) => {
                        dispatch(changeKpiWidgetDescription(kpi.ref, {
                            description,
                        }));
                    } })),
                React.createElement(Typography, { tagName: "h3", className: sectionHeaderClasses },
                    React.createElement(FormattedMessage, { id: "configurationPanel.filterBy" })),
                !!widget && (React.createElement(React.Fragment, null,
                    React.createElement(KpiWidgetDateDatasetFilter, { widget: widget }),
                    React.createElement(AttributeFilterConfiguration, { widget: widget }))),
                React.createElement(Typography, { tagName: "h3", className: sectionHeaderClasses },
                    React.createElement(FormattedMessage, { id: "configurationPanel.comparison" })),
                !!widget && React.createElement(KpiComparison, { widget: widget }),
                isEmbedded && hideKpiDrillInEmbedded ? null : (React.createElement(React.Fragment, null,
                    React.createElement(Typography, { tagName: "h3", className: sectionHeaderClasses },
                        React.createElement(FormattedMessage, { id: "configurationPanel.drillIntoDashboard" })),
                    !!widget && React.createElement(KpiDrillConfiguration, { widget: widget })))))));
};
//# sourceMappingURL=KpiConfigurationPanelCore.js.map