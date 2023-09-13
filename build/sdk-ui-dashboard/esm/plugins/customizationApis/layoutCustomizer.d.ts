import { FluidLayoutCustomizationFn, IDashboardLayoutCustomizer } from "../customizer.js";
import { IDashboardCustomizationLogger } from "./customizationLogging.js";
import { DashboardTransformFn } from "../../model/index.js";
import { CustomizerMutationsContext } from "./types.js";
export declare class DefaultLayoutCustomizer implements IDashboardLayoutCustomizer {
    private readonly logger;
    private readonly mutationContext;
    private sealed;
    private readonly fluidLayoutTransformations;
    constructor(logger: IDashboardCustomizationLogger, mutationContext: CustomizerMutationsContext);
    customizeFluidLayout: (customizationFn: FluidLayoutCustomizationFn) => IDashboardLayoutCustomizer;
    sealCustomizer: () => IDashboardLayoutCustomizer;
    getExistingDashboardTransformFn: () => DashboardTransformFn;
}
