// (C) 2022 GoodData Corporation
import { useCallback } from "react";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import { useDashboardDispatch, useDashboardSelector } from "./DashboardStoreProvider.js";
import { selectConfigurationPanelOpened, selectIsInEditMode, selectSelectedWidgetRef, uiActions, } from "../store/index.js";
/**
 * @internal
 */
export function useWidgetSelection(widgetRef) {
    const dispatch = useDashboardDispatch();
    const isConfigPanelOpen = useDashboardSelector(selectConfigurationPanelOpened);
    const isSelectable = useDashboardSelector(selectIsInEditMode);
    const selectedWidget = useDashboardSelector(selectSelectedWidgetRef);
    const isSelected = Boolean(isSelectable && selectedWidget && widgetRef && areObjRefsEqual(selectedWidget, widgetRef));
    const closeConfigPanel = useCallback(() => {
        dispatch(uiActions.setConfigurationPanelOpened(false));
    }, [dispatch]);
    const onSelected = useCallback((e) => {
        if (e) {
            /**
             * Do not stop propagation, just mark event as processed here so that in case come other element
             * up the tree uses the deselectWidgets function. Without this mark such element would immediately
             * deselect the widget we just selected with the same click.
             */
            e.processedDuringWidgetSelect = true;
        }
        if (isSelectable && widgetRef) {
            dispatch(uiActions.selectWidget(widgetRef));
            dispatch(uiActions.setConfigurationPanelOpened(true));
        }
    }, [isSelectable, widgetRef, dispatch]);
    const deselectWidgets = useCallback((e) => {
        if (!(e === null || e === void 0 ? void 0 : e.processedDuringWidgetSelect) && selectedWidget) {
            dispatch(uiActions.clearWidgetSelection());
        }
    }, [dispatch, selectedWidget]);
    return {
        isSelectable,
        isSelected,
        onSelected,
        hasConfigPanelOpen: isConfigPanelOpen && isSelected,
        closeConfigPanel,
        deselectWidgets,
    };
}
//# sourceMappingURL=useWidgetSelection.js.map