// (C) 2022 GoodData Corporation
import { HiddenFilterBar } from "../../presentation/index.js";
class FilterBarCustomizerState {
    constructor(logger) {
        this.logger = logger;
        this.renderingMode = undefined;
        this.getRenderingMode = () => {
            var _a;
            return (_a = this.renderingMode) !== null && _a !== void 0 ? _a : "default";
        };
        this.setRenderingMode = (renderingMode) => {
            if (this.renderingMode) {
                this.logger.warn(`Redefining filter bar rendering mode to "${renderingMode}". Previous definition will be discarded.`);
            }
            this.renderingMode = renderingMode;
        };
    }
}
class SealedFilterBarCustomizerState {
    constructor(state, logger) {
        this.state = state;
        this.logger = logger;
        this.getRenderingMode = () => {
            return this.state.getRenderingMode();
        };
        this.setRenderingMode = (_renderingMode) => {
            this.logger.warn(`Attempting to set filter bar rendering mode outside of plugin registration. Ignoring.`);
        };
    }
}
/**
 * @internal
 */
export class DefaultFilterBarCustomizer {
    constructor(logger) {
        this.logger = logger;
        this.state = new FilterBarCustomizerState(this.logger);
        this.setRenderingMode = (mode) => {
            this.state.setRenderingMode(mode);
            return this;
        };
        this.getCustomizerResult = () => {
            return {
                // if rendering mode is "hidden", explicitly replace the component with HiddenFilterBar,
                // otherwise do nothing to allow the default or any custom component provided by the embedding application
                // to kick in
                FilterBarComponent: this.state.getRenderingMode() === "hidden" ? HiddenFilterBar : undefined,
            };
        };
        this.sealCustomizer = () => {
            this.state = new SealedFilterBarCustomizerState(this.state, this.logger);
            return this;
        };
    }
}
//# sourceMappingURL=filterBarCustomizer.js.map