import { uriRef } from "@gooddata/sdk-model";
import { convertFilterContext } from "./filterContext.js";
export const convertAlert = (alert, filterContext) => {
    const { kpiAlert: { content: { dashboard, isTriggered, kpi, threshold, whenTriggered }, meta: { uri, identifier, title, summary }, }, } = alert;
    return Object.assign(Object.assign({ title, description: summary }, (uri
        ? {
            ref: uriRef(uri),
            identifier,
            uri,
        }
        : {})), { dashboard: uriRef(dashboard), widget: uriRef(kpi), threshold,
        whenTriggered,
        isTriggered, filterContext: filterContext && convertFilterContext(filterContext) });
};
//# sourceMappingURL=alerts.js.map