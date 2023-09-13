// (C) 2021-2022 GoodData Corporation
import { MIDDLE_VISUALIZATION_HEIGHT, DASHBOARD_LAYOUT_DEFAULT_VIS_HEIGHT } from "./constants.js";
import { BaseChartDescriptor } from "./baseChart/BaseChartDescriptor.js";
export class BigChartDescriptor extends BaseChartDescriptor {
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
    getMinHeight(enableCustomHeight) {
        if (!enableCustomHeight) {
            return DASHBOARD_LAYOUT_DEFAULT_VIS_HEIGHT;
        }
        return MIDDLE_VISUALIZATION_HEIGHT;
    }
}
//# sourceMappingURL=BigChartDescriptor.js.map