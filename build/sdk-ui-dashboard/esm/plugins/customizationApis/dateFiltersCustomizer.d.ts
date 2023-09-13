import { IDateFiltersCustomizer } from "../customizer.js";
import { DateFilterComponentProvider, OptionalDateFilterComponentProvider } from "../../presentation/index.js";
import { IDashboardCustomizationLogger } from "./customizationLogging.js";
/**
 * Default implementation of the DateFilter rendering customizer. Notice that the state of the customizations
 * is kept separate from this class.
 *
 * This code is responsible for creation of the providers (if needed) and then updating the state
 * accordingly. The customizer state methods are responsible for doing correct updates of the state itself. This
 * decoupling is in place so that it is possible to seal the state and prevent write operations from some point
 * onward. See {@link SealedDateFilterCustomizerState} for more motivation behind this.
 *
 * @internal
 */
export declare class DefaultDateFiltersCustomizer implements IDateFiltersCustomizer {
    private readonly logger;
    private state;
    constructor(logger: IDashboardCustomizationLogger, defaultProvider?: DateFilterComponentProvider);
    withCustomProvider: (provider: OptionalDateFilterComponentProvider) => IDateFiltersCustomizer;
    getDateFilterProvider: () => DateFilterComponentProvider;
    sealCustomizer: () => void;
}
