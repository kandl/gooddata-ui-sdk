import { BaseChartDescriptor } from "./baseChart/BaseChartDescriptor";
import { PluggableUnknownChart } from "./PluggableUnknownChart";
export class UnknownVisualizationDescriptor extends BaseChartDescriptor {
    constructor(uri) {
        super();
        this.getEmbeddingCode = () => "";
        this.uri = uri;
    }
    getFactory() {
        return (params) => new PluggableUnknownChart(params);
    }
    applyDrillDown(insight, _drillDownContext, _backendSupportsElementUris) {
        return insight;
    }
    getMeta() {
        return {
            documentationUrl: `unknown: ${this.uri}`,
            supportsExport: false,
            supportsZooming: false,
        };
    }
}
//# sourceMappingURL=UnknownVisualizationDescriptor.js.map