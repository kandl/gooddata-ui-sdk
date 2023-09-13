import { IAttributeFiltersCustomizer } from "../customizer.js";
import { AttributeFilterComponentProvider, OptionalAttributeFilterComponentProvider } from "../../presentation/index.js";
import { IDashboardCustomizationLogger } from "./customizationLogging.js";
/**
 * Default implementation of the AttributeFilter rendering customizer. Notice that the state of the customizations
 * is kept separate from this class.
 *
 * This code is responsible for creation of the providers (if needed) and then updating the state
 * accordingly. The customizer state methods are responsible for doing correct updates of the state itself. This
 * decoupling is in place so that it is possible to seal the state and prevent write operations from some point
 * onward. See {@link SealedAttributeFilterCustomizerState} for more motivation behind this.
 *
 * @internal
 */
export declare class DefaultAttributeFiltersCustomizer implements IAttributeFiltersCustomizer {
    private readonly logger;
    private state;
    constructor(logger: IDashboardCustomizationLogger, defaultProvider?: AttributeFilterComponentProvider);
    withCustomProvider: (provider: OptionalAttributeFilterComponentProvider) => IAttributeFiltersCustomizer;
    getAttributeFilterProvider: () => AttributeFilterComponentProvider;
    sealCustomizer: () => void;
}
