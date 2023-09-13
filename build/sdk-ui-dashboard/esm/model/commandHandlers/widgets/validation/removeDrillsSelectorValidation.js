// (C) 2021-2022 GoodData Corporation
import { invalidArgumentsProvided } from "../../../events/general.js";
import { objRefToString } from "@gooddata/sdk-model";
import { validateDrillDefinitionByLocalIdentifier } from "./insightDrillDefinitionUtils.js";
import { isAllDrillSelector } from "../../../commands/insight.js";
export function validateRemoveDrillsByOrigins(drillSelector, drills, ctx, cmd) {
    if (isAllDrillSelector(drillSelector)) {
        return drills;
    }
    return drillSelector.map((drillRef) => {
        try {
            return validateDrillDefinitionByLocalIdentifier(drillRef, drills);
        }
        catch (ex) {
            const messageDetail = ex.message;
            throw invalidArgumentsProvided(ctx, cmd, `Invalid measure or attribute origin: ${objRefToString(drillRef)}. Error: ${messageDetail}`);
        }
    });
}
//# sourceMappingURL=removeDrillsSelectorValidation.js.map