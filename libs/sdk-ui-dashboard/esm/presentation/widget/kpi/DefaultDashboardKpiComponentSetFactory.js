import { KpiDraggingComponent } from "../../dragAndDrop/index.js";
import { DefaultDashboardKpiPlaceholderWidget } from "../kpiPlaceholder/index.js";
import { CreatableKpi } from "./CreatableKpi.js";
import { DefaultKpiConfigurationPanel } from "./DefaultKpiConfigurationPanel/DefaultKpiConfigurationPanel.js";
/**
 * @internal
 */
export function DefaultDashboardKpiComponentSetFactory(kpiProvider) {
    return {
        MainComponentProvider: kpiProvider,
        creating: {
            CreatingPlaceholderComponent: DefaultDashboardKpiPlaceholderWidget,
            CreatePanelListItemComponent: CreatableKpi,
            type: "kpi-placeholder",
            priority: 5,
        },
        dragging: {
            DraggingComponent: KpiDraggingComponent,
            type: "kpi",
        },
        configuration: {
            WidgetConfigPanelComponent: DefaultKpiConfigurationPanel,
        },
    };
}
//# sourceMappingURL=DefaultDashboardKpiComponentSetFactory.js.map