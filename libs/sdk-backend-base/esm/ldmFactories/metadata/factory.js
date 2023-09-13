// (C) 2019-2022 GoodData Corporation
import { Builder } from "../builder.js";
/**
 * Metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export class MetadataObjectBuilder extends Builder {
    title(title) {
        this.item.title = title;
        return this;
    }
    description(description) {
        this.item.description = description;
        return this;
    }
    id(identifier) {
        this.item.id = identifier;
        return this;
    }
    uri(uri) {
        this.item.uri = uri;
        return this;
    }
    unlisted(value) {
        this.item.unlisted = value;
        return this;
    }
    production(isProduction) {
        this.item.production = isProduction;
        return this;
    }
    deprecated(isDeprecated) {
        this.item.deprecated = isDeprecated;
        return this;
    }
}
//# sourceMappingURL=factory.js.map