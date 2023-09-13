// (C) 2021-2023 GoodData Corporation
import { useCallback } from "react";
import { useBackendStrict, useCancelablePromise, useWorkspaceStrict } from "@gooddata/sdk-ui";
import { mapAccessGranteeDetailToGrantee } from "../../shareDialogMappers.js";
/**
 * @internal
 */
export const useGetAccessList = (props) => {
    const { sharedObjectRef, currentUser, onSuccess, onError } = props;
    const effectiveBackend = useBackendStrict();
    const effectiveWorkspace = useWorkspaceStrict();
    const promise = () => effectiveBackend.workspace(effectiveWorkspace).accessControl().getAccessList(sharedObjectRef);
    const onSuccessCallBack = useCallback((result) => {
        const grantees = result.map((item) => mapAccessGranteeDetailToGrantee(item, currentUser));
        onSuccess(grantees);
    }, [currentUser, onSuccess]);
    useCancelablePromise({ promise, onError, onSuccess: onSuccessCallBack }, [
        effectiveBackend,
        effectiveWorkspace,
        sharedObjectRef,
        onSuccessCallBack,
    ]);
};
//# sourceMappingURL=useGetAccessList.js.map