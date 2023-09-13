// (C) 2007-2023 GoodData Corporation
import React from "react";
import { applyRatioRule, ComputeRatioRule, newBucket, } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { defaultDimensions } from "../_commons/dimensions.js";
import { CoreComboChart } from "./CoreComboChart.js";
import isArray from "lodash/isArray.js";
import { withChart } from "../_base/withChart.js";
import { sanitizeConfig } from "../_commons/sanitizeStacking.js";
//
// Internals
//
const comboChartDefinition = {
    chartName: "ComboChart",
    bucketPropsKeys: ["primaryMeasures", "secondaryMeasures", "viewBy", "filters", "sortBy"],
    propTransformation: (props) => {
        var _a, _b;
        const { primaryMeasures = [], secondaryMeasures = [] } = props;
        const isDualAxis = (_b = (_a = props.config) === null || _a === void 0 ? void 0 : _a.dualAxis) !== null && _b !== void 0 ? _b : true;
        const computeRatioRule = !isDualAxis && primaryMeasures.length + secondaryMeasures.length > 1
            ? ComputeRatioRule.NEVER
            : ComputeRatioRule.SINGLE_MEASURE_ONLY;
        return Object.assign(Object.assign({}, props), { primaryMeasures: applyRatioRule(primaryMeasures, computeRatioRule), secondaryMeasures: applyRatioRule(secondaryMeasures, computeRatioRule) });
    },
    bucketsFactory: (props) => {
        const { primaryMeasures, secondaryMeasures, viewBy } = props;
        const categories = isArray(viewBy) ? [viewBy[0]] : [viewBy];
        return [
            newBucket(BucketNames.MEASURES, ...primaryMeasures),
            newBucket(BucketNames.SECONDARY_MEASURES, ...secondaryMeasures),
            newBucket(BucketNames.VIEW, ...categories),
        ];
    },
    executionFactory: (props, buckets) => {
        var _a;
        const { backend, workspace, execConfig } = props;
        const sortBy = (_a = props.sortBy) !== null && _a !== void 0 ? _a : [];
        return backend
            .withTelemetry("ComboChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(defaultDimensions)
            .withExecConfig(execConfig);
    },
    propOverridesFactory: (props) => {
        return {
            config: getConfiguration(props),
        };
    },
};
function getConfiguration(props) {
    var _a, _b;
    const { primaryMeasures, secondaryMeasures, config } = props;
    const isDualAxis = (_b = (_a = props.config) === null || _a === void 0 ? void 0 : _a.dualAxis) !== null && _b !== void 0 ? _b : true;
    const measuresOnPrimaryAxis = isDualAxis ? primaryMeasures : [...primaryMeasures, ...secondaryMeasures];
    return sanitizeConfig(measuresOnPrimaryAxis, config);
}
const WrappedComboChart = withChart(comboChartDefinition)(CoreComboChart);
/**
 * Combo chart combines two types of visualizations, for example, a column chart and a line chart.
 *
 * @remarks
 * A combo chart can
 * have one or two axes. If a combo chart has two axes, it is often referred to as a dual axis chart.
 *
 * By default, a combo chart is displayed as a combination of a column chart and a line chart, with the secondary axis
 * enabled (you can [disable it](https://sdk.gooddata.com/gooddata-ui/docs/combo_chart_component.html#disable-the-secondary-axis)).
 *
 * The chart types used to display primary and secondary measures can be customized in {@link IChartConfig}.
 *
 * See {@link IComboChartProps} to learn how to configure the ComboChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/combo_chart_component.html | combo chart documentation} for more information.
 *
 * @public
 */
export const ComboChart = (props) => {
    const [primaryMeasures, secondaryMeasures, viewBy, filters, sortBy] = useResolveValuesWithPlaceholders([props.primaryMeasures, props.secondaryMeasures, props.viewBy, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedComboChart, Object.assign({}, props, {
        primaryMeasures,
        secondaryMeasures,
        viewBy,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=ComboChart.js.map