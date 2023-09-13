/// <reference types="react" />
import { WrappedComponentProps } from "react-intl";
interface ITreatNullValuesAsZeroCheckboxProps {
    checked?: boolean;
    onChange: (checked: boolean) => void;
}
declare const TreatNullValuesAsZeroCheckbox: ({ checked, onChange, intl, }: ITreatNullValuesAsZeroCheckboxProps & WrappedComponentProps) => JSX.Element;
export default TreatNullValuesAsZeroCheckbox;
