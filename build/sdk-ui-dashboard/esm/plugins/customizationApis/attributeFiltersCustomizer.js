import { DefaultDashboardAttributeFilter, } from "../../presentation/index.js";
import { InvariantError } from "ts-invariant";
const DefaultAttributeFilterRendererProvider = () => {
    return DefaultDashboardAttributeFilter;
};
class DefaultAttributeFiltersCustomizerState {
    constructor(defaultProvider) {
        /*
         * Core provider encapsulates resolution using the chain of core providers.
         */
        this.coreProvider = (attributeFilter) => {
            const providerStack = [...this.coreProviderChain].reverse();
            for (const provider of providerStack) {
                const Component = provider(attributeFilter);
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
class SealedAttributeFiltersCustomizerState {
    constructor(logger, state) {
        this.logger = logger;
        this.state = state;
        this.addCustomProvider = (_provider) => {
            // eslint-disable-next-line no-console
            this.logger.warn(`Attempting to customize AttributeFilter rendering outside of plugin registration. Ignoring.`);
        };
        // eslint-disable-next-line sonarjs/no-identical-functions
        this.switchRootProvider = (_provider) => {
            // eslint-disable-next-line no-console
            this.logger.warn(`Attempting to customize AttributeFilter rendering outside of plugin registration. Ignoring.`);
        };
        this.getRootProvider = () => {
            return this.state.getRootProvider();
        };
    }
}
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
export class DefaultAttributeFiltersCustomizer {
    constructor(logger, defaultProvider = DefaultAttributeFilterRendererProvider) {
        this.withCustomProvider = (provider) => {
            this.state.addCustomProvider(provider);
            return this;
        };
        this.getAttributeFilterProvider = () => {
            return this.state.getRootProvider();
        };
        this.sealCustomizer = () => {
            this.state = new SealedAttributeFiltersCustomizerState(this.logger, this.state);
        };
        this.logger = logger;
        this.state = new DefaultAttributeFiltersCustomizerState(defaultProvider);
    }
}
//# sourceMappingURL=attributeFiltersCustomizer.js.map