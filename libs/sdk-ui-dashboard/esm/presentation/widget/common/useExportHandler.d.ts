import { IExportResult } from "@gooddata/sdk-backend-spi";
import { IExtendedExportConfig } from "@gooddata/sdk-ui";
type ExportHandler = (exportFunction: (config: IExtendedExportConfig) => Promise<IExportResult>, exportConfig: IExtendedExportConfig) => Promise<void>;
export declare const useExportHandler: () => ExportHandler;
export {};
