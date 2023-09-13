import { GroupableCatalogItemBuilder } from "./groupFactory.js";
import { IMeasure, MeasureBuilder, MeasureModifications, ObjRef, ICatalogMeasure, IMeasureMetadataObject } from "@gooddata/sdk-model";
import { BuilderModifications } from "../builder.js";
import { MeasureMetadataObjectBuilder } from "../metadata/measureFactory.js";
/**
 * Catalog measure builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class CatalogMeasureBuilder<T extends ICatalogMeasure = ICatalogMeasure> extends GroupableCatalogItemBuilder<T> {
    measure(measureOrRef: IMeasureMetadataObject | ObjRef, modifications?: BuilderModifications<MeasureMetadataObjectBuilder>): this;
    toExecutionModel(modifications?: MeasureModifications<MeasureBuilder>): IMeasure;
}
/**
 * Catalog measure factory
 *
 * @param modifications - catalog measure builder modifications to perform
 * @returns created catalog measure
 * @beta
 */
export declare const newCatalogMeasure: (modifications?: BuilderModifications<CatalogMeasureBuilder>) => ICatalogMeasure;
//# sourceMappingURL=measureFactory.d.ts.map