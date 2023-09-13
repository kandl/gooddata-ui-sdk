// (C) 2020-2022 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import { useDashboardComponentsContext } from "../dashboardContexts/index.js";
export const EmptyDashboardError = () => {
    const intl = useIntl();
    const { ErrorComponent } = useDashboardComponentsContext();
    return (React.createElement(ErrorComponent, { className: "s-layout-error", message: intl.formatMessage({ id: "dashboard.error.empty.heading" }), description: intl.formatMessage({ id: "dashboard.error.empty.text" }) }));
};
//# sourceMappingURL=EmptyDashboardError.js.map