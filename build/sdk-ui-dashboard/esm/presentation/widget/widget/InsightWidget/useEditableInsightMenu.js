// (C) 2021-2023 GoodData Corporation
import { useMemo } from "react";
import { useIntl } from "react-intl";
import { useDashboardCustomizationsContext } from "../../../dashboardContexts/index.js";
import { getDefaultInsightEditMenuItems } from "../../insightMenu/index.js";
import { selectDrillTargetsByWidgetRef, selectSettings, useDashboardDispatch, useDashboardSelector, } from "../../../../model/index.js";
export const useEditableInsightMenu = (config) => {
    var _a, _b;
    const { insight, widget, closeMenu } = config;
    const intl = useIntl();
    const dispatch = useDashboardDispatch();
    const settings = useDashboardSelector(selectSettings);
    const { enableKPIDashboardDrillToURL, enableKPIDashboardDrillToDashboard, enableKPIDashboardDrillToInsight, } = settings;
    const configItems = useDashboardSelector(selectDrillTargetsByWidgetRef(widget.ref));
    const someDrillingEnabled = enableKPIDashboardDrillToURL ||
        enableKPIDashboardDrillToDashboard ||
        enableKPIDashboardDrillToInsight;
    const availableDrillTargets = configItems === null || configItems === void 0 ? void 0 : configItems.availableDrillTargets;
    const someAvailableDrillTargetsExist = !!((_a = availableDrillTargets === null || availableDrillTargets === void 0 ? void 0 : availableDrillTargets.attributes) === null || _a === void 0 ? void 0 : _a.length) || !!((_b = availableDrillTargets === null || availableDrillTargets === void 0 ? void 0 : availableDrillTargets.measures) === null || _b === void 0 ? void 0 : _b.length);
    const includeInteractions = someDrillingEnabled && someAvailableDrillTargetsExist;
    const { insightMenuItemsProvider } = useDashboardCustomizationsContext();
    const defaultMenuItems = useMemo(() => {
        return getDefaultInsightEditMenuItems(widget, { intl, dispatch, includeInteractions });
    }, [dispatch, intl, widget, includeInteractions]);
    const menuItems = useMemo(() => {
        return insightMenuItemsProvider
            ? insightMenuItemsProvider(insight, widget, defaultMenuItems, closeMenu, "edit")
            : defaultMenuItems;
    }, [insightMenuItemsProvider, insight, widget, defaultMenuItems, closeMenu]);
    return { menuItems };
};
//# sourceMappingURL=useEditableInsightMenu.js.map