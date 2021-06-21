// (C) 2020-2021 GoodData Corporation

import { IDrillEvent, isDrillIntersectionAttributeItem } from "@gooddata/sdk-ui";
import { IInsight } from "@gooddata/sdk-model";
import { IDrillDownDefinition, isDrillDownDefinition } from "@gooddata/sdk-ui-ext";
import { IDrillDownContext } from "@gooddata/sdk-ui-ext/esm/internal";
import { DashboardDrillDefinition, DashboardDrillEvent, isKpiDrillEvent } from "../Types";

export function getDrillDownAttributeTitle(drill: IDrillDownDefinition, drillEvent: IDrillEvent) {
    return (drillEvent.drillContext.intersection || [])
        .map((intersectionElement) => intersectionElement.header)
        .filter(isDrillIntersectionAttributeItem)
        .filter(
            (intersectionAttributeItem) =>
                intersectionAttributeItem.attributeHeader.localIdentifier === drill.origin.localIdentifier,
        )
        .map((intersectionAttributeItem) => intersectionAttributeItem.attributeHeaderItem.name)[0];
}

export function getDrillDownTarget(
    sourceInsight: IInsight,
    event: DashboardDrillEvent,
    drillDefinition: DashboardDrillDefinition,
    conversionFn: (source: IInsight, drillDownContext: IDrillDownContext) => IInsight,
): IInsight | null {
    if (!isDrillDownDefinition(drillDefinition) || isKpiDrillEvent(event)) {
        return null;
    }

    return conversionFn(sourceInsight, { drillDefinition, event });
}
