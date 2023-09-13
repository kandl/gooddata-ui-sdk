// (C) 2020-2022 GoodData Corporation
import { DefaultDashboardInsightMenu } from "../DefaultDashboardInsightMenu/index.js";
import { renderModeAware } from "../../../componentDefinition/index.js";
import { LegacyInsightMenu } from "./LegacyInsightMenu/index.js";
/**
 * @internal
 */
export const LegacyDashboardInsightMenu = renderModeAware({
    view: LegacyInsightMenu,
    edit: DefaultDashboardInsightMenu,
});
//# sourceMappingURL=LegacyDashboardInsightMenu.js.map