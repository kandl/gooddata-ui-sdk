/// <reference types="react" />
import { MeasureOrPlaceholder, AttributeOrPlaceholder, NullableFiltersOrPlaceholders } from "@gooddata/sdk-ui";
import { IBucketChartProps, ICoreChartProps } from "../../interfaces/index.js";
/**
 * @beta
 */
export interface IXirrBucketProps {
    /**
     * The measure to calculate the Internal Rate of Return for.
     *
     * @remarks
     * For the result to make sense, the measure should start with a negative value at some point in time (the investment) followed by other values (the returns).
     */
    measure: MeasureOrPlaceholder;
    /**
     * The date dimension to use for the computation. This allows you to set the granularity (day, month, etc.) for the IRR calculation.
     */
    attribute?: AttributeOrPlaceholder;
    /**
     * Specify filters to apply on the data to compute with.
     */
    filters?: NullableFiltersOrPlaceholders;
    /**
     * Resolution context for composed placeholders.
     */
    placeholdersResolutionContext?: any;
}
/**
 * @beta
 */
export interface IXirrProps extends IBucketChartProps, IXirrBucketProps {
}
/**
 * Xirr computes the {@link https://en.wikipedia.org/wiki/Internal_rate_of_return | Internal Rate of Return} from the given measure and date dimension.
 *
 *
 * @remarks
 * The "X" in the name means that the returns do not have to happen periodically (as in the standard IRR), but they
 * can {@link https://en.wikipedia.org/wiki/Internal_rate_of_return#Exact_dates_of_cash_flows | happen at any day}.
 * You must specify both the measure and date dimension.
 *
 * For date parsing, we currently use the browser's Date constructor. There might be some differences
 * between how browsers implement this, so for best results use the Day granularity if possible.
 *
 * See {@link IXirrProps} to learn how to configure the Xirr.
 *
 * @beta
 */
export declare const Xirr: (props: IXirrProps) => JSX.Element;
export declare function RenderXirr(props: IXirrProps): JSX.Element;
export declare function toCoreXirrProps(props: IXirrProps): ICoreChartProps;
//# sourceMappingURL=Xirr.d.ts.map