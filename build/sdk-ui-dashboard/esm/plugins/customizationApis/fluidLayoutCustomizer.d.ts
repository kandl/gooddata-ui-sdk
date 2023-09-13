import { IDashboardLayout, IDashboardLayoutSection, IDashboardLayoutItem } from "@gooddata/sdk-model";
import { IFluidLayoutCustomizer } from "../customizer.js";
import { ExtendedDashboardWidget, ICustomWidget } from "../../model/index.js";
import { IDashboardCustomizationLogger } from "./customizationLogging.js";
import { CustomizerMutationsContext } from "./types.js";
export declare class FluidLayoutCustomizer implements IFluidLayoutCustomizer {
    private readonly logger;
    private readonly mutationContext;
    private readonly addItemOps;
    private readonly addSectionOps;
    constructor(logger: IDashboardCustomizationLogger, mutationContext: CustomizerMutationsContext);
    addItem: (sectionIdx: number, itemIdx: number, item: IDashboardLayoutItem<ICustomWidget>) => IFluidLayoutCustomizer;
    addSection: (sectionIdx: number, section: IDashboardLayoutSection<ICustomWidget>) => IFluidLayoutCustomizer;
    applyTransformations: (layout: IDashboardLayout<ExtendedDashboardWidget>) => IDashboardLayout<ExtendedDashboardWidget>;
}
