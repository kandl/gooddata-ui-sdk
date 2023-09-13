// (C) 2020-2022 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import { ParameterDetail } from "./ParameterDetail.js";
import { selectSelectedWidgetRef, selectWidgetByRef, useDashboardSelector, isTemporaryIdentity, } from "../../../../../model/index.js";
import { isInsightWidget } from "@gooddata/sdk-model";
export const WidgetIdParameterDetail = ({ title }) => {
    const intl = useIntl();
    const widgetRef = useDashboardSelector(selectSelectedWidgetRef);
    const widget = useDashboardSelector(selectWidgetByRef(widgetRef));
    let values = [];
    if (isInsightWidget(widget) && !isTemporaryIdentity(widget)) {
        values = [widget.identifier];
    }
    return (React.createElement(ParameterDetail, { title: title, typeName: intl.formatMessage({
            id: "configurationPanel.drillIntoUrl.editor.identifierTypeLabel",
        }), useEllipsis: false, values: values }));
};
//# sourceMappingURL=WidgetIdParameterDetail.js.map