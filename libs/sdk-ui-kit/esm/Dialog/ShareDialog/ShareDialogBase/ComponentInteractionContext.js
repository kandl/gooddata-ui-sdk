// (C) 2023 GoodData Corporation
import React, { useCallback, useContext, useMemo } from "react";
import noop from "lodash/noop.js";
import { v4 as uuidv4 } from "uuid";
import { getGranularPermissionFromUserPermissions, getIsGranteeCurrentUser } from "./utils.js";
import { isGranularGrantee, isGranularGranteeUser } from "./types.js";
const defaultContext = {
    onInteraction: noop,
    currentUser: undefined,
};
const ComponentInteractionContext = React.createContext(defaultContext);
/**
 * @internal
 */
export const useComponentInteractionContext = () => useContext(ComponentInteractionContext);
/**
 * @internal
 */
export const ComponentInteractionProvider = (props) => {
    const { children, onInteraction, currentUser, currentUserPermissions, isCurrentUserWorkspaceManager, isSharedObjectLocked, sharedObjectStatus, } = props;
    const flowId = useMemo(() => uuidv4(), []);
    const currentUserPermission = useMemo(() => getGranularPermissionFromUserPermissions(currentUserPermissions), [currentUserPermissions]);
    const handleInteraction = useCallback((data) => {
        onInteraction(Object.assign(Object.assign({}, data), { flowId,
            currentUserPermission,
            isSharedObjectLocked,
            sharedObjectStatus,
            isCurrentUserWorkspaceManager }));
    }, [
        onInteraction,
        flowId,
        currentUserPermission,
        isSharedObjectLocked,
        sharedObjectStatus,
        isCurrentUserWorkspaceManager,
    ]);
    return (React.createElement(ComponentInteractionContext.Provider, { value: {
            onInteraction: handleInteraction,
            currentUser,
        } }, children));
};
export const useShareDialogInteraction = () => {
    const { onInteraction, currentUser } = useComponentInteractionContext();
    const openInteraction = useCallback(() => onInteraction({
        type: "SHARE_DIALOG_OPENED",
    }), [onInteraction]);
    const closeInteraction = useCallback(() => onInteraction({
        type: "SHARE_DIALOG_CLOSED",
    }), [onInteraction]);
    const saveInteraction = useCallback(() => onInteraction({
        type: "SHARE_DIALOG_SAVED",
    }), [onInteraction]);
    const permissionsDropdownOpenInteraction = useCallback((grantee, isExistingGrantee, granteeEffectivePermission) => {
        if (!isGranularGrantee(grantee)) {
            return;
        }
        onInteraction({
            type: "SHARE_DIALOG_PERMISSIONS_DROPDOWN_OPENED",
            isCurrentUserSelfUpdating: getIsGranteeCurrentUser(grantee.id, currentUser),
            isExistingGrantee,
            granteeType: isGranularGranteeUser(grantee) ? "user" : "group",
            granteeEffectivePermission,
        });
    }, [onInteraction, currentUser]);
    const permissionsChangeInteraction = useCallback((grantee, isExistingGrantee, granteeEffectivePermission, granteeUpdatedPermission) => {
        if (!isGranularGrantee(grantee)) {
            return;
        }
        onInteraction({
            type: "SHARE_DIALOG_PERMISSIONS_CHANGED",
            isCurrentUserSelfUpdating: getIsGranteeCurrentUser(grantee.id, currentUser),
            isExistingGrantee,
            granteeType: isGranularGranteeUser(grantee) ? "user" : "group",
            granteeEffectivePermission,
            granteeUpdatedPermission,
        });
    }, [onInteraction, currentUser]);
    const permissionsRemoveInteraction = useCallback((grantee, isExistingGrantee, granteeEffectivePermission) => {
        if (!isGranularGrantee(grantee)) {
            return;
        }
        onInteraction({
            type: "SHARE_DIALOG_GRANTEE_REMOVED",
            isCurrentUserSelfUpdating: getIsGranteeCurrentUser(grantee.id, currentUser),
            isExistingGrantee,
            granteeType: isGranularGranteeUser(grantee) ? "user" : "group",
            granteeEffectivePermission,
        });
    }, [onInteraction, currentUser]);
    const granteeAddInteraction = useCallback((grantee) => {
        if (!isGranularGrantee(grantee)) {
            return;
        }
        onInteraction({
            type: "SHARE_DIALOG_GRANTEE_ADDED",
            granteeType: isGranularGranteeUser(grantee) ? "user" : "group",
        });
    }, [onInteraction]);
    const availableGranteeListOpenInteraction = useCallback((numberOfAvailableGrantees) => onInteraction({ type: "SHARE_DIALOG_AVAILABLE_GRANTEE_LIST_OPENED", numberOfAvailableGrantees }), [onInteraction]);
    return {
        openInteraction,
        closeInteraction,
        saveInteraction,
        permissionsDropdownOpenInteraction,
        permissionsChangeInteraction,
        permissionsRemoveInteraction,
        granteeAddInteraction,
        availableGranteeListOpenInteraction,
    };
};
//# sourceMappingURL=ComponentInteractionContext.js.map