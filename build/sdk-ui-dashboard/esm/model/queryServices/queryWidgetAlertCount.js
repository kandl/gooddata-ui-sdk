// (C) 2021-2022 GoodData Corporation
import { objRefToString, isKpiWidget } from "@gooddata/sdk-model";
import { select, call } from "redux-saga/effects";
import { invalidQueryArguments } from "../events/general.js";
import { selectWidgetByRef } from "../store/layout/layoutSelectors.js";
import { createQueryService } from "../store/_infra/queryService.js";
import { isTemporaryIdentity } from "../utils/dashboardItemUtils.js";
export const QueryWidgetAlertCountService = createQueryService("GDC.DASH/QUERY.WIDGET.ALERT_COUNT", queryService);
function* queryService(ctx, query) {
    const { payload: { widgetRef }, correlationId, } = query;
    const widget = yield select(selectWidgetByRef(widgetRef));
    if (!widget) {
        throw invalidQueryArguments(ctx, `Widget with ref ${objRefToString(widgetRef)} does not exist on the dashboard`, correlationId);
    }
    // just added KPIs with temporary identity cannot have alerts, do not try to load their count, it will fail
    if (!isKpiWidget(widget) || isTemporaryIdentity(widget)) {
        return 0;
    }
    const resultLoader = ctx.backend.workspace(ctx.workspace).dashboards();
    const [result] = yield call([resultLoader, resultLoader.getWidgetAlertsCountForWidgets], [widgetRef]);
    return result.alertCount;
}
//# sourceMappingURL=queryWidgetAlertCount.js.map