// (C) 2020-2022 GoodData Corporation
import { useCallback, useState } from "react";
import isEqual from "lodash/isEqual.js";
import { useDashboardSelector, selectImplicitDrillsByAvailableDrillTargets, selectDrillableItemsByAvailableDrillTargets, } from "../../../../../model/index.js";
import { DataViewFacade, isSomeHeaderPredicateMatched, } from "@gooddata/sdk-ui";
/**
 * @internal
 */
export const useDrillDialogInsightDrills = ({ widget, insight, onDrill: onDrillFn, }) => {
    // Drilling
    const [drillTargets, setDrillTargets] = useState();
    const onPushData = useCallback((data) => {
        if ((data === null || data === void 0 ? void 0 : data.availableDrillTargets) && !isEqual(drillTargets, data.availableDrillTargets)) {
            setDrillTargets(data.availableDrillTargets);
        }
    }, [drillTargets]);
    const implicitDrillDefinitions = useDashboardSelector(selectImplicitDrillsByAvailableDrillTargets(drillTargets));
    const drillableItems = useDashboardSelector(selectDrillableItemsByAvailableDrillTargets(drillTargets));
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
//# sourceMappingURL=useDrillDialogInsightDrills.js.map