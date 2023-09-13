// (C) 2019-2022 GoodData Corporation
import { isFluidLayout, isLayoutWidget, isObjectUriQualifier, isVisualization, } from "@gooddata/api-model-bear";
import { uriRef, idRef, areObjRefsEqual, } from "@gooddata/sdk-model";
// Default layout column size for the kpi widget, when generating implicit layout
const KPI_SIZE = 2;
// Default layout column size for the visualization widget, when generating implicit layout
const VISUALIZATION_SIZE = 12;
/**
 * @internal
 */
export const convertLayoutSize = (size) => {
    const converted = {
        gridWidth: size.width,
    };
    if (size.height) {
        converted.gridHeight = size.height;
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
const convertLayoutItem = (column, widgetDependencies) => {
    const { content } = column;
    if (isLayoutWidget(content)) {
        const widget = widgetDependencies.find((dep) => {
            const { qualifier } = content.widget;
            if (isObjectUriQualifier(qualifier)) {
                return areObjRefsEqual(uriRef(qualifier.uri), dep.ref);
            }
            return areObjRefsEqual(idRef(qualifier.identifier), dep.ref);
        });
        return {
            type: "IDashboardLayoutItem",
            size: convertLayoutItemSize(column.size),
            widget,
        };
    }
    else if (isFluidLayout(content)) {
        return {
            type: "IDashboardLayoutItem",
            widget: convertLayout(content, widgetDependencies),
            size: convertLayoutItemSize(column.size),
        };
    }
    return {
        type: "IDashboardLayoutItem",
        size: convertLayoutItemSize(column.size),
    };
};
const convertLayoutSection = (row, widgetDependencies) => {
    const section = {
        type: "IDashboardLayoutSection",
        items: row.columns.map((column) => convertLayoutItem(column, widgetDependencies)),
    };
    if (row.header) {
        section.header = row.header;
    }
    return section;
};
/**
 * @internal
 */
export const convertLayout = (layout, widgetDependencies) => {
    const { fluidLayout: { rows }, fluidLayout, } = layout;
    const convertedLayout = {
        type: "IDashboardLayout",
        sections: rows.map((row) => convertLayoutSection(row, widgetDependencies)),
    };
    if (fluidLayout.size) {
        convertedLayout.size = convertLayoutSize(fluidLayout.size);
    }
    return convertedLayout;
};
/**
 * Create {@link ILegacyDashboardLayout} from {@link IWidget} items. As widgets do not contain any layout information,
 * implicit layout with a single row will be generated.
 *
 * @returns fluid layout created from the widgets
 */
export function createImplicitDashboardLayout(widgets, dependencies, visualizationClasses) {
    if (widgets.length < 1) {
        return undefined;
    }
    const sections = createLayoutSections(widgets, dependencies, visualizationClasses);
    return {
        type: "IDashboardLayout",
        sections,
    };
}
function createLayoutSections(widgets, dependencies, visualizationClasses) {
    return [
        {
            type: "IDashboardLayoutSection",
            items: createLayoutItems(widgets, dependencies, visualizationClasses),
        },
    ];
}
function createLayoutItems(widgets, dependencies, visualizationClasses) {
    return widgets.map((widget) => createLayoutItem(widget, dependencies, visualizationClasses));
}
function createLayoutItem(widget, dependencies, visualizationClasses) {
    return {
        type: "IDashboardLayoutItem",
        widget,
        size: {
            xl: {
                gridWidth: implicitWidgetWidth(widget, dependencies, visualizationClasses),
            },
        },
    };
}
function implicitWidgetWidth(widget, dependencies, visualizationClasses) {
    if (widget.type === "kpi") {
        return KPI_SIZE;
    }
    const visualizationUri = widget.insight.uri;
    const vis = dependencies.find((v) => isVisualization(v) && v.visualizationObject.meta.uri === visualizationUri);
    const visualizationClassUri = vis.visualizationObject.content.visualizationClass.uri;
    const visualizationClass = visualizationClasses.find((visClass) => visClass.visualizationClass.meta.uri === visualizationClassUri);
    return implicitInsightWidth(visualizationClass);
}
function implicitInsightWidth(visualizationClass) {
    const visualizationType = visualizationClass.visualizationClass.content.url.split(":")[1];
    return visualizationType === "headline" ? KPI_SIZE : VISUALIZATION_SIZE;
}
//# sourceMappingURL=layout.js.map