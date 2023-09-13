import { CustomFilterBarComponent } from "../../presentation/index.js";
import { FilterBarRenderingMode, IFilterBarCustomizer } from "../customizer.js";
import { IDashboardCustomizationLogger } from "./customizationLogging.js";
interface IFilterBarCustomizerResult {
    FilterBarComponent: CustomFilterBarComponent | undefined;
}
/**
 * @internal
 */
export declare class DefaultFilterBarCustomizer implements IFilterBarCustomizer {
    private readonly logger;
    private state;
    constructor(logger: IDashboardCustomizationLogger);
    setRenderingMode: (mode: FilterBarRenderingMode) => this;
    getCustomizerResult: () => IFilterBarCustomizerResult;
    sealCustomizer: () => this;
}
export {};
