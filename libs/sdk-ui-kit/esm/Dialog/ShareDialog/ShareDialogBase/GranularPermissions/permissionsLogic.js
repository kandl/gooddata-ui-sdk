// (C) 2023 GoodData Corporation
import { invariant } from "ts-invariant";
import { isGranularGranteeUser, } from "../types.js";
import { granularPermissionMessageTooltips } from "../../../../locales.js";
const allPermissionsSorted = ["EDIT", "SHARE", "VIEW"];
export const getEffectivePermission = (permissions, inheritedPermissions, isSharedObjectLocked) => {
    const allUserPermissions = [...permissions, ...inheritedPermissions];
    const effectivePermission = allPermissionsSorted.find((permission) => allUserPermissions.includes(permission));
    invariant(effectivePermission, "Provided item permissions are incomplete or invalid");
    if (isSharedObjectLocked && effectivePermission === "EDIT") {
        return "SHARE";
    }
    return effectivePermission;
};
const disableWithTooltip = (possibility, tooltip) => {
    possibility.enabled = false;
    possibility.tooltip = tooltip;
};
const getPermissionTypeItems = (grantee, currentUserPermissions, isSharedObjectLocked) => {
    return allPermissionsSorted.map((permission, permissionIndex) => {
        const item = {
            id: permission,
            enabled: true,
            tooltip: "",
            hidden: false,
        };
        // don't allow setting permissions higher that the current user
        if ((permission === "EDIT" && !currentUserPermissions.canEditAffectedObject) ||
            (permission === "SHARE" && !currentUserPermissions.canShareAffectedObject) ||
            !currentUserPermissions.canViewAffectedObject) {
            disableWithTooltip(item, "shareDialog.share.granular.grantee.tooltip.cannotGrantHigher");
        }
        // hide Edit & share on inherited object
        if (permission === "EDIT" && isSharedObjectLocked) {
            item.hidden = true;
        }
        // don't allow setting permission lower that permission obtained indirectly
        grantee.inheritedPermissions.forEach((inheritedPermission) => {
            const inheritedPermissionIndex = allPermissionsSorted.indexOf(inheritedPermission);
            if (permissionIndex > inheritedPermissionIndex) {
                disableWithTooltip(item, isGranularGranteeUser(grantee)
                    ? granularPermissionMessageTooltips.cannotGrantLowerForUser.id
                    : granularPermissionMessageTooltips.cannotGrantLowerForGroup.id);
            }
        });
        return item;
    });
};
export const getGranteePossibilities = (grantee, currentUserPermissions, isSharedObjectLocked) => {
    const granteeEffectivePermission = getEffectivePermission(grantee.permissions, grantee.inheritedPermissions, isSharedObjectLocked);
    // the "Remove" option state
    const remove = {
        enabled: true,
        tooltip: "",
    };
    // state of the whole permissions selection dropdown
    const change = {
        enabled: true,
        tooltip: "",
    };
    //state of the permissions selection dropdown items
    const permissionTypeItems = getPermissionTypeItems(grantee, currentUserPermissions, isSharedObjectLocked);
    // cannot change or remove permissions of a grantee that has higher permission than the current user
    if ((granteeEffectivePermission === "EDIT" && !currentUserPermissions.canEditAffectedObject) ||
        (granteeEffectivePermission === "SHARE" && !currentUserPermissions.canShareAffectedObject)) {
        const tooltipId = isGranularGranteeUser(grantee)
            ? granularPermissionMessageTooltips.cannotChangeHigherForUser.id
            : granularPermissionMessageTooltips.cannotChangeHigherForGroup.id;
        disableWithTooltip(change, tooltipId);
        disableWithTooltip(remove, tooltipId);
    }
    // cannot remove permission that is defined on the object in parent workspace
    if (grantee.permissions.length === 0 && grantee.inheritedPermissions.length !== 0) {
        disableWithTooltip(remove, isGranularGranteeUser(grantee)
            ? granularPermissionMessageTooltips.cannotRemoveFromParentForUser.id
            : granularPermissionMessageTooltips.cannotRemoveFromParentForGroup.id);
    }
    // disable all permissions change if all assignment options are disabled and also the Remove option is disabled
    if (change.enabled &&
        !remove.enabled &&
        permissionTypeItems.every((item) => !item.enabled || item.hidden || item.id === granteeEffectivePermission)) {
        disableWithTooltip(change, isGranularGranteeUser(grantee)
            ? granularPermissionMessageTooltips.noChangeAvailableForUser.id
            : granularPermissionMessageTooltips.noChangeAvailableForGroup.id);
    }
    return {
        remove,
        assign: {
            items: permissionTypeItems,
            effective: granteeEffectivePermission,
        },
        change,
    };
};
//# sourceMappingURL=permissionsLogic.js.map