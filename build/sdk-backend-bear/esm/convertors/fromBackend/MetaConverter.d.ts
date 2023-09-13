import { IAttributeDisplayForm, IFact, IMetadataObjectAttribute, IMetadataObjectDataSet, IMetric, IObject, IObjectXrefEntry, IPrompt, ITheme, IWrappedAttribute, IWrappedAttributeDisplayForm, IWrappedDataSet, IWrappedFact, IWrappedMetric, IWrappedPrompt, IWrappedTheme } from "@gooddata/api-model-bear";
import { ObjectType, IMetadataObject, MetadataObject } from "@gooddata/sdk-model";
export type SupportedWrappedMetadataObject = IWrappedAttribute | IWrappedAttributeDisplayForm | IWrappedMetric | IWrappedFact | IWrappedDataSet | IWrappedPrompt | IWrappedTheme;
export type SupportedMetadataObject = IMetadataObjectAttribute | IAttributeDisplayForm | IMetric | IFact | IMetadataObjectDataSet | IPrompt | ITheme;
export declare const convertMetadataObject: (obj: IObject) => MetadataObject;
/**
 * Converts xref entry (result of using/usedBy) into IMetadataObject. There's one gotcha: the production indicator
 * is not available in xref entry. Instead of calling out to the backend, this function will hammer in 'true' - which
 * will be right guess in vast majority of cases (hunt me down when this starts causing bugs :)).
 *
 * @param type - specify object type of the xref entry (code ignores the xref category)
 * @param entry - xref entry
 */
export declare const convertMetadataObjectXrefEntry: (type: ObjectType, entry: IObjectXrefEntry) => IMetadataObject;
//# sourceMappingURL=MetaConverter.d.ts.map