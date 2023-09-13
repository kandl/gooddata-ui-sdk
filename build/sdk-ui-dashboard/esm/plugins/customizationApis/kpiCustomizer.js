import { DefaultDashboardKpi, } from "../../presentation/index.js";
import { InvariantError } from "ts-invariant";
import union from "lodash/union.js";
const DefaultKpiRendererProvider = () => {
    return DefaultDashboardKpi;
};
class DefaultKpiCustomizerState {
    constructor(defaultProvider) {
        /*
         * Core provider encapsulates resolution using the chain of core providers.
         */
        this.coreProvider = (kpi, widget) => {
            const providerStack = [...this.coreProviderChain].reverse();
            for (const provider of providerStack) {
                const Component = provider(kpi, widget);
                if (Component) {
                    return Component;
                }
            }
            // if this happens then the provider chain got messed up. by default the chain contains the default
            // provider which never returns undefined
            throw new InvariantError();
        };
        /*
         * Root provider is THE provider that should be used in the dashboard extension properties. The
         * provider function included here will reflect the setup where there may be N registered decorators
         * sitting on top of a chain of core providers.
         *
         * In the initial state the root provider IS the core provider - meaning no decorations. As the
         * decorators get registered, the rootProvider changes.
         */
        this.rootProvider = this.coreProvider;
        this.coreProviderChain = [defaultProvider];
    }
    addCustomProvider(provider) {
        this.coreProviderChain.push(provider);
    }
    getRootProvider() {
        return this.rootProvider;
    }
    switchRootProvider(provider) {
        this.rootProvider = provider;
    }
}
/**
 * Sealed customizer state will not allow to perform any modifications of the state. Sealing the state
 * is essential to make the customization more defensive: during the registration, the plugin can hang
 * onto the dashboard customizer - stash it somewhere. And then after registration try to use the customizer
 * and try to do additional 'ad-hoc' customizations.
 *
 * Such a thing is not supported by the lifecycle and this sealing is in place to prevent plugins going into
 * that dangerous territory.
 */
class SealedKpiCustomizerState {
    constructor(logger, state) {
        this.logger = logger;
        this.state = state;
        this.addCustomProvider = (_provider) => {
            // eslint-disable-next-line no-console
            this.logger.warn(`Attempting to customize KPI rendering outside of plugin registration. Ignoring.`);
        };
        // eslint-disable-next-line sonarjs/no-identical-functions
        this.switchRootProvider = (_provider) => {
            // eslint-disable-next-line no-console
            this.logger.warn(`Attempting to customize KPI rendering outside of plugin registration. Ignoring.`);
        };
        this.getRootProvider = () => {
            return this.state.getRootProvider();
        };
    }
}
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
export class DefaultKpiCustomizer {
    constructor(logger, mutationContext, defaultProvider = DefaultKpiRendererProvider) {
        this.withCustomProvider = (provider) => {
            this.state.addCustomProvider(provider);
            this.mutationContext.kpi = union(this.mutationContext.kpi, ["provider"]);
            return this;
        };
        this.withCustomDecorator = (providerFactory) => {
            // snapshot current root provider
            const rootSnapshot = this.state.getRootProvider();
            // call user's factory in order to obtain the actual provider - pass the current root so that user's
            // code can use it to obtain component to decorate
            const decoratorProvider = providerFactory(rootSnapshot);
            // construct new root provider; this will be using user's provider with a fallback to root provider
            // in case user's code does not return anything
            const newRootProvider = (kpi, widget) => {
                const Component = decoratorProvider(kpi, widget);
                if (Component) {
                    return Component;
                }
                return rootSnapshot(kpi, widget);
            };
            // finally modify the root provider; next time someone registers decorator, it will be on top of
            // this currently registered one
            this.state.switchRootProvider(newRootProvider);
            this.mutationContext.kpi = union(this.mutationContext.kpi, ["decorator"]);
            return this;
        };
        this.getKpiProvider = () => {
            return this.state.getRootProvider();
        };
        this.sealCustomizer = () => {
            this.state = new SealedKpiCustomizerState(this.logger, this.state);
        };
        this.logger = logger;
        this.mutationContext = mutationContext;
        this.state = new DefaultKpiCustomizerState(defaultProvider);
    }
}
//# sourceMappingURL=kpiCustomizer.js.map