// (C) 2020-2022 GoodData Corporation
import { useCallback, useMemo } from "react";
import isEqual from "lodash/isEqual.js";
import { useDashboardSelector, useDashboardDispatch, selectDrillTargetsByWidgetRef, addDrillTargets, selectDrillableItemsByWidgetRef, selectConfiguredAndImplicitDrillsByWidgetRef, selectIsInEditMode, selectEnableKPIDashboardDrillFromAttribute, } from "../../../../../model/index.js";
import { DataViewFacade, isSomeHeaderPredicateMatched, } from "@gooddata/sdk-ui";
/**
 * @internal
 */
export const useDashboardInsightDrills = ({ widget, insight, onDrill: onDrillFn, }) => {
    const dispatch = useDashboardDispatch();
    const drillTargets = useDashboardSelector(selectDrillTargetsByWidgetRef(widget.ref));
    const isDrillFromAttributeEnabled = useDashboardSelector(selectEnableKPIDashboardDrillFromAttribute);
    const onPushData = useCallback((data) => {
        const targets = sanitizeAvailableDrillTargets(data === null || data === void 0 ? void 0 : data.availableDrillTargets, isDrillFromAttributeEnabled);
        if (targets && !isEqual(drillTargets === null || drillTargets === void 0 ? void 0 : drillTargets.availableDrillTargets, targets)) {
            dispatch(addDrillTargets(widget.ref, targets));
        }
    }, [drillTargets, widget.ref, isDrillFromAttributeEnabled, dispatch]);
    const isInEditMode = useDashboardSelector(selectIsInEditMode);
    const rawDrillableItems = useDashboardSelector(selectDrillableItemsByWidgetRef(widget.ref));
    const drillableItems = useMemo(() => {
        return isInEditMode ? [] : rawDrillableItems;
    }, [isInEditMode, rawDrillableItems]);
    const implicitDrillDefinitions = useDashboardSelector(selectConfiguredAndImplicitDrillsByWidgetRef(widget.ref));
    const onDrill = onDrillFn
        ? (event) => {
            const facade = DataViewFacade.for(event.dataView);
            const matchingImplicitDrillDefinitions = implicitDrillDefinitions.filter((info) => {
                var _a;
                return (_a = event.drillContext.intersection) === null || _a === void 0 ? void 0 : _a.some((intersection) => isSomeHeaderPredicateMatched(info.predicates, intersection.header, facade));
            });
            const drillEvent = Object.assign(Object.assign({}, event), { widgetRef: widget.ref, drillDefinitions: matchingImplicitDrillDefinitions.map((info) => info.drillDefinition) });
            return (typeof onDrillFn === "function" &&
                onDrillFn(drillEvent, {
                    insight,
                    widget,
                }));
        }
        : undefined;
    return {
        drillableItems,
        onPushData,
        onDrill,
    };
};
const sanitizeAvailableDrillTargets = (availableDrillTargets, isDrillFromAttributeEnabled) => {
    // if no drill targets went in (likely the pushData was fired in a non-drill-related case)
    // pass the undefined through, this avoids useless setting of the drill targets down the line
    if (!availableDrillTargets) {
        return availableDrillTargets;
    }
    // base on ff we remove attributes targets if is not supported
    return isDrillFromAttributeEnabled
        ? availableDrillTargets
        : Object.assign(Object.assign({}, availableDrillTargets), { attributes: undefined });
};
//# sourceMappingURL=useDashboardInsightDrills.js.map