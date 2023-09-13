import { IDataSetMetadataObject, ObjRef } from "@gooddata/sdk-model";
/**
 * @internal
 */
export declare function useAttributeDataSet(displayForm: ObjRef, loadQuery?: boolean): {
    attributeDataSet: IDataSetMetadataObject | undefined;
    attributesDataSetLoading: boolean;
    attributesDataSetLoadingError: import("@gooddata/sdk-ui").GoodDataSdkError | undefined;
};
