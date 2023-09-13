import { DefaultAttributeFiltersCustomizer } from "./attributeFiltersCustomizer.js";
import { DefaultDateFiltersCustomizer } from "./dateFiltersCustomizer.js";
export class DefaultFiltersCustomizer {
    constructor(logger) {
        this.logger = logger;
        this.attributeFiltersCustomizer = new DefaultAttributeFiltersCustomizer(this.logger);
        this.dateFiltersCustomizer = new DefaultDateFiltersCustomizer(this.logger);
        this.sealCustomizer = () => {
            this.attributeFiltersCustomizer.sealCustomizer();
            this.dateFiltersCustomizer.sealCustomizer();
            return this;
        };
    }
    attribute() {
        return this.attributeFiltersCustomizer;
    }
    date() {
        return this.dateFiltersCustomizer;
    }
}
//# sourceMappingURL=filtersCustomizer.js.map