import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IntlShape } from "react-intl";
import { GranteeItem, IGroupedOption, ISelectErrorOption } from "../types.js";
import { ObjRef, IUser } from "@gooddata/sdk-model";
/**
 * @internal
 */
export declare const loadGranteeOptionsPromise: (currentUser: IUser, sharedObjectRef: ObjRef, appliedGrantees: GranteeItem[], backend: IAnalyticalBackend, workspace: string, intl: IntlShape, onGranteesLoaded: (numberOfAvailableGrantees: number) => void) => (inputValue: string) => Promise<IGroupedOption[] | ISelectErrorOption[]>;
//# sourceMappingURL=loadGranteeOptionsPromise.d.ts.map