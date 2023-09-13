import { PluggableComboChartDeprecated } from "./PluggableComboChartDeprecated";
import { BigChartDescriptor } from "../BigChartDescriptor";
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