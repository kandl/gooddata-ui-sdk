// (C) 2019-2022 GoodData Corporation
import identity from "lodash/identity.js";
import { GroupableCatalogItemBuilder } from "./groupFactory.js";
import { newMeasure, isMeasureMetadataObject, } from "@gooddata/sdk-model";
import { builderFactory } from "../builder.js";
import { newMeasureMetadataObject } from "../metadata/measureFactory.js";
/**
 * Catalog measure builder
 * See {@link Builder}
 *
 * @beta
 */
export class CatalogMeasureBuilder extends GroupableCatalogItemBuilder {
    measure(measureOrRef, modifications) {
        if (!isMeasureMetadataObject(measureOrRef)) {
            this.item.measure = newMeasureMetadataObject(measureOrRef, modifications);
        }
        else {
            this.item.measure = measureOrRef;
        }
        return this;
    }
    toExecutionModel(modifications = identity) {
        if (!this.item.measure) {
            throw new Error("Cannot convert catalog measure to execution model, no measure found!");
        }
        const defaultModifications = (m) => { var _a, _b; return m.alias((_a = this.item.measure) === null || _a === void 0 ? void 0 : _a.title).format((_b = this.item.measure) === null || _b === void 0 ? void 0 : _b.format); };
        return newMeasure(this.item.measure.ref, (m) => modifications(defaultModifications(m)));
    }
}
/**
 * Catalog measure factory
 *
 * @param modifications - catalog measure builder modifications to perform
 * @returns created catalog measure
 * @beta
 */
export const newCatalogMeasure = (modifications = identity) => builderFactory(CatalogMeasureBuilder, { type: "measure" }, modifications);
//# sourceMappingURL=measureFactory.js.map