// (C) 2022 GoodData Corporation
import React from "react";
import { renderModeAware } from "../../componentDefinition/index.js";
import { SidebarConfigurationPanel } from "./SidebarConfigurationPanel.js";
/**
 * @internal
 */
export const RenderModeAwareDashboardSidebar = renderModeAware({
    view: () => React.createElement(React.Fragment, null),
    edit: SidebarConfigurationPanel,
});
//# sourceMappingURL=RenderModeAwareDashboardSidebar.js.map