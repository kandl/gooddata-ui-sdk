import { DefaultAttributeFilterDraggingComponent } from "../../dragAndDrop/index.js";
import { AttributesDropdown } from "./addAttributeFilter/index.js";
import { CreatableAttributeFilter } from "./CreatableAttributeFilter.js";
/**
 * @internal
 */
export function DefaultDashboardAttributeFilterComponentSetFactory(attributeFilterProvider) {
    return {
        MainComponentProvider: attributeFilterProvider,
        creating: {
            CreatingPlaceholderComponent: AttributesDropdown,
            CreatePanelListItemComponent: CreatableAttributeFilter,
            type: "attributeFilter-placeholder",
            priority: 10,
        },
        dragging: {
            DraggingComponent: DefaultAttributeFilterDraggingComponent,
            type: "attributeFilter",
        },
    };
}
//# sourceMappingURL=DefaultDashboardAttributeFilterComponentSetFactory.js.map