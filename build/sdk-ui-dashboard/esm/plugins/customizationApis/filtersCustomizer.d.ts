import { IFiltersCustomizer } from "../customizer.js";
import { IDashboardCustomizationLogger } from "./customizationLogging.js";
import { DefaultAttributeFiltersCustomizer } from "./attributeFiltersCustomizer.js";
import { DefaultDateFiltersCustomizer } from "./dateFiltersCustomizer.js";
export declare class DefaultFiltersCustomizer implements IFiltersCustomizer {
    private readonly logger;
    private readonly attributeFiltersCustomizer;
    private readonly dateFiltersCustomizer;
    constructor(logger: IDashboardCustomizationLogger);
    attribute(): DefaultAttributeFiltersCustomizer;
    date(): DefaultDateFiltersCustomizer;
    sealCustomizer: () => IFiltersCustomizer;
}
