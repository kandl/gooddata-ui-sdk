import { DateAttributeGranularity, ObjRef, ICatalogDateDataset, ICatalogDateAttribute, IAttributeDisplayFormMetadataObject, IAttributeMetadataObject, IDataSetMetadataObject } from "@gooddata/sdk-model";
import { Builder, BuilderModifications } from "../builder.js";
import { AttributeMetadataObjectBuilder } from "../metadata/attributeFactory.js";
import { AttributeDisplayFormMetadataObjectBuilder } from "../metadata/displayFormFactory.js";
import { DataSetMetadataObjectBuilder } from "../metadata/dataSetFactory.js";
/**
 * Catalog date attribute builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class CatalogDateAttributeBuilder<T extends ICatalogDateAttribute = ICatalogDateAttribute> extends Builder<T> {
    granularity(granularity: DateAttributeGranularity): this;
    attribute(attributeOrRef: IAttributeMetadataObject | ObjRef, modifications?: BuilderModifications<AttributeMetadataObjectBuilder>): this;
    defaultDisplayForm(displayFormOrRef: IAttributeDisplayFormMetadataObject | ObjRef, modifications?: BuilderModifications<AttributeDisplayFormMetadataObjectBuilder>): this;
}
/**
 * Catalog date attribute factory
 *
 * @param modifications - catalog date attribute builder modifications to perform
 * @returns created catalog date attribute
 * @beta
 */
export declare const newCatalogDateAttribute: (modifications?: BuilderModifications<CatalogDateAttributeBuilder>) => ICatalogDateAttribute;
/**
 * Catalog date dataset builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class CatalogDateDatasetBuilder<T extends ICatalogDateDataset = ICatalogDateDataset> extends Builder<T> {
    relevance(relevance: number): this;
    dateAttributes(dateAttributes: ICatalogDateAttribute[]): this;
    dataSet(dataSetOrRef: IDataSetMetadataObject | ObjRef, modifications?: BuilderModifications<DataSetMetadataObjectBuilder>): this;
}
/**
 * Catalog date dataset factory
 *
 * @param modifications - catalog date dataset builder modifications to perform
 * @returns created catalog date dataset
 * @beta
 */
export declare const newCatalogDateDataset: (modifications?: BuilderModifications<CatalogDateDatasetBuilder>) => ICatalogDateDataset;
//# sourceMappingURL=dateDatasetFactory.d.ts.map