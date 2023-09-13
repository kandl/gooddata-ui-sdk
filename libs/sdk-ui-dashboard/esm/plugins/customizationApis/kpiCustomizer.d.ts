import { IDashboardKpiCustomizer } from "../customizer.js";
import { KpiComponentProvider, OptionalKpiComponentProvider } from "../../presentation/index.js";
import { IDashboardCustomizationLogger } from "./customizationLogging.js";
import { CustomizerMutationsContext } from "./types.js";
/**
 * Default implementation of the KPI rendering customizer. Notice that the state of the customizations
 * is kept separate from this class.
 *
 * This code is responsible for creation of the providers (if needed) and then updating the state
 * accordingly. The customizer state methods are responsible for doing correct updates of the state itself. This
 * decoupling is in place so that it is possible to seal the state and prevent write operations from some point
 * onward. See {@link SealedKpiCustomizerState} for more motivation behind this.
 *
 * @internal
 */
export declare class DefaultKpiCustomizer implements IDashboardKpiCustomizer {
    private readonly logger;
    private readonly mutationContext;
    private state;
    constructor(logger: IDashboardCustomizationLogger, mutationContext: CustomizerMutationsContext, defaultProvider?: KpiComponentProvider);
    withCustomProvider: (provider: OptionalKpiComponentProvider) => IDashboardKpiCustomizer;
    withCustomDecorator: (providerFactory: (next: KpiComponentProvider) => OptionalKpiComponentProvider) => IDashboardKpiCustomizer;
    getKpiProvider: () => KpiComponentProvider;
    sealCustomizer: () => void;
}
