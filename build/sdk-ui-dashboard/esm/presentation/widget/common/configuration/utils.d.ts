import { ICatalogDateDataset, IInsightDefinition, IAttributeMetadataObject, ObjRef } from "@gooddata/sdk-model";
export declare function getUnrelatedDateDataset(relatedDateDataSets: readonly ICatalogDateDataset[], selectedDateDataSet: ICatalogDateDataset | undefined, selectedDateDataSetHidden: boolean | undefined): ICatalogDateDataset | undefined;
export declare function getDateOptionsDisabledForInsight(insight: IInsightDefinition): boolean;
export declare function removeDateFromTitle(title: string): string;
export declare function getAttributeByDisplayForm(attributes: IAttributeMetadataObject[], displayForm: ObjRef): IAttributeMetadataObject | undefined;
