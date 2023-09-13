import { InsightDraggingComponent } from "../../dragAndDrop/index.js";
/**
 * @internal
 */
export function DefaultDashboardInsightComponentSetFactory(insightProvider) {
    return {
        MainComponentProvider: insightProvider,
        dragging: {
            DraggingComponent: InsightDraggingComponent,
            type: "insight",
        },
        configuration: {
            WidgetConfigPanelComponent: () => null,
        },
    };
}
//# sourceMappingURL=DefaultDashboardInsightComponentSetFactory.js.map