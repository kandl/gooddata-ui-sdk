// (C) 2021-2023 GoodData Corporation
import { useCallback, useMemo, useState } from "react";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import isEqual from "lodash/isEqual.js";
import { isGranteeUserInactive, isGranularGrantee, } from "./types.js";
import { notInArrayFilter, getAppliedGrantees } from "./utils.js";
import { useGetAccessList } from "./backend/useGetAccessList.js";
import { mapShareStatusToGroupAll } from "../shareDialogMappers.js";
import { useShareDialogInteraction } from "./ComponentInteractionContext.js";
/**
 * @internal
 */
const useShareDialogState = (isUnderLenientControl, isLocked) => {
    const [dialogMode, setDialogMode] = useState("ShareGrantee");
    const [isGranteesLoading, setIsGranteesLoading] = useState(true);
    const [grantees, setGrantees] = useState([]);
    const [granteesToAdd, setGranteesToAdd] = useState([]);
    const [granteesToDelete, setGranteesToDelete] = useState([]);
    const [granteesToUpdate, setGranteesToUpdate] = useState([]);
    const [isUnderLenientControlNow, setUnderLenientControlNow] = useState(isUnderLenientControl);
    const [isLockedNow, setLockedNow] = useState(isLocked);
    const [originalGranularGrantees, setOriginalGranularGrantees] = useState([]);
    const { granteeAddInteraction } = useShareDialogInteraction();
    const onGranularGranteeAddChange = useCallback((grantee) => {
        setGranteesToAdd((state) => state.map((s) => (areObjRefsEqual(s.id, grantee.id) ? grantee : s)));
    }, []);
    const onSharedGranteeDelete = useCallback((grantee) => {
        setGranteesToDelete((state) => [...state, grantee]);
        setGranteesToUpdate((state) => state.filter((s) => !areObjRefsEqual(s.id, grantee.id)));
    }, []);
    const onAddedGranteeDelete = useCallback((grantee) => {
        setGranteesToAdd((state) => state.filter((g) => !areObjRefsEqual(g.id, grantee.id)));
    }, []);
    const onGranteeAdd = useCallback((grantee) => {
        setGranteesToAdd((state) => [...state, grantee]);
        granteeAddInteraction(grantee);
    }, [granteeAddInteraction]);
    const onGranularGranteeShareChange = useCallback((grantee) => {
        const originalGrantee = originalGranularGrantees.find((g) => areObjRefsEqual(g.id, grantee.id));
        const hasChangedPermissions = !isEqual(originalGrantee === null || originalGrantee === void 0 ? void 0 : originalGrantee.permissions, grantee.permissions);
        setGranteesToUpdate((state) => {
            const filteredUpdatedGrantees = state.filter((s) => !areObjRefsEqual(s.id, grantee.id));
            const isAlreadyUpdated = filteredUpdatedGrantees.length !== state.length;
            if (isAlreadyUpdated && !hasChangedPermissions) {
                return filteredUpdatedGrantees;
            }
            return [...filteredUpdatedGrantees, grantee];
        });
        setGrantees((state) => state.map((s) => (areObjRefsEqual(s.id, grantee.id) ? grantee : s)));
    }, [originalGranularGrantees]);
    const onAddGranteeButtonClick = useCallback(() => {
        setDialogMode("AddGrantee");
    }, []);
    const onAddGranteeBackClick = useCallback(() => {
        setDialogMode("ShareGrantee");
        setGranteesToAdd([]);
    }, []);
    const onLoadGrantees = useCallback((grantees, groupAll) => {
        if (groupAll) {
            const allGrantees = [...grantees, groupAll];
            setGrantees(allGrantees);
            setOriginalGranularGrantees(allGrantees.filter(isGranularGrantee));
        }
        else {
            setGrantees(grantees);
            setOriginalGranularGrantees(grantees.filter(isGranularGrantee));
        }
        setIsGranteesLoading(false);
    }, []);
    const onUnderLenientControlChange = useCallback((isUnderLenientControl) => {
        setUnderLenientControlNow(isUnderLenientControl);
    }, []);
    const onLockChange = useCallback((isLocked) => {
        setLockedNow(isLocked);
    }, []);
    return {
        dialogMode,
        isGranteesLoading,
        grantees,
        granteesToAdd,
        granteesToDelete,
        granteesToUpdate,
        onLoadGrantees,
        onSharedGranteeDelete,
        onAddedGranteeDelete,
        onGranteeAdd,
        onAddGranteeButtonClick,
        onAddGranteeBackClick,
        isUnderLenientControlNow,
        isLockedNow,
        onUnderLenientControlChange,
        onLockChange,
        onGranularGranteeShareChange,
        onGranularGranteeAddChange,
    };
};
/**
 * @internal
 */
export const useShareDialogBase = (props) => {
    const { sharedObject, currentUser, onSubmit, onError } = props;
    const { ref, shareStatus, owner, isUnderLenientControl, isLocked, areGranularPermissionsSupported } = sharedObject;
    const { saveInteraction: shareDialogSaveInteraction } = useShareDialogInteraction();
    const { dialogMode, isGranteesLoading, isLockedNow, isUnderLenientControlNow, grantees, granteesToAdd, granteesToDelete, granteesToUpdate, onLoadGrantees, onSharedGranteeDelete, onAddedGranteeDelete, onGranteeAdd, onAddGranteeButtonClick, onAddGranteeBackClick, onLockChange, onUnderLenientControlChange, onGranularGranteeAddChange, onGranularGranteeShareChange, } = useShareDialogState(isUnderLenientControl, isLocked);
    const onLoadGranteesSuccess = useCallback((result) => {
        if (areGranularPermissionsSupported) {
            onLoadGrantees(result, undefined);
        }
        else {
            const groupAll = mapShareStatusToGroupAll(shareStatus);
            onLoadGrantees(result, groupAll);
        }
    }, [onLoadGrantees, shareStatus, areGranularPermissionsSupported]);
    useGetAccessList({ currentUser, sharedObjectRef: ref, onSuccess: onLoadGranteesSuccess, onError });
    const isShareDialogDirty = useMemo(() => {
        if (areGranularPermissionsSupported) {
            return granteesToUpdate.length !== 0 || granteesToDelete.length !== 0;
        }
        else {
            return (granteesToDelete.length !== 0 ||
                isLocked !== isLockedNow ||
                isUnderLenientControl !== isUnderLenientControlNow);
        }
    }, [
        granteesToUpdate,
        granteesToDelete,
        isLocked,
        isLockedNow,
        isUnderLenientControl,
        isUnderLenientControlNow,
        areGranularPermissionsSupported,
    ]);
    const isAddDialogDirty = useMemo(() => {
        return granteesToAdd.length !== 0;
    }, [granteesToAdd]);
    const onSubmitShareGrantee = useCallback(() => {
        if (!isShareDialogDirty) {
            return;
        }
        const allGranteesToAdd = [...granteesToAdd, ...granteesToUpdate];
        shareDialogSaveInteraction();
        onSubmit(grantees, allGranteesToAdd, granteesToDelete, isUnderLenientControlNow, isLockedNow);
    }, [
        grantees,
        granteesToUpdate,
        granteesToAdd,
        granteesToDelete,
        isShareDialogDirty,
        isUnderLenientControlNow,
        isLockedNow,
        onSubmit,
        shareDialogSaveInteraction,
    ]);
    const onSubmitAddGrantee = useCallback(() => {
        if (!isAddDialogDirty) {
            return;
        }
        const allGranteesToAdd = [...granteesToAdd, ...granteesToUpdate];
        shareDialogSaveInteraction();
        onSubmit(grantees, allGranteesToAdd, granteesToDelete, isUnderLenientControlNow, isLockedNow);
    }, [
        grantees,
        granteesToUpdate,
        granteesToAdd,
        granteesToDelete,
        isAddDialogDirty,
        isUnderLenientControlNow,
        isLockedNow,
        onSubmit,
        shareDialogSaveInteraction,
    ]);
    const sharedGrantees = useMemo(() => {
        return notInArrayFilter(grantees, granteesToDelete);
    }, [grantees, granteesToDelete]);
    const appliedGranteesWithOwner = useMemo(() => {
        const appliedGrantees = getAppliedGrantees(grantees, granteesToAdd, granteesToDelete);
        if (isGranteeUserInactive(owner) || areGranularPermissionsSupported) {
            return appliedGrantees;
        }
        return [...appliedGrantees, owner];
    }, [grantees, granteesToDelete, granteesToAdd, areGranularPermissionsSupported, owner]);
    return {
        onAddedGranteeDelete,
        onSharedGranteeDelete,
        onAddGranteeBackClick,
        onAddGranteeButtonClick,
        onGranteeAdd,
        onSubmitShareGrantee,
        onSubmitAddGrantee,
        isGranteesLoading,
        granteesToAdd,
        dialogMode,
        isShareDialogDirty,
        isAddDialogDirty,
        sharedGrantees,
        appliedGranteesWithOwner,
        onLockChange,
        onUnderLenientControlChange,
        onGranularGranteeShareChange,
        onGranularGranteeAddChange,
        isUnderLenientControlNow,
        isLockedNow,
    };
};
//# sourceMappingURL=useShareDialogBase.js.map