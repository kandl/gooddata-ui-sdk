import { walkLayout } from "@gooddata/sdk-backend-spi";
import { isDrillToCustomUrl, isInsightWidgetDefinition, isInsightWidget, } from "@gooddata/sdk-model";
import omit from "lodash/omit.js";
import { cloneWithSanitizedIds } from "./IdSanitization.js";
import isEmpty from "lodash/isEmpty.js";
import update from "lodash/fp/update.js";
import { splitDrillUrlParts } from "@gooddata/sdk-model/internal";
function removeIdentifiers(widget) {
    return omit(widget, ["ref", "uri", "identifier"]);
}
function removeWidgetIdentifiersInLayout(layout) {
    if (!layout) {
        return;
    }
    const widgetsPaths = [];
    walkLayout(layout, {
        widgetCallback: (_, widgetPath) => widgetsPaths.push(widgetPath),
    });
    return widgetsPaths.reduce((newLayout, widgetPath) => {
        return update(widgetPath, removeIdentifiers, newLayout);
    }, layout);
}
export function convertAnalyticalDashboard(dashboard, filterContextRef) {
    var _a;
    const layout = convertDrillToCustomUrlInLayoutToBackend(removeWidgetIdentifiersInLayout(dashboard.layout));
    return {
        dateFilterConfig: cloneWithSanitizedIds(dashboard.dateFilterConfig),
        filterContextRef: cloneWithSanitizedIds(filterContextRef),
        layout: cloneWithSanitizedIds(layout),
        plugins: (_a = dashboard.plugins) === null || _a === void 0 ? void 0 : _a.map(convertDashboardPluginLinkToBackend),
        version: "2",
    };
}
export function convertFilterContextToBackend(filterContext) {
    return {
        filters: cloneWithSanitizedIds(filterContext.filters),
        version: "2",
    };
}
export function convertDashboardPluginToBackend(plugin) {
    return {
        url: plugin.url,
        version: "2",
    };
}
export function convertDashboardPluginLinkToBackend(pluginLink) {
    return {
        plugin: cloneWithSanitizedIds(pluginLink.plugin),
        parameters: pluginLink.parameters,
        version: "2",
    };
}
export function getDrillToCustomUrlPaths(layout) {
    const paths = [];
    walkLayout(layout, {
        widgetCallback: (widget, widgetPath) => {
            if (!isInsightWidget(widget) && !isInsightWidgetDefinition(widget)) {
                return;
            }
            widget.drills.forEach((drill, drillIndex) => {
                if (!isDrillToCustomUrl(drill)) {
                    return;
                }
                paths.push([...widgetPath, "drills", drillIndex]);
            });
        },
    });
    return paths;
}
function convertTargetUrlToParts(drill) {
    return update(["target", "url"], splitDrillUrlParts, drill);
}
export function convertDrillToCustomUrlInLayoutToBackend(layout) {
    if (!layout) {
        return;
    }
    const paths = getDrillToCustomUrlPaths(layout);
    if (isEmpty(paths)) {
        return layout;
    }
    return paths.reduce((layout, path) => {
        return update(path, convertTargetUrlToParts, layout);
    }, layout);
}
//# sourceMappingURL=AnalyticalDashboardConverter.js.map