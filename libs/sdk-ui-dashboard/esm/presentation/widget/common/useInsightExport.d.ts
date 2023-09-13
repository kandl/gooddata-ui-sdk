import { IInsightDefinition, ObjRef } from "@gooddata/sdk-model";
export declare const useInsightExport: (config: {
    title: string;
    widgetRef: ObjRef;
    insight: IInsightDefinition;
}) => {
    exportCSVEnabled: boolean;
    exportXLSXEnabled: boolean;
    onExportCSV: () => void;
    onExportXLSX: () => void;
};
