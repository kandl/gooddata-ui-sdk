// (C) 2020-2022 GoodData Corporation
import React from "react";
import { ParameterDetail } from "./ParameterDetail.js";
import { useIntl } from "react-intl";
import { selectDashboardId, useDashboardSelector } from "../../../../../model/index.js";
export const DashboardIdParameterDetail = ({ title }) => {
    const value = useDashboardSelector(selectDashboardId);
    const intl = useIntl();
    return (React.createElement(ParameterDetail, { title: title, typeName: intl.formatMessage({
            id: "configurationPanel.drillIntoUrl.editor.identifierTypeLabel",
        }), useEllipsis: false, values: value ? [value] : [] }));
};
//# sourceMappingURL=DashboardIdParameterDetail.js.map