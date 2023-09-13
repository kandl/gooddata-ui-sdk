import { IDashboardInsightCustomizer } from "../customizer.js";
import { CustomDashboardInsightComponent, InsightComponentProvider, InsightBodyComponentProvider, OptionalInsightComponentProvider, OptionalInsightBodyComponentProvider } from "../../presentation/index.js";
import { IDashboardCustomizationLogger } from "./customizationLogging.js";
import { CustomizerMutationsContext } from "./types.js";
/**
 * Default implementation of the insight rendering customizer. Notice that the state of the customizations
 * is kept separate from this class.
 *
 * This code is responsible for creation of the providers (if needed) and then updating the state
 * accordingly. The customizer state methods are responsible for doing correct updates of the state itself. This
 * decoupling is in place so that it is possible to seal the state and prevent write operations from some point
 * onward. See {@link SealedInsightCustomizerState} for more motivation behind this.
 *
 * @internal
 */
export declare class DefaultInsightCustomizer implements IDashboardInsightCustomizer {
    private readonly logger;
    private readonly mutationContext;
    private state;
    constructor(logger: IDashboardCustomizationLogger, mutationContext: CustomizerMutationsContext, defaultCoreProvider?: InsightComponentProvider, defaultInsightBodyProvider?: InsightBodyComponentProvider);
    withTag: (tag: string, component: CustomDashboardInsightComponent) => this;
    withCustomProvider: (provider: OptionalInsightComponentProvider) => this;
    withCustomInsightBodyProvider(provider: OptionalInsightBodyComponentProvider): this;
    withCustomDecorator: (providerFactory: (next: InsightComponentProvider) => OptionalInsightComponentProvider) => this;
    getInsightProvider: () => InsightComponentProvider;
    getInsightBodyComponentProvider: () => InsightBodyComponentProvider;
    sealCustomizer: () => void;
}
