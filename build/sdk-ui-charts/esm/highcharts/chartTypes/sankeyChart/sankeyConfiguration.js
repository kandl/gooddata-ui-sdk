// (C) 2023 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import { getCommonResponsiveConfig } from "../_chartCreators/responsive.js";
const SANKEY_TEMPLATE = {
    chart: {
        type: "sankey",
    },
    plotOptions: {
        sankey: {
            showInLegend: true,
            dataLabels: {
                enabled: true,
                padding: 1,
                align: "left",
                verticalAlign: "middle",
                useHTML: true,
                nodeFormat: `<span style="padding: 0 9px">{point.name}</span>`,
            },
            nodeWidth: 5,
            linkOpacity: 0.35,
            states: {
                inactive: {
                    opacity: 0.2,
                    linkOpacity: 0.1,
                },
            },
        },
    },
    legend: {
        enabled: false,
    },
};
export function getSankeyConfiguration() {
    const configuration = cloneDeep(SANKEY_TEMPLATE);
    return Object.assign(Object.assign({}, configuration), { responsive: getCommonResponsiveConfig() });
}
//# sourceMappingURL=sankeyConfiguration.js.map