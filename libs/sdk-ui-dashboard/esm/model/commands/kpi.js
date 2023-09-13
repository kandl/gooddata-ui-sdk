// (C) 2021-2023 GoodData Corporation
import { isObjRef, } from "@gooddata/sdk-model";
/**
 * Creates the ChangeKpiWidgetHeader command. Dispatching this command will result in change of the KPI widget's
 * header which (now) includes title.
 *
 * @param ref - reference of the KPI widget to modify
 * @param header - new header to use
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function changeKpiWidgetHeader(ref, header, correlationId) {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_HEADER",
        correlationId,
        payload: {
            ref,
            header,
        },
    };
}
/**
 * Creates the ChangeKpiWidgetDescription command. Dispatching this command will result in change of the Kpi widget's
 * description.
 *
 * @param ref - reference of the kpi widget to modify
 * @param description - new description to use
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function changeKpiWidgetDescription(ref, description, correlationId) {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_DESCRIPTION",
        correlationId,
        payload: {
            ref,
            description,
        },
    };
}
/**
 *
 * Creates the ChangeKpiWidgetConfiguration command. Dispatching this command will result is modification
 * of the configuration that are effective for the particular kpi widget.
 *
 * Through configuration, you can modify how is particular kpi rendered
 *
 * If you want to clear any widget-level configuration, set config to `undefined`.
 *
 * @param ref - reference of the insight widget to modify
 * @param config - new configuration to set, undefined to clear any widget level  config
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function changeKpiWidgetConfiguration(ref, config, correlationId) {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_CONFIGURATION",
        correlationId,
        payload: {
            ref,
            config,
        },
    };
}
/**
 * Creates the ChangeKpiWidgetMeasure command. Dispatching this command will result in change of the measure
 * used by the KPI.
 *
 * @param ref - reference of the KPI widget to modify
 * @param measureRef - reference of the measure to use
 * @param header - specify new header to use; if not provided the existing header will be reused
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function changeKpiWidgetMeasure(ref, measureRef, header, correlationId) {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_MEASURE",
        correlationId,
        payload: {
            ref,
            measureRef,
            header,
        },
    };
}
/**
 * Creates the ChangeKpiWidgetFilterSettings command. Dispatching this command will result in change of KPI widget's
 * filter settings; this includes change of data set used for date filter, disabling date filtering, ignoring
 * attribute filters that are defined on the dashboard for the widget.
 *
 * @param ref - reference of the KPI widget to modify
 * @param settings - new filter settings to apply
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function replaceKpiWidgetFilterSettings(ref, settings, correlationId) {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS",
        correlationId,
        payload: {
            ref,
            operation: Object.assign({ type: "replace" }, settings),
        },
    };
}
/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpEnableDateFilter} operation.
 *
 * Dispatching this command will result in change of KPI widget's date filter setting. The date filtering will
 * be enabled and the provided date data set will be used for date-filtering widget's KPI.
 *
 * @param ref - reference of the KPI widget to modify
 * @param dateDataset - date data set to use for filtering the insight, if "default" is provided, the default date dataset will be resolved and used
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function enableKpiWidgetDateFilter(ref, dateDataset, correlationId) {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS",
        correlationId,
        payload: {
            ref,
            operation: {
                type: "enableDateFilter",
                dateDataset,
            },
        },
    };
}
/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpDisableDateFilter} operation.
 *
 * Dispatching this command will result in change of KPI widget's date filter setting. The date filtering will
 * be disabled.
 *
 * @param ref - reference of the KPI widget to modify
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function disableKpiWidgetDateFilter(ref, correlationId) {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS",
        correlationId,
        payload: {
            ref,
            operation: {
                type: "disableDateFilter",
            },
        },
    };
}
/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpReplaceAttributeIgnores} operation.
 *
 * Dispatching this command will result in replacement of KPI widget's attribute filter ignore-list. Those attribute filters
 * that use the provided displayForms for filtering will be ignored by the widget.
 *
 * @param ref - reference of the KPI widget to modify
 * @param displayForms - refs of display forms used by attribute filters that should be ignored
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function replaceKpiWidgetIgnoredFilters(ref, displayForms, correlationId) {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS",
        correlationId,
        payload: {
            ref,
            operation: {
                type: "replaceAttributeIgnores",
                displayFormRefs: displayForms !== null && displayForms !== void 0 ? displayForms : [],
            },
        },
    };
}
/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpIgnoreAttributeFilter} operation.
 *
 * Dispatching this command will result in addition of one or more filters into KPI widget's attribute filter ignore-list.
 * Those attribute filters that use the provided displayForms for filtering will be ignored by the widget on top of any
 * other filters that are already ignored.
 *
 * Ignored attribute filters are not passed down to the KPI and will not be used to filter that KPI.
 *
 * The operation is idempotent - trying to ignore an attribute filter multiple times will have no effect.
 *
 * @param ref - reference of the KPI widget to modify
 * @param oneOrMoreDisplayForms - one or more refs of display forms used by attribute filters that should be added to the ignore-list
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function ignoreFilterOnKpiWidget(ref, oneOrMoreDisplayForms, correlationId) {
    const displayFormRefs = isObjRef(oneOrMoreDisplayForms) ? [oneOrMoreDisplayForms] : oneOrMoreDisplayForms;
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS",
        correlationId,
        payload: {
            ref,
            operation: {
                type: "ignoreAttributeFilter",
                displayFormRefs,
            },
        },
    };
}
/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpUnignoreAttributeFilter} operation.
 *
 * Dispatching this command will result in removal of one or more filters from KPI widget's attribute filter ignore-list.
 * Ignored attribute filters are not passed down to the KPI and will not be used to filter that KPI.
 *
 * The operation is idempotent - trying to unignore an attribute filter multiple times will have no effect.
 *
 * @param ref - reference of the KPI widget to modify
 * @param oneOrMoreDisplayForms - one or more refs of display forms used by attribute filters that should be removed from the ignore-list
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function unignoreFilterOnKpiWidget(ref, oneOrMoreDisplayForms, correlationId) {
    const displayFormRefs = isObjRef(oneOrMoreDisplayForms) ? [oneOrMoreDisplayForms] : oneOrMoreDisplayForms;
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS",
        correlationId,
        payload: {
            ref,
            operation: {
                type: "unignoreAttributeFilter",
                displayFormRefs,
            },
        },
    };
}
/**
 * Creates the ChangeKpiWidgetComparison command. Dispatching this command will result in change of what comparison
 * method - if any - is used for the KPI's Measure. The KPI may compare measure value from current period (as selected
 * by the date filter) to previous period and then depending on whether the current value grows can visualize that
 * as a good or bad thing.
 *
 * @param ref - reference of the KPI widget to modify
 * @param comparison - new comparison setting
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function changeKpiWidgetComparison(ref, comparison, correlationId) {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_COMPARISON",
        correlationId,
        payload: {
            ref,
            comparison,
        },
    };
}
/**
 * Creates the RefreshKpiWidget command. Dispatching this command will result in re-calculation of the KPI's value.
 *
 * @param ref - reference of the KPI widget to refresh
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function refreshKpiWidget(ref, correlationId) {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.REFRESH",
        correlationId,
        payload: {
            ref,
        },
    };
}
/**
 * Creates the SetDrillForKpiWidget command. Dispatching this command will result in KPI having its drill set to the given value.
 *
 * @param ref - reference of the KPI widget to modify
 * @param legacyDashboardRef - ref of the legacy dashboard to drill to
 * @param legacyDashboardTabIdentifier - identifier of the legacy dashboard tab to drill to
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function setDrillForKpiWidget(ref, legacyDashboardRef, legacyDashboardTabIdentifier, correlationId) {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.SET_DRILL",
        correlationId,
        payload: {
            ref,
            legacyDashboardTabIdentifier,
            legacyDashboardRef,
        },
    };
}
/**
 * Creates the RemoveDrillForKpiWidget command. Dispatching this command will result in KPI having its drill removed.
 *
 * @param ref - reference of the KPI widget to modify
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function removeDrillForKpiWidget(ref, correlationId) {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.REMOVE_DRILL",
        correlationId,
        payload: {
            ref,
        },
    };
}
//# sourceMappingURL=kpi.js.map