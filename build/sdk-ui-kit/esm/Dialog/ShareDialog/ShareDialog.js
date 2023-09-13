// (C) 2021-2023 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { BackendProvider, IntlWrapper, UnexpectedSdkError, useBackendStrict, useWorkspaceStrict, WorkspaceProvider, } from "@gooddata/sdk-ui";
import { ShareDialogBase } from "./ShareDialogBase/ShareDialogBase.js";
import { mapGranteesToGranularAccessGrantees, mapGranteesToShareStatus, mapOwnerToGrantee, mapUserToInactiveOwner, mapSharedObjectToAffectedSharedObject, } from "./shareDialogMappers.js";
import { ComponentLabelsProvider } from "./ShareDialogBase/ComponentLabelsContext.js";
import { ComponentInteractionProvider } from "./ShareDialogBase/ComponentInteractionContext.js";
import noop from "lodash/noop.js";
/**
 * @internal
 */
export const ShareDialog = (props) => {
    const { backend, workspace, locale, sharedObject, currentUser, onApply, onCancel, onError, onInteraction = noop, isLockingSupported, isCurrentUserWorkspaceManager, labels, currentUserPermissions, } = props;
    const effectiveBackend = useBackendStrict(backend);
    const effectiveWorkspace = useWorkspaceStrict(workspace);
    const areGranularPermissionsSupported = effectiveBackend.capabilities.supportsGranularAccessControl;
    const isLeniencyControlSupported = !effectiveBackend.capabilities.usesStrictAccessControl;
    const isMetadataObjectLockingSupported = effectiveBackend.capabilities.supportsMetadataObjectLocking;
    const canWorkspaceManagerSeeEverySharedObject = effectiveBackend.capabilities.canWorkspaceManagerSeeEverySharedObject;
    const { createdBy } = sharedObject;
    const { ref: currentUserRef } = currentUser;
    const onShareDialogBaseError = useCallback((err) => {
        onError === null || onError === void 0 ? void 0 : onError(new UnexpectedSdkError(err.message, err));
    }, [onError]);
    const owner = useMemo(() => {
        if (areGranularPermissionsSupported) {
            return undefined;
        }
        if (createdBy) {
            return mapOwnerToGrantee(createdBy, currentUserRef);
        }
        return mapUserToInactiveOwner();
    }, [createdBy, currentUserRef, areGranularPermissionsSupported]);
    const onSubmit = useCallback((grantees, granteesToAdd, granteesToDelete, isUnderLenientControl, isLocked) => {
        const shareStatus = mapGranteesToShareStatus(grantees, granteesToAdd, granteesToDelete);
        const isUnderStrictControl = shareStatus !== "public" && !isUnderLenientControl;
        const addAccess = mapGranteesToGranularAccessGrantees(granteesToAdd, true);
        const revokeAccess = mapGranteesToGranularAccessGrantees(granteesToDelete);
        onApply({
            shareStatus,
            isUnderStrictControl,
            isLocked,
            granteesToAdd: addAccess,
            granteesToDelete: revokeAccess,
        });
    }, [onApply]);
    const affectedSharedObject = useMemo(() => {
        return mapSharedObjectToAffectedSharedObject(sharedObject, owner, isLockingSupported, isLeniencyControlSupported, areGranularPermissionsSupported, isMetadataObjectLockingSupported, canWorkspaceManagerSeeEverySharedObject);
    }, [
        sharedObject,
        owner,
        isLockingSupported,
        isLeniencyControlSupported,
        areGranularPermissionsSupported,
        isMetadataObjectLockingSupported,
        canWorkspaceManagerSeeEverySharedObject,
    ]);
    return (React.createElement(IntlWrapper, { locale: locale },
        React.createElement(BackendProvider, { backend: effectiveBackend },
            React.createElement(WorkspaceProvider, { workspace: effectiveWorkspace },
                React.createElement(ComponentLabelsProvider, { labels: labels },
                    React.createElement(ComponentInteractionProvider, { onInteraction: onInteraction, currentUser: currentUser, currentUserPermissions: currentUserPermissions, isCurrentUserWorkspaceManager: isCurrentUserWorkspaceManager, sharedObjectStatus: affectedSharedObject.shareStatus, isSharedObjectLocked: affectedSharedObject.isLocked },
                        React.createElement(ShareDialogBase, { currentUser: currentUser, sharedObject: affectedSharedObject, isCurrentUserWorkspaceManager: isCurrentUserWorkspaceManager, currentUserPermissions: currentUserPermissions, onCancel: onCancel, onSubmit: onSubmit, onError: onShareDialogBaseError })))))));
};
//# sourceMappingURL=ShareDialog.js.map