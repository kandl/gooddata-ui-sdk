/// <reference types="react" />
import { ISeparators } from "@gooddata/sdk-ui";
interface IComparisonInputProps {
    value: number;
    usePercentage: boolean;
    disableAutofocus?: boolean;
    onValueChange: (value: number) => void;
    onEnterKeyPress?: () => void;
    separators?: ISeparators;
}
declare const ComparisonInput: ({ value, usePercentage, disableAutofocus, onValueChange, onEnterKeyPress, separators, }: IComparisonInputProps) => JSX.Element;
export default ComparisonInput;
