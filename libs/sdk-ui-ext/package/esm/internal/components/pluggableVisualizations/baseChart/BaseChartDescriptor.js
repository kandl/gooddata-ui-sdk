// (C) 2021-2022 GoodData Corporation
import { DASHBOARD_LAYOUT_DEFAULT_VIS_HEIGHT, MAX_VISUALIZATION_HEIGHT, MIN_VISUALIZATION_HEIGHT, MIDDLE_VISUALIZATION_HEIGHT, } from "../constants";
import { addIntersectionFiltersToInsight, modifyBucketsAttributesForDrillDown } from "../drillDownUtil";
export class BaseChartDescriptor {
    getSizeInfo(_insight, layoutDescriptor, settings) {
        return {
            width: {
                default: 6,
                min: 4,
                max: layoutDescriptor.gridColumnsCount,
            },
            height: {
                default: this.getDefaultHeight(settings.enableKDWidgetCustomHeight),
                min: this.getMinHeight(settings.enableKDWidgetCustomHeight),
                max: this.getMaxHeight(settings.enableKDWidgetCustomHeight),
            },
        };
    }
    getDefaultHeight(enableCustomHeight) {
        if (!enableCustomHeight) {
            return DASHBOARD_LAYOUT_DEFAULT_VIS_HEIGHT;
        }
        return MIDDLE_VISUALIZATION_HEIGHT;
    }
    getMinHeight(enableCustomHeight) {
        if (!enableCustomHeight) {
            return DASHBOARD_LAYOUT_DEFAULT_VIS_HEIGHT;
        }
        return MIN_VISUALIZATION_HEIGHT;
    }
    getMaxHeight(enableCustomHeight) {
        if (!enableCustomHeight) {
            return DASHBOARD_LAYOUT_DEFAULT_VIS_HEIGHT;
        }
        return MAX_VISUALIZATION_HEIGHT;
    }
    applyDrillDown(insight, drillDownContext, backendSupportsElementUris) {
        const intersection = drillDownContext.event.drillContext.intersection;
        const withFilters = addIntersectionFiltersToInsight(insight, intersection, backendSupportsElementUris);
        return modifyBucketsAttributesForDrillDown(withFilters, drillDownContext.drillDefinition);
    }
}
//# sourceMappingURL=BaseChartDescriptor.js.map