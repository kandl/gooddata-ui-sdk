import { dataLoaderAbstractFactory } from "./DataLoaderAbstractFactory";
class ColorPaletteDataLoader {
    constructor(workspace) {
        this.workspace = workspace;
    }
    getColorPalette(backend) {
        if (!this.cachedColorPalette) {
            this.cachedColorPalette = backend
                .workspace(this.workspace)
                .styling()
                .getColorPalette()
                .catch((error) => {
                this.cachedColorPalette = undefined;
                throw error;
            });
        }
        return this.cachedColorPalette;
    }
}
/**
 * @internal
 */
export const colorPaletteDataLoaderFactory = dataLoaderAbstractFactory((workspace) => new ColorPaletteDataLoader(workspace));
//# sourceMappingURL=ColorPaletteDataLoader.js.map