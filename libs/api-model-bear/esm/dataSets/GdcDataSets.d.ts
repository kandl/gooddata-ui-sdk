import { Uri, BooleanAsString } from "../base/GdcTypes.js";
import { IObjectMeta } from "../meta/GdcMetadata.js";
/**
 * @public
 */
export interface IDataSetContent {
    attributes: Uri[];
    facts: Uri[];
    dataLoadingColumns: Uri[];
    mode: "SLI" | "DLI" | "";
    urn?: string;
    identifierPrefix?: string;
    titleSuffix?: string;
    ties: Uri[];
    hasUploadConfiguration?: BooleanAsString;
    customUploadTimestamp?: number;
    customUploadIdentifier?: string;
    customUploadState?: string;
}
/**
 * @public
 */
export interface IDataSet {
    meta: IObjectMeta;
    content: IDataSetContent;
    links?: {
        dataUploads: Uri | null;
        uploadConfiguration?: Uri;
    };
}
/**
 * @public
 */
export interface IWrappedDataSet {
    dataSet: IDataSet;
}
//# sourceMappingURL=GdcDataSets.d.ts.map