/// <reference types="react" />
import { ISeparators } from "@gooddata/sdk-ui";
interface IRangeInputProps {
    from: number;
    to: number;
    usePercentage: boolean;
    disableAutofocus?: boolean;
    onFromChange: (value: number) => void;
    onToChange: (value: number) => void;
    onEnterKeyPress?: () => void;
    separators?: ISeparators;
}
declare const RangeInput: ({ from, to, usePercentage, disableAutofocus, onFromChange, onToChange, onEnterKeyPress, separators, }: IRangeInputProps) => JSX.Element;
export default RangeInput;
