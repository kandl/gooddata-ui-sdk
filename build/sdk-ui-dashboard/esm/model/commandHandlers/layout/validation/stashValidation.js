// (C) 2021-2022 GoodData Corporation
import { isStashedDashboardItemsId, } from "../../../types/layoutTypes.js";
/**
 * Given layout stash and a list of dashboard item definitions, this function will validate and resolve those
 * item definitions into actual dashboard items that can be added onto the layout.
 *
 * The dashboard item definitions provided as input in the commands may contain mix of actual dashboard items
 * and identifiers of stashes that contain the actual items. This function resolves any stashes that may be
 * included on the input into the actual items and returns them so that the rest of the code does not have
 * to care about the stashes anymore.
 *
 * @param stash - current state of the layout stash
 * @param itemDefinitions - item definitions
 */
export function validateAndResolveStashedItems(stash, itemDefinitions) {
    const result = {
        missing: [],
        existing: [],
        resolved: [],
        newItemBitmap: [],
    };
    itemDefinitions.forEach((item) => {
        if (!isStashedDashboardItemsId(item)) {
            result.resolved.push(item);
            result.newItemBitmap.push(true);
            return;
        }
        if (stash[item] !== undefined) {
            result.existing.push(item);
            result.resolved.push(...stash[item]);
            result.newItemBitmap.push(...stash[item].map((_) => false));
        }
        else {
            result.missing.push(item);
        }
    });
    return result;
}
//# sourceMappingURL=stashValidation.js.map