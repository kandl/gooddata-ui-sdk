import { __rest } from "tslib";
// (C) 2021-2022 GoodData Corporation
import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { useDashboardSelector, selectCatalogDateDatasets, } from "../../../../model/index.js";
import { enrichBrokenAlertsInfo, KpiAlertDialog } from "./KpiAlerts/index.js";
import { useBrokenAlertFiltersMeta } from "./useBrokenAlertFiltersMeta.js";
export const KpiAlertDialogWrapper = (props) => {
    const { brokenAlertFiltersBasicInfo, backend, workspace } = props, restProps = __rest(props, ["brokenAlertFiltersBasicInfo", "backend", "workspace"]);
    const intl = useIntl();
    const dateDatasets = useDashboardSelector(selectCatalogDateDatasets);
    const { result: brokenAlertFiltersMeta, status } = useBrokenAlertFiltersMeta({
        dateDatasets,
        backend,
        workspace,
        brokenAlertFilters: brokenAlertFiltersBasicInfo,
    });
    const brokenAlertFilters = useMemo(() => {
        if (!brokenAlertFiltersMeta) {
            return null;
        }
        return enrichBrokenAlertsInfo(brokenAlertFiltersBasicInfo, intl, restProps.dateFormat, brokenAlertFiltersMeta.dateDatasets, brokenAlertFiltersMeta.attributeFiltersMeta);
    }, [brokenAlertFiltersBasicInfo, brokenAlertFiltersMeta, intl, restProps.dateFormat]);
    return (React.createElement(KpiAlertDialog, Object.assign({}, restProps, { isAlertDialogOpening: status === "loading", brokenAlertFilters: brokenAlertFilters })));
};
//# sourceMappingURL=KpiAlertDialogWrapper.js.map