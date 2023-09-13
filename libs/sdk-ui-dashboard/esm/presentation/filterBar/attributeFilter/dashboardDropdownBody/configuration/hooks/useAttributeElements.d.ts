import { ObjRef } from "@gooddata/sdk-model";
import { IUseAttributeElements } from "../../../../../../model/index.js";
/**
 * @internal
 */
export declare function useAttributeElements(displayForm: ObjRef, limit?: number, loadQuery?: boolean): {
    attributeElements: IUseAttributeElements | undefined;
    attributesElementsLoading: boolean;
    attributeElementsLoadingError: import("@gooddata/sdk-ui").GoodDataSdkError | undefined;
};
