import { ObjRef } from "@gooddata/sdk-model";
import { IConnectingAttribute } from "../../../../../../model/index.js";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
interface IUseConnectingAttributesResult {
    connectingAttributes: IConnectingAttribute[][] | undefined;
    connectingAttributesLoading: boolean;
    connectingAttributesError: GoodDataSdkError | undefined;
}
/**
 * @internal
 */
export declare function useConnectingAttributes(currentFilterDisplayForm: ObjRef, neighborFiltersDisplayForms: ObjRef[]): IUseConnectingAttributesResult;
export {};
