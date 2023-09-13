// (C) 2019-2022 GoodData Corporation
import { isKpiDashboardAttachment, isVisualizationWidgetAttachment, } from "@gooddata/api-model-bear";
import { uriRef, } from "@gooddata/sdk-model";
import compact from "lodash/compact.js";
export const convertScheduledMailAttachment = (scheduledMailAttachment) => {
    if (isKpiDashboardAttachment(scheduledMailAttachment)) {
        const { kpiDashboardAttachment: { format, uri, filterContext }, } = scheduledMailAttachment;
        return {
            dashboard: uriRef(uri),
            format,
            filterContext: filterContext ? uriRef(filterContext) : undefined,
        };
    }
    else if (isVisualizationWidgetAttachment(scheduledMailAttachment)) {
        const { visualizationWidgetAttachment: { uri, dashboardUri, formats, filterContext, exportOptions }, } = scheduledMailAttachment;
        const convertedExportOptions = exportOptions
            ? {
                exportOptions: {
                    includeFilters: exportOptions.includeFilterContext === "yes",
                    mergeHeaders: exportOptions.mergeHeaders === "yes",
                },
            }
            : {};
        return Object.assign({ widgetDashboard: uriRef(dashboardUri), widget: uriRef(uri), formats, filterContext: filterContext ? uriRef(filterContext) : undefined }, convertedExportOptions);
    }
    else {
        return undefined;
    }
};
/**
 * @internal
 */
export const convertScheduledMail = (scheduledMail, userMap) => {
    const { scheduledMail: { content: { attachments, body, subject, to, when, bcc, lastSuccessfull, unsubscribed }, meta: { uri, identifier, title, summary, unlisted, author, contributor }, }, } = scheduledMail;
    const convertedAttachments = compact(attachments.map(convertScheduledMailAttachment));
    return Object.assign(Object.assign({ title, description: summary }, (uri
        ? {
            ref: uriRef(uri),
            identifier,
            uri,
        }
        : {})), { body,
        subject,
        to, when: {
            startDate: when.startDate,
            endDate: when.endDate,
            timeZone: when.timeZone,
            recurrence: when.recurrency,
        }, bcc, lastSuccessful: lastSuccessfull, unsubscribed, attachments: convertedAttachments, unlisted: !!unlisted, createdBy: author ? userMap === null || userMap === void 0 ? void 0 : userMap.get(author) : undefined, updatedBy: contributor ? userMap === null || userMap === void 0 ? void 0 : userMap.get(contributor) : undefined });
};
//# sourceMappingURL=scheduledMails.js.map