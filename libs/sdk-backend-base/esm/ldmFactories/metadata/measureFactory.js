// (C) 2019-2022 GoodData Corporation
import identity from "lodash/identity.js";
import { MetadataObjectBuilder } from "./factory.js";
import { builderFactory } from "../builder.js";
/**
 * Measure metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export class MeasureMetadataObjectBuilder extends MetadataObjectBuilder {
    expression(maql) {
        this.item.expression = maql;
        return this;
    }
    format(format) {
        this.item.format = format;
        return this;
    }
    isLocked(isLocked) {
        this.item.isLocked = isLocked;
        return this;
    }
    created(createdAt) {
        this.item.created = createdAt;
        return this;
    }
    createdBy(createdBy) {
        this.item.createdBy = createdBy;
        return this;
    }
    updated(updatedAt) {
        this.item.updated = updatedAt;
        return this;
    }
    updatedBy(updatedBy) {
        this.item.updatedBy = updatedBy;
        return this;
    }
}
/**
 * Measure metadata object factory
 *
 * @param ref - measure reference
 * @param modifications - measure builder modifications to perform
 * @returns created measure metadata object
 * @beta
 */
export const newMeasureMetadataObject = (ref, modifications = identity) => builderFactory(MeasureMetadataObjectBuilder, { type: "measure", ref }, modifications);
//# sourceMappingURL=measureFactory.js.map