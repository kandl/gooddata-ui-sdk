import { colorPaletteDataLoaderFactory } from "./ColorPaletteDataLoader";
import { insightDataLoaderFactory } from "./InsightDataLoader";
import { userWorkspaceSettingsDataLoaderFactory } from "./UserWorkspaceSettingsDataLoader";
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