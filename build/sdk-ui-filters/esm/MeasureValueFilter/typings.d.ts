import { IMeasureValueFilter } from "@gooddata/sdk-model";
import { ISeparators } from "@gooddata/sdk-ui";
/**
 * @beta
 */
export interface IMeasureValueFilterCommonProps {
    filter: IMeasureValueFilter;
    measureIdentifier: string;
    onApply: (filter: IMeasureValueFilter) => void;
    usePercentage?: boolean;
    warningMessage?: WarningMessage;
    locale?: string;
    separators?: ISeparators;
    displayTreatNullAsZeroOption?: boolean;
    treatNullAsZeroDefaultValue?: boolean;
    enableOperatorSelection?: boolean;
}
/**
 * @beta
 */
export type WarningMessage = string | IWarningMessage;
/**
 * @beta
 */
export type IWarningMessage = {
    text: string;
    severity: "low" | "medium" | "high";
};
/**
 * @alpha
 */
export declare function isWarningMessage(obj: unknown): obj is IWarningMessage;
