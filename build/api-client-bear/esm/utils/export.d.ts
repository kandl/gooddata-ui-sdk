import { IBaseExportConfig } from "@gooddata/api-model-bear";
export declare function isExportFinished(response: Response): boolean;
export declare const parseFileNameFromContentDisposition: (response: Response) => string | undefined;
export declare const getFormatContentType: (format: IBaseExportConfig["format"]) => string;
//# sourceMappingURL=export.d.ts.map