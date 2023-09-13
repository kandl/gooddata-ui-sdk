// (C) 2021-2023 GoodData Corporation
import { Dashboard } from "../presentation/index.js";
import { DashboardCustomizationBuilder } from "./customizationApis/customizationBuilder.js";
import { DefaultDashboardEventHandling } from "./customizationApis/dashboardEventHandling.js";
import { pluginDebugStr } from "./customizationApis/pluginUtils.js";
import { LIB_VERSION } from "../__version.js";
/**
 * A factory function to obtain an instance of {@link IDashboardEngine}.
 *
 * @remarks
 * This is the main, well-known entry point to the Dashboard Engine that is used during both static and dynamic
 * loading of the dashboard engine instances by the DashboardLoader.
 *
 * @public
 */
export function newDashboardEngine() {
    return {
        version: LIB_VERSION,
        initializePlugins(ctx, plugins) {
            var _a;
            const customizationBuilder = new DashboardCustomizationBuilder();
            const eventRegistration = new DefaultDashboardEventHandling();
            // eslint-disable-next-line no-console
            console.log(`DashboardEngine ${this.version} initializing with plugins: ${plugins
                .map(pluginDebugStr)
                .join(", ")}`);
            customizationBuilder.setWidgetOverlays((_a = ctx.config) === null || _a === void 0 ? void 0 : _a.widgetsOverlay);
            for (const plugin of plugins) {
                customizationBuilder.onBeforePluginRegister(plugin);
                try {
                    plugin.register(ctx, customizationBuilder, eventRegistration);
                    customizationBuilder.onAfterPluginRegister();
                }
                catch (e) {
                    customizationBuilder.onPluginRegisterError(e);
                }
            }
            const extensionProps = customizationBuilder.build();
            const eventingProps = eventRegistration.getDashboardEventing();
            return Object.assign(Object.assign({}, extensionProps), eventingProps);
        },
        getDashboardComponent() {
            return Dashboard;
        },
    };
}
//# sourceMappingURL=engine.js.map