import { IAttributeMetadataObject, ObjRef } from "@gooddata/sdk-model";
/**
 * @internal
 */
export declare function useAttributes(displayForms: ObjRef[]): {
    attributes: IAttributeMetadataObject[] | undefined;
    attributesLoading: boolean;
    attributesLoadingError: import("@gooddata/sdk-ui").GoodDataSdkError | undefined;
};
