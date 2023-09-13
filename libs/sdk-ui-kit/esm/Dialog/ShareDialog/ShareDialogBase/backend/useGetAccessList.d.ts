import { ObjRef, IUser } from "@gooddata/sdk-model";
import { GranteeItem } from "../types.js";
/**
 * @internal
 */
interface IUseGetAccessListProps {
    sharedObjectRef: ObjRef;
    currentUser: IUser;
    onSuccess: (result: GranteeItem[]) => void;
    onError: (err: Error) => void;
}
/**
 * @internal
 */
export declare const useGetAccessList: (props: IUseGetAccessListProps) => void;
export {};
//# sourceMappingURL=useGetAccessList.d.ts.map