// (C) 2021-2022 GoodData Corporation
import { invalidArgumentsProvided } from "../../../events/general.js";
export function availableDrillTargetsValidation(availableDrillTargets, enableKPIDashboardDrillFromAttribute, ctx, cmd) {
    const items = availableDrillTargets;
    const attributeItems = items === null || items === void 0 ? void 0 : items.attributes;
    // Validate availableDrillTargets when enableKPIDashboardDrillFromAttribute FF false, we reject availableDrillTargets attributes to save.
    if (!enableKPIDashboardDrillFromAttribute && attributeItems && attributeItems.length > 0) {
        throw invalidArgumentsProvided(ctx, cmd, `Attributes in availableDrillTargets are not supported when enableKPIDashboardDrillFromAttribute FF is set to false`);
    }
    return items;
}
//# sourceMappingURL=availableDrillTargetsValidation.js.map