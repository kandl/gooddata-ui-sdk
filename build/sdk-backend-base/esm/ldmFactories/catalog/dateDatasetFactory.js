// (C) 2019-2022 GoodData Corporation
import identity from "lodash/identity.js";
import { isAttributeDisplayFormMetadataObject, isAttributeMetadataObject, isDataSetMetadataObject, } from "@gooddata/sdk-model";
import { Builder, builderFactory } from "../builder.js";
import { newAttributeMetadataObject } from "../metadata/attributeFactory.js";
import { newAttributeDisplayFormMetadataObject, } from "../metadata/displayFormFactory.js";
import { newDataSetMetadataObject } from "../metadata/dataSetFactory.js";
/**
 * Catalog date attribute builder
 * See {@link Builder}
 *
 * @beta
 */
export class CatalogDateAttributeBuilder extends Builder {
    granularity(granularity) {
        this.item.granularity = granularity;
        return this;
    }
    attribute(attributeOrRef, modifications) {
        if (!isAttributeMetadataObject(attributeOrRef)) {
            this.item.attribute = newAttributeMetadataObject(attributeOrRef, modifications);
        }
        else {
            this.item.attribute = attributeOrRef;
        }
        return this;
    }
    defaultDisplayForm(displayFormOrRef, modifications) {
        if (!isAttributeDisplayFormMetadataObject(displayFormOrRef)) {
            this.item.defaultDisplayForm = newAttributeDisplayFormMetadataObject(displayFormOrRef, modifications);
        }
        else {
            this.item.defaultDisplayForm = displayFormOrRef;
        }
        return this;
    }
}
/**
 * Catalog date attribute factory
 *
 * @param modifications - catalog date attribute builder modifications to perform
 * @returns created catalog date attribute
 * @beta
 */
export const newCatalogDateAttribute = (modifications = identity) => builderFactory(CatalogDateAttributeBuilder, {}, modifications);
/**
 * Catalog date dataset builder
 * See {@link Builder}
 *
 * @beta
 */
export class CatalogDateDatasetBuilder extends Builder {
    relevance(relevance) {
        this.item.relevance = relevance;
        return this;
    }
    dateAttributes(dateAttributes) {
        this.item.dateAttributes = dateAttributes;
        return this;
    }
    dataSet(dataSetOrRef, modifications) {
        if (!isDataSetMetadataObject(dataSetOrRef)) {
            this.item.dataSet = newDataSetMetadataObject(dataSetOrRef, modifications);
        }
        else {
            this.item.dataSet = dataSetOrRef;
        }
        return this;
    }
}
/**
 * Catalog date dataset factory
 *
 * @param modifications - catalog date dataset builder modifications to perform
 * @returns created catalog date dataset
 * @beta
 */
export const newCatalogDateDataset = (modifications = identity) => builderFactory(CatalogDateDatasetBuilder, { type: "dateDataset" }, modifications);
//# sourceMappingURL=dateDatasetFactory.js.map