import { PluggableComboChartDeprecated } from "./PluggableComboChartDeprecated.js";
import { BigChartDescriptor } from "../BigChartDescriptor.js";
export class ComboChartDescriptorDeprecated extends BigChartDescriptor {
    getFactory() {
        return (params) => new PluggableComboChartDeprecated(params);
    }
    getMeta() {
        return {
            supportsExport: true,
            supportsZooming: true,
        };
    }
}
//# sourceMappingURL=ComboChartDescriptorDeprecated.js.map