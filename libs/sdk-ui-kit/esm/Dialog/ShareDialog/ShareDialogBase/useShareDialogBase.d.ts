import { DialogModeType, GranteeItem, IShareDialogBaseProps } from "./types.js";
/**
 * @internal
 */
export interface IUseShareDialogBaseReturnType {
    onAddedGranteeDelete: (grantee: GranteeItem) => void;
    onSharedGranteeDelete: (grantee: GranteeItem) => void;
    onAddGranteeBackClick: () => void;
    onAddGranteeButtonClick: () => void;
    onGranteeAdd: (grantee: GranteeItem) => void;
    onSubmitShareGrantee: () => void;
    onSubmitAddGrantee: () => void;
    isGranteesLoading: boolean;
    granteesToAdd: GranteeItem[];
    dialogMode: DialogModeType;
    isShareDialogDirty: boolean;
    isAddDialogDirty: boolean;
    sharedGrantees: GranteeItem[];
    appliedGranteesWithOwner: GranteeItem[];
    isLockedNow: boolean;
    isUnderLenientControlNow: boolean;
    onLockChange: (locked: boolean) => void;
    onUnderLenientControlChange: (isUnderLenientControl: boolean) => void;
    onGranularGranteeShareChange?: (grantee: GranteeItem) => void;
    onGranularGranteeAddChange?: (grantee: GranteeItem) => void;
}
/**
 * @internal
 */
export declare const useShareDialogBase: (props: IShareDialogBaseProps) => IUseShareDialogBaseReturnType;
//# sourceMappingURL=useShareDialogBase.d.ts.map