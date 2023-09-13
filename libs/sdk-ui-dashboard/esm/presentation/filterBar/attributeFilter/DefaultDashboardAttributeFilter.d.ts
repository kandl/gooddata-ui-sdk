/// <reference types="react" />
import { IDashboardAttributeFilterProps } from "./types.js";
/**
 * Default implementation of the attribute filter to use on the dashboard's filter bar.
 *
 * This will use the SDK's AttributeFilter with the button styled same as we have it today on KD.
 *
 * @alpha
 */
export declare const DefaultDashboardAttributeFilter: (props: IDashboardAttributeFilterProps) => JSX.Element | null;
