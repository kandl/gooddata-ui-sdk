import { __rest } from "tslib";
// (C) 2007-2023 GoodData Corporation
import { layoutWidgets, UnexpectedError, NotSupported } from "@gooddata/sdk-backend-spi";
import { isUriRef, isAttributeElementsByValue, isIdentifierRef, isLocalIdRef, isDashboardDateFilter, isDashboardDateFilterReference, isFilterContext, isTempFilterContext, isDrillFromAttribute, isDrillFromMeasure, isDrillToAttributeUrl, isDrillToCustomUrl, isDrillToDashboard, isDrillToInsight, isDrillToLegacyDashboard, isWidget, isWidgetDefinition, isDashboardAttachment, isWidgetAttachment, isDashboardLayout, isKpiWithComparison, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import { convertUrisToReferences } from "../fromBackend/ReferenceConverter.js";
import isEmpty from "lodash/isEmpty.js";
import omitBy from "lodash/omitBy.js";
import { serializeProperties } from "../fromBackend/PropertiesConverter.js";
import { assertNoNulls } from "./utils.js";
const refToUri = (ref) => {
    invariant(isUriRef(ref));
    return ref.uri;
};
const refToIdentifier = (ref) => {
    invariant(isIdentifierRef(ref));
    return ref.identifier;
};
const refToLocalId = (ref) => {
    invariant(isLocalIdRef(ref));
    return ref.localIdentifier;
};
/**
 * @internal
 */
export const convertLayoutSize = (size) => {
    const converted = {
        width: size.gridWidth,
    };
    if (size.gridHeight) {
        converted.height = size.gridHeight;
    }
    if (size.heightAsRatio) {
        converted.heightAsRatio = size.heightAsRatio;
    }
    return converted;
};
/**
 * @internal
 */
export const convertLayoutItemSize = (column) => {
    const allScreens = ["xl", "md", "lg", "sm", "xs"];
    return allScreens.reduce((acc, el) => {
        const size = column[el];
        if (size) {
            acc[el] = convertLayoutSize(size);
        }
        return acc;
    }, {});
};
const convertLayoutItem = (column) => {
    const { size, widget } = column;
    if (isWidget(widget)) {
        return {
            size: convertLayoutItemSize(size),
            content: {
                widget: { qualifier: { uri: refToUri(widget.ref) } },
            },
        };
    }
    else if (isDashboardLayout(widget)) {
        return {
            size: convertLayoutItemSize(size),
            content: convertLayout(widget),
        };
    }
    else if (isWidgetDefinition(widget)) {
        // This should never happen -> widgets in the layout should be already saved
        throw new UnexpectedError("Cannot convert layout widget definition to bear model!");
    }
    return {
        size: convertLayoutItemSize(size),
    };
};
const convertLayoutSection = (section) => {
    var _a, _b;
    const convertedRow = {
        columns: section.items.map((column) => convertLayoutItem(column)),
    };
    if (section.header) {
        // Ignore empty strings in header
        const headerWithoutEmptyStrings = omitBy(section.header, (x) => !x);
        const isEmptyHeader = isEmpty(headerWithoutEmptyStrings);
        if (!isEmptyHeader) {
            const header = {};
            if ((_a = section.header) === null || _a === void 0 ? void 0 : _a.title) {
                header.title = section.header.title;
            }
            if ((_b = section.header) === null || _b === void 0 ? void 0 : _b.description) {
                header.description = section.header.description;
            }
            convertedRow.header = header;
        }
    }
    return convertedRow;
};
const convertLayout = (layout) => {
    const { sections } = layout;
    const convertedLayout = {
        fluidLayout: {
            rows: sections.map(convertLayoutSection),
        },
    };
    if (layout.size) {
        convertedLayout.fluidLayout.size = convertLayoutSize(layout.size);
    }
    return convertedLayout;
};
export const convertFilterContextItem = (filterContextItem) => {
    if (isDashboardDateFilter(filterContextItem)) {
        const { dateFilter: { granularity, type, attribute, dataSet, from, to }, } = filterContextItem;
        const convertedDateFilter = {
            dateFilter: {
                granularity,
                type,
                from: from === null || from === void 0 ? void 0 : from.toString(),
                to: to === null || to === void 0 ? void 0 : to.toString(),
            },
        };
        if (attribute) {
            convertedDateFilter.dateFilter.attribute = refToUri(attribute);
        }
        if (dataSet) {
            convertedDateFilter.dateFilter.dataSet = refToUri(dataSet);
        }
        return convertedDateFilter;
    }
    const { attributeFilter: { attributeElements, displayForm, negativeSelection, localIdentifier, title, filterElementsBy = [], selectionMode, }, } = filterContextItem;
    const displayFormUri = refToUri(displayForm);
    const convertedAttributeFilterParents = filterElementsBy.map((filterElementsByItem) => {
        return {
            filterLocalIdentifier: filterElementsByItem.filterLocalIdentifier,
            over: {
                attributes: filterElementsByItem.over.attributes.map(refToUri),
            },
        };
    });
    if (isAttributeElementsByValue(attributeElements)) {
        throw new NotSupported("Bear backend does not support value attribute filters in analytical dashboards");
    }
    assertNoNulls(attributeElements);
    return {
        attributeFilter: Object.assign({ negativeSelection, attributeElements: attributeElements.uris, displayForm: displayFormUri, localIdentifier, filterElementsBy: convertedAttributeFilterParents, title }, (selectionMode !== undefined ? { selectionMode } : {})),
    };
};
export function convertFilterContext(filterContext) {
    if (isTempFilterContext(filterContext)) {
        const { created, filters } = filterContext;
        return {
            tempFilterContext: Object.assign({ created, filters: filters.map(convertFilterContextItem) }, (filterContext
                ? {
                    uri: refToUri(filterContext.ref),
                }
                : {})),
        };
    }
    const { description, filters, title } = filterContext;
    return {
        filterContext: {
            content: {
                filters: filters.map(convertFilterContextItem),
            },
            meta: Object.assign({ summary: description, title }, (isFilterContext(filterContext)
                ? {
                    uri: refToUri(filterContext),
                    identifier: filterContext.identifier,
                }
                : {})),
        },
    };
}
const convertFilterReference = (filterReference) => {
    if (isDashboardDateFilterReference(filterReference)) {
        return {
            dateFilterReference: {
                dataSet: refToUri(filterReference.dataSet),
            },
        };
    }
    return {
        attributeFilterReference: {
            displayForm: refToUri(filterReference.displayForm),
        },
    };
};
export function convertDrill(drill) {
    if (isDrillToLegacyDashboard(drill)) {
        const { tab } = drill;
        return {
            projectDashboard: refToUri(drill.target),
            projectDashboardTab: tab,
        };
    }
    const { origin } = drill;
    let drillFrom;
    if (isDrillFromMeasure(origin)) {
        const { measure } = origin;
        drillFrom = {
            drillFromMeasure: {
                localIdentifier: refToLocalId(measure),
            },
        };
    }
    else if (isDrillFromAttribute(origin)) {
        const { attribute } = origin;
        drillFrom = {
            drillFromAttribute: {
                localIdentifier: refToLocalId(attribute),
            },
        };
    }
    else {
        throw new UnexpectedError("Unable to convert unknown drill origin!");
    }
    if (isDrillToDashboard(drill)) {
        return {
            drillToDashboard: {
                from: drillFrom,
                target: "in-place",
                toDashboard: drill.target !== undefined ? refToIdentifier(drill.target) : undefined,
            },
        };
    }
    else if (isDrillToInsight(drill)) {
        return {
            drillToVisualization: {
                from: drillFrom,
                target: "pop-up",
                toVisualization: {
                    uri: refToUri(drill.target),
                },
            },
        };
    }
    else if (isDrillToCustomUrl(drill)) {
        return {
            drillToCustomUrl: {
                from: drillFrom,
                target: "new-window",
                customUrl: drill.target.url,
            },
        };
    }
    else if (isDrillToAttributeUrl(drill)) {
        return {
            drillToAttributeUrl: {
                from: drillFrom,
                target: "new-window",
                drillToAttributeDisplayForm: { uri: refToUri(drill.target.hyperlinkDisplayForm) },
                insightAttributeDisplayForm: { uri: refToUri(drill.target.displayForm) },
            },
        };
    }
    throw new UnexpectedError("Unable to convert unknown drill!");
}
/**
 * @internal
 */
export const convertWidget = (widget) => {
    const { ignoreDashboardFilters, dateDataSet, title, description, drills } = widget;
    const meta = Object.assign(Object.assign({}, (isWidget(widget)
        ? {
            identifier: widget.identifier,
            uri: refToUri(widget.ref),
        }
        : {})), { title, summary: description });
    const convertedDateDataSet = dateDataSet && refToUri(dateDataSet);
    const convertedIgnoredDashboardFilters = ignoreDashboardFilters.map(convertFilterReference);
    if (widget.type === "kpi") {
        invariant(widget.kpi, "Widget type is kpi, but kpi props are not defined!");
        const { kpi, configuration } = widget;
        return {
            kpi: {
                content: Object.assign(Object.assign(Object.assign({}, (isKpiWithComparison(kpi)
                    ? {
                        comparisonDirection: kpi.comparisonDirection,
                        comparisonType: kpi.comparisonType,
                    }
                    : {
                        comparisonType: kpi.comparisonType,
                    })), { metric: refToUri(kpi.metric), ignoreDashboardFilters: convertedIgnoredDashboardFilters, dateDataSet: convertedDateDataSet, drillTo: drills.length > 0 ? convertDrill(drills[0]) : undefined }), (configuration ? { configuration } : {})),
                meta,
            },
        };
    }
    const { insight, properties: widgetProperties = {}, configuration } = widget;
    const { properties, references } = convertUrisToReferences({
        properties: widgetProperties,
        references: {},
    });
    const nonEmptyProperties = omitBy(properties, (value, key) => key !== "controls" && isEmpty(value));
    return {
        visualizationWidget: {
            content: Object.assign(Object.assign(Object.assign({ visualization: refToUri(insight), ignoreDashboardFilters: convertedIgnoredDashboardFilters, dateDataSet: convertedDateDataSet, drills: drills
                    ? drills.map(convertDrill)
                    : [] }, (!isEmpty(nonEmptyProperties) && {
                properties: serializeProperties(nonEmptyProperties),
            })), (!isEmpty(references) && { references })), (configuration ? { configuration } : {})),
            meta,
        },
    };
};
const convertAbsoluteDateFilterPreset = (preset) => {
    const { type: _ } = preset, rest = __rest(preset, ["type"]);
    return rest;
};
const convertRelativeDateFilterPreset = (preset) => {
    const { type: _ } = preset, rest = __rest(preset, ["type"]);
    return rest;
};
const convertDateFilterConfig = (config) => {
    var _a, _b, _c, _d;
    const absolutePresets = (_b = (_a = config.addPresets) === null || _a === void 0 ? void 0 : _a.absolutePresets) === null || _b === void 0 ? void 0 : _b.map(convertAbsoluteDateFilterPreset);
    const relativePresets = (_d = (_c = config.addPresets) === null || _c === void 0 ? void 0 : _c.relativePresets) === null || _d === void 0 ? void 0 : _d.map(convertRelativeDateFilterPreset);
    const addPresets = absolutePresets || relativePresets
        ? Object.assign(Object.assign({}, (absolutePresets && { absolutePresets })), (relativePresets && { relativePresets })) : undefined;
    return Object.assign(Object.assign({}, config), (addPresets && { addPresets }));
};
export const convertPluginLink = (pluginLink) => {
    const { plugin, parameters } = pluginLink;
    return {
        type: refToUri(plugin),
        parameters: parameters,
    };
};
export const convertDashboard = (dashboard) => {
    const { filterContext, layout, ref, identifier, title, description, dateFilterConfig, isLocked, tags, plugins, shareStatus, isUnderStrictControl, } = dashboard;
    const convertedLayout = layout && convertLayout(layout);
    const widgets = layout && layoutWidgets(layout);
    const dashboardUri = ref && refToUri(ref);
    const filterContextUri = (filterContext === null || filterContext === void 0 ? void 0 : filterContext.ref) && refToUri(filterContext.ref);
    const convertedDateFilterConfig = dateFilterConfig && convertDateFilterConfig(dateFilterConfig);
    const convertedPlugins = plugins === null || plugins === void 0 ? void 0 : plugins.map(convertPluginLink);
    const sharedWithSomeoneProp = shareStatus === "shared"
        ? {
            sharedWithSomeone: 1,
        }
        : {};
    let flagsProp = {};
    if (isUnderStrictControl !== undefined) {
        flagsProp = isUnderStrictControl
            ? {
                flags: ["strictAccessControl"],
            }
            : {
                flags: [],
            };
    }
    return {
        analyticalDashboard: {
            content: Object.assign(Object.assign(Object.assign({}, (convertedDateFilterConfig && { dateFilterConfig: convertedDateFilterConfig })), (convertedPlugins && !isEmpty(convertedPlugins) && { plugins: convertedPlugins })), { filterContext: filterContextUri, widgets: widgets ? widgets.filter(isWidget).map((widget) => refToUri(widget.ref)) : [], layout: convertedLayout }),
            meta: Object.assign(Object.assign(Object.assign(Object.assign({}, (dashboardUri
                ? {
                    uri: dashboardUri,
                    identifier,
                }
                : {})), { title, summary: description, locked: isLocked, tags: tags === null || tags === void 0 ? void 0 : tags.join(" "), unlisted: shareStatus === "public" ? 0 : 1 }), sharedWithSomeoneProp), flagsProp),
        },
    };
};
export const convertWidgetAlert = (alert) => {
    const { dashboard, widget, description, isTriggered, threshold, title, whenTriggered, ref, identifier, filterContext, } = alert;
    const alertUri = ref && refToUri(ref);
    return {
        kpiAlert: {
            content: {
                filterContext: (filterContext === null || filterContext === void 0 ? void 0 : filterContext.ref) && refToUri(filterContext.ref),
                dashboard: refToUri(dashboard),
                kpi: refToUri(widget),
                isTriggered,
                threshold,
                whenTriggered,
            },
            meta: Object.assign(Object.assign({}, (alertUri
                ? {
                    uri: alertUri,
                    identifier,
                }
                : {})), { title, summary: description }),
        },
    };
};
export const convertScheduledMailAttachment = (scheduledMailAttachment) => {
    if (isDashboardAttachment(scheduledMailAttachment)) {
        const { dashboard, format, filterContext } = scheduledMailAttachment;
        return {
            kpiDashboardAttachment: {
                uri: refToUri(dashboard),
                format,
                filterContext: filterContext && refToUri(filterContext),
            },
        };
    }
    else if (isWidgetAttachment(scheduledMailAttachment)) {
        const { widgetDashboard, widget, filterContext, formats, exportOptions } = scheduledMailAttachment;
        return {
            visualizationWidgetAttachment: {
                uri: refToUri(widget),
                dashboardUri: refToUri(widgetDashboard),
                formats,
                filterContext: filterContext && refToUri(filterContext),
                exportOptions: exportOptions && {
                    includeFilterContext: exportOptions.includeFilters ? "yes" : "no",
                    mergeHeaders: exportOptions.mergeHeaders ? "yes" : "no",
                },
            },
        };
    }
    throw new UnexpectedError("Cannot convert scheduled email attachment - only dashboard and widget attachments are supported!");
};
/**
 * @internal
 */
export const convertScheduledMail = (scheduledMail) => {
    const { title, description, uri, identifier, body, subject, to, when, bcc, lastSuccessful, unsubscribed, attachments, unlisted, } = scheduledMail;
    return {
        scheduledMail: {
            content: {
                attachments: attachments.map(convertScheduledMailAttachment),
                body,
                subject,
                to,
                when: {
                    startDate: when.startDate,
                    endDate: when.endDate,
                    timeZone: when.timeZone,
                    recurrency: when.recurrence,
                },
                bcc,
                lastSuccessfull: lastSuccessful,
                unsubscribed,
            },
            meta: Object.assign(Object.assign({ unlisted: unlisted ? 1 : 0 }, (uri
                ? {
                    uri,
                    identifier,
                }
                : {})), { title, summary: description }),
        },
    };
};
export const convertDashboardPlugin = (plugin) => {
    const { uri, identifier, name, tags, description, url } = plugin;
    return {
        dashboardPlugin: {
            content: {
                url,
            },
            meta: Object.assign(Object.assign({}, (uri ? { uri, identifier } : {})), { title: name, summary: description, tags: tags === null || tags === void 0 ? void 0 : tags.join(" ") }),
        },
    };
};
//# sourceMappingURL=DashboardConverter.js.map