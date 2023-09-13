// (C) 2019 GoodData Corporation
import React from "react";
import compose from "lodash/flowRight.js";
import { getCoreChartProps } from "../_commons/chartDefinition.js";
import { withContexts, wrapDisplayName } from "@gooddata/sdk-ui";
import { withTheme } from "@gooddata/sdk-ui-theme-provider";
/**
 * Hoc that transforms incoming props to BaseChart props according to chart definition
 * @internal
 */
function withChartDefinition(chartDefinition) {
    const getChartProps = getCoreChartProps(chartDefinition);
    return (Chart) => {
        const WithChartDefinition = (props) => React.createElement(Chart, Object.assign({}, getChartProps(props)));
        return wrapDisplayName("withChartDefinition", Chart)(WithChartDefinition);
    };
}
/**
 * Common hoc for shared logic between all charts, injects contexts and transforms incoming props to BaseChart props according to chart definition
 * @internal
 */
export const withChart = (chartDefinition) => (Chart) => compose(wrapDisplayName("withChart"), withTheme, withContexts, withChartDefinition(chartDefinition))(Chart);
//# sourceMappingURL=withChart.js.map