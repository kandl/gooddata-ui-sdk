// (C) 2021-2023 GoodData Corporation
import { isObjRef, } from "@gooddata/sdk-model";
/**
 * Creates the ChangeInsightWidgetHeader command. Dispatching this command will result in change of the Insight widget's
 * header which (now) includes title.
 *
 * @param ref - reference of the insight widget to modify
 * @param header - new header to use
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function changeInsightWidgetHeader(ref, header, correlationId) {
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_HEADER",
        correlationId,
        payload: {
            ref,
            header,
        },
    };
}
/**
 * Creates the ChangeInsightWidgetFilterSettings command for {@link FilterOpReplaceAll} operation.
 *
 * Dispatching this command will result in replacement of Insight widget's filter settings; this includes change of
 * data set used for date filter, disabling date filtering, ignoring attribute filters that are defined on the dashboard for the widget.
 *
 * @param ref - reference of the insight widget to modify
 * @param settings - new filter settings to apply
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function replaceInsightWidgetFilterSettings(ref, settings, correlationId) {
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_FILTER_SETTINGS",
        correlationId,
        payload: {
            ref,
            operation: Object.assign({ type: "replace" }, settings),
        },
    };
}
/**
 * Creates the ChangeInsightWidgetFilterSettings command for {@link FilterOpEnableDateFilter} operation.
 *
 * Dispatching this command will result in change of Insight widget's date filter setting. The date filtering will
 * be enabled and the provided date data set will be used for date-filtering widget's insight.
 *
 * @param ref - reference of the insight widget to modify
 * @param dateDataset - date data set to use for filtering the insight, if "default" is provided, the default date dataset will be resolved and used
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function enableInsightWidgetDateFilter(ref, dateDataset, correlationId) {
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_FILTER_SETTINGS",
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
 * Creates the ChangeInsightWidgetFilterSettings command for {@link FilterOpDisableDateFilter} operation.
 *
 * Dispatching this command will result in change of Insight widget's date filter setting. The date filtering will
 * be disabled.
 *
 * @param ref - reference of the insight widget to modify
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function disableInsightWidgetDateFilter(ref, correlationId) {
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_FILTER_SETTINGS",
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
 * Creates the ChangeInsightWidgetFilterSettings command for {@link FilterOpReplaceAttributeIgnores} operation.
 *
 * Dispatching this command will result in replacement of Insight widget's attribute filter ignore-list. Those attribute filters
 * that use the provided displayForms for filtering will be ignored by the widget.
 *
 * @param ref - reference of the insight widget to modify
 * @param displayForms - refs of display forms used by attribute filters that should be ignored
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function replaceInsightWidgetIgnoredFilters(ref, displayForms, correlationId) {
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_FILTER_SETTINGS",
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
 * Creates the ChangeInsightWidgetFilterSettings command for {@link FilterOpIgnoreAttributeFilter} operation.
 *
 * Dispatching this command will result in addition of one or more filters into Insight widget's attribute filter ignore-list.
 * Those attribute filters that use the provided displayForms for filtering will be ignored by the widget on top of any
 * other filters that are already ignored.
 *
 * Ignored attribute filters are not passed down to the insight and will not be used to filter that insight.
 *
 * The operation is idempotent - trying to ignore an attribute filter multiple times will have no effect.
 *
 * @param ref - reference of the insight widget to modify
 * @param oneOrMoreDisplayForms - one or more refs of display forms used by attribute filters that should be added to the ignore-list
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function ignoreFilterOnInsightWidget(ref, oneOrMoreDisplayForms, correlationId) {
    const displayFormRefs = isObjRef(oneOrMoreDisplayForms) ? [oneOrMoreDisplayForms] : oneOrMoreDisplayForms;
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_FILTER_SETTINGS",
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
 * Creates the ChangeInsightWidgetFilterSettings command for {@link FilterOpUnignoreAttributeFilter} operation.
 *
 * Dispatching this command will result in removal of one or more filters from Insight widget's attribute filter ignore-list.
 * Ignored attribute filters are not passed down to the insight and will not be used to filter that insight.
 *
 * The operation is idempotent - trying to unignore an attribute filter multiple times will have no effect.
 *
 * @param ref - reference of the insight widget to modify
 * @param oneOrMoreDisplayForms - one or more refs of display forms used by attribute filters that should be removed from the ignore-list
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function unignoreFilterOnInsightWidget(ref, oneOrMoreDisplayForms, correlationId) {
    const displayFormRefs = isObjRef(oneOrMoreDisplayForms) ? [oneOrMoreDisplayForms] : oneOrMoreDisplayForms;
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_FILTER_SETTINGS",
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
 * Creates the ChangeInsightWidgetVisProperties command. Dispatching this command will result is modification
 * of the visualization properties that are effective for the particular insight widget.
 *
 * Through visualization properties, you can modify how particular visualization looks and behaves (enable/disable
 * tooltips, legend, change axes, enable zooming).
 *
 * If you want to clear any widget-level properties, set properties to `undefined`.
 *
 * @param ref - reference of the insight widget to modify
 * @param properties - new properties to set, undefined to clear any widget level visualization properties
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function changeInsightWidgetVisProperties(ref, properties, correlationId) {
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_PROPERTIES",
        correlationId,
        payload: {
            ref,
            properties,
        },
    };
}
/**
 *
 * Creates the ChangeInsightWidgetVisConfiguration command. Dispatching this command will result is modification
 * of the visualization configuration that are effective for the particular insight widget.
 *
 * Through visualization configuration, you can modify how particular visualization behaves
 *
 * If you want to clear any widget-level configuration, set config to `undefined`.
 *
 * @param ref - reference of the insight widget to modify
 * @param config - new configuration to set, undefined to clear any widget level visualization config
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function changeInsightWidgetVisConfiguration(ref, config, correlationId) {
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_CONFIGURATION",
        correlationId,
        payload: {
            ref,
            config,
        },
    };
}
/**
 * Creates the ChangeInsightWidgetInsight command. Dispatching this command will result in change of what
 * insight is rendered inside particular insight widget - while keeping all the other setup the same (filtering,
 * drilling).
 *
 * @param ref - reference to insight widget whose insight should be changed
 * @param insightRef - reference to the new insight to use in the widget
 * @param visualizationProperties - specify visualization properties to use. Undefined value means keeping the existing properties on record in the widget
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function changeInsightWidgetInsight(ref, insightRef, visualizationProperties, correlationId) {
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_INSIGHT",
        correlationId,
        payload: {
            ref,
            insightRef,
            visualizationProperties,
        },
    };
}
/**
 * Creates the ModifyDrillsForInsightWidget command. Dispatching the created command will add or modify a new drill for
 * the insight widget.
 *
 * Drill can be setup for particular measure - meaning elements in the insight will be clickable. Exactly one drill
 * can be specified for a measure.
 *
 * What happens on click depends on the context in which the dashboard lives:
 *
 * -  When in KPI Dashboard (embedded or not) the defined action is actually triggered and done - it may open a new tab,
 *    open overlay with insight, navigate to a new dashboard and carry over the filters.
 * -  When the dashboard is embedded using Dashboard component, an event will be emitted describing the defined
 *    drill action.
 *
 * @param ref - reference to insight widget whose drills should be modified
 * @param drills - drills to add or modify.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function modifyDrillsForInsightWidget(ref, drills, correlationId) {
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.MODIFY_DRILLS",
        correlationId,
        payload: {
            ref,
            drills,
        },
    };
}
/**
 * Type guard resolved all drill selector
 *
 * @beta
 */
export function isAllDrillSelector(obj) {
    return obj === "*";
}
/**
 * Creates the RemoveDrillsForInsightWidget command. Dispatching the created command will remove insight widget's
 * drill definition for the provided measure.
 *
 * @param ref - reference of insight widget whose drill should be removed
 * @param origins - measure or attribute localIdentifiers whose drill definitions should be removed
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function removeDrillsForInsightWidget(ref, origins, correlationId) {
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.REMOVE_DRILLS",
        correlationId,
        payload: {
            ref,
            origins,
        },
    };
}
/**
 * Creates the RefreshInsightWidget command. Dispatching this command will result in re-calculation of the widget's
 * insight and re-render.
 *
 * @param ref - reference to the Insight widget to refresh
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function refreshInsightWidget(ref, correlationId) {
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.REFRESH",
        correlationId,
        payload: {
            ref,
        },
    };
}
/**
 * Creates the ExportInsightWidget command. Dispatching this command will result in exporting of the widget to a CSV of XLSX file.
 *
 * @param ref - reference to the Insight widget to refresh
 * @param config - configuration of the export operation
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function exportInsightWidget(ref, config, correlationId) {
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.EXPORT",
        correlationId,
        payload: {
            config,
            ref,
        },
    };
}
/**
 * Creates the ChangeInsightWidgetDescription command. Dispatching this command will result in change of the Insight widget's
 * description.
 *
 * @param ref - reference of the insight widget to modify
 * @param description - new description to use
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function changeInsightWidgetDescription(ref, description, correlationId) {
    return {
        type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_DESCRIPTION",
        correlationId,
        payload: {
            ref,
            description,
        },
    };
}
//
//
//
//# sourceMappingURL=insight.js.map