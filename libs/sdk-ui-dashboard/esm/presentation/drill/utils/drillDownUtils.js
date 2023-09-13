// (C) 2020-2023 GoodData Corporation
import { isDrillToLegacyDashboard } from "@gooddata/sdk-model";
import { isDrillIntersectionAttributeItem } from "@gooddata/sdk-ui";
import isEqual from "lodash/isEqual.js";
import compact from "lodash/compact.js";
import uniqWith from "lodash/uniqWith.js";
import { getDrillOriginLocalIdentifier, isDrillConfigured } from "../../../_staging/drills/drillingUtils.js";
import { isDrillToUrl } from "../types.js";
/**
 * @internal
 */
export function getDrillDownAttributeTitle(localIdentifier, drillEvent) {
    return (drillEvent.drillContext.intersection || [])
        .map((intersectionElement) => intersectionElement.header)
        .filter(isDrillIntersectionAttributeItem)
        .filter((intersectionAttributeItem) => intersectionAttributeItem.attributeHeader.localIdentifier === localIdentifier)
        .map((intersectionAttributeItem) => intersectionAttributeItem.attributeHeaderItem.name)[0];
}
/**
 * Get total number of IDrillToUrl
 * @internal
 */
export function getTotalDrillToUrlCount(drillDefinition) {
    return drillDefinition.filter(isDrillToUrl).length;
}
/**
 * Implicit drill (currently IDrillDownDefinition and implicit IDrillToAttributeUrl) has lower priority,
 * so needs to be removed when other drill config exists for the same attribute
 *
 * @internal
 */
export function filterDrillFromAttributeByPriority(drillDefinitions, configuredDrills = []) {
    // need create deep equal unique drills array because we can get same two drills that are configured and implicit e.g. IDrillToAttributeUrl
    // and is not able to configure more drills on one origin
    // configured once has higher priority
    const uniqueDrillDefinitions = uniqWith(drillDefinitions, isEqual);
    const drillOriginsWithoutImplicitDrills = compact(uniqueDrillDefinitions.map((drill) => {
        if (!isDrillToLegacyDashboard(drill) && isDrillConfigured(drill, configuredDrills)) {
            return getDrillOriginLocalIdentifier(drill);
        }
    }));
    return uniqueDrillDefinitions.filter((drill) => {
        if (isDrillToLegacyDashboard(drill)) {
            return true;
        }
        if (!isDrillConfigured(drill, configuredDrills)) {
            return !drillOriginsWithoutImplicitDrills.includes(getDrillOriginLocalIdentifier(drill));
        }
        return true;
    });
}
//# sourceMappingURL=drillDownUtils.js.map