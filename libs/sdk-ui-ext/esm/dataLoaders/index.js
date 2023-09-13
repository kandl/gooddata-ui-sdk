import { colorPaletteDataLoaderFactory } from "./ColorPaletteDataLoader.js";
import { insightDataLoaderFactory } from "./InsightDataLoader.js";
import { userWorkspaceSettingsDataLoaderFactory } from "./UserWorkspaceSettingsDataLoader.js";
/**
 * Clears all the caches used by the InsightView components.
 *
 * @public
 */
export function clearInsightViewCaches() {
    const relevantFactories = [
        colorPaletteDataLoaderFactory,
        insightDataLoaderFactory,
        userWorkspaceSettingsDataLoaderFactory,
    ];
    relevantFactories.forEach((factory) => factory.reset());
}
export { colorPaletteDataLoaderFactory, insightDataLoaderFactory, userWorkspaceSettingsDataLoaderFactory };
//# sourceMappingURL=index.js.map