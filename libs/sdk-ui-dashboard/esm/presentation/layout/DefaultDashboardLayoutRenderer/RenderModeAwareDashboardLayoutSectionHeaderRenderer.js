// (C) 2022 GoodData Corporation
import { renderModeAware } from "../../componentDefinition/index.js";
import { DashboardLayoutSectionHeaderRenderer } from "./DashboardLayoutSectionHeaderRenderer.js";
import { DashboardLayoutEditSectionHeaderRenderer } from "./DashboardLayoutEditSectionHeaderRenderer.js";
/**
 * render function for DashboardLayoutSectionHeader respecting render mode
 *
 * @internal
 */
export const renderModeAwareDashboardLayoutSectionHeaderRenderer = renderModeAware({
    view: DashboardLayoutSectionHeaderRenderer,
    edit: DashboardLayoutEditSectionHeaderRenderer,
});
//# sourceMappingURL=RenderModeAwareDashboardLayoutSectionHeaderRenderer.js.map