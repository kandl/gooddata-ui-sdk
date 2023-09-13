// (C) 2021-2023 GoodData Corporation
import React, { useCallback } from "react";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import { GranteeList } from "./GranteeList.js";
import { isGranteeGroup, isGranteeUser, } from "./types.js";
import { AddGranteeSelect } from "./AddGranteeSelect.js";
/**
 * In case of user and group, we need to make sure, that the added grantee has some default granular permission.
 */
const enrichGranteeWithDefaultPermission = (grantee) => {
    const defaultPermissions = {
        permissions: ["VIEW"],
        inheritedPermissions: [],
    };
    if (isGranteeUser(grantee)) {
        return Object.assign(Object.assign(Object.assign({}, grantee), defaultPermissions), { type: "granularUser" });
    }
    else {
        return Object.assign(Object.assign(Object.assign({}, grantee), defaultPermissions), { type: "granularGroup" });
    }
};
/**
 * @internal
 */
export const AddGranteeContent = (props) => {
    const { appliedGrantees, currentUser, addedGrantees, areGranularPermissionsSupported, currentUserPermissions, isSharedObjectLocked, sharedObjectRef, onDelete, onAddUserOrGroups, onGranularGranteeChange, } = props;
    const onSelectGrantee = useCallback((grantee) => {
        if (!appliedGrantees.some((g) => areObjRefsEqual(g.id, grantee.id))) {
            if (areGranularPermissionsSupported && (isGranteeUser(grantee) || isGranteeGroup(grantee))) {
                onAddUserOrGroups(enrichGranteeWithDefaultPermission(grantee));
            }
            else {
                onAddUserOrGroups(grantee);
            }
        }
    }, [appliedGrantees, onAddUserOrGroups, areGranularPermissionsSupported]);
    return (React.createElement(React.Fragment, null,
        React.createElement(AddGranteeSelect, { currentUser: currentUser, appliedGrantees: appliedGrantees, sharedObjectRef: sharedObjectRef, onSelectGrantee: onSelectGrantee }),
        React.createElement(GranteeList, { currentUserPermissions: currentUserPermissions, isSharedObjectLocked: isSharedObjectLocked, grantees: addedGrantees, mode: "AddGrantee", areGranularPermissionsSupported: areGranularPermissionsSupported, onDelete: onDelete, onChange: onGranularGranteeChange })));
};
//# sourceMappingURL=AddGranteeContent.js.map