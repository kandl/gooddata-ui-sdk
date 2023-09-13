// (C) 2022 GoodData Corporation
import React, { useCallback, useEffect, useRef } from "react";
import { invariant } from "ts-invariant";
import { isKpiPlaceholderWidget } from "../../../widgets/index.js";
import { eagerRemoveSectionItem, selectWidgetCoordinatesByRef, uiActions, useDashboardDispatch, useDashboardSelector, useWidgetSelection, } from "../../../model/index.js";
import { DashboardItem, DashboardItemContent } from "../../presentationComponents/index.js";
import { ConfigurationBubble } from "../common/index.js";
import { KpiPlaceholderConfigurationPanel } from "./KpiPlaceholderConfigurationPanel.js";
/**
 * @internal
 */
export const DefaultDashboardKpiPlaceholderWidget = (props) => {
    const { widget, screen } = props;
    invariant(isKpiPlaceholderWidget(widget));
    const dispatch = useDashboardDispatch();
    const { itemIndex, sectionIndex } = useDashboardSelector(selectWidgetCoordinatesByRef(widget.ref));
    const { isSelectable, isSelected } = useWidgetSelection(widget.ref);
    // keep information if this widget has been selected in the past
    const wasSelected = useRef(isSelected);
    useEffect(() => {
        if (isSelected) {
            wasSelected.current = true;
        }
    }, [isSelected]);
    useEffect(() => {
        // if the widget was selected in the past and is now not selected, it has just been unselected
        // -> remove its widget placeholder
        if (wasSelected.current && !isSelected) {
            dispatch(eagerRemoveSectionItem(sectionIndex, itemIndex));
        }
    }, [dispatch, isSelected, itemIndex, sectionIndex]);
    const onClose = useCallback(() => {
        dispatch(uiActions.setConfigurationPanelOpened(false));
        dispatch(eagerRemoveSectionItem(sectionIndex, itemIndex));
    }, [dispatch, itemIndex, sectionIndex]);
    return (React.createElement(DashboardItem, { className: "is-selected is-placeholder is-edit-mode", screen: screen },
        React.createElement(DashboardItemContent, { isSelected: isSelected, isSelectable: isSelectable },
            React.createElement(ConfigurationBubble, { onClose: onClose },
                React.createElement(KpiPlaceholderConfigurationPanel, { widget: widget, onClose: onClose })),
            React.createElement("div", { className: "kpi-placeholder select-measure" }))));
};
//# sourceMappingURL=DefaultDashboardKpiPlaceholderWidget.js.map