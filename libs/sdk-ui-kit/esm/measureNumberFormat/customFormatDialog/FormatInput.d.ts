import React from "react";
import { WrappedComponentProps } from "react-intl";
import { ISeparators } from "@gooddata/sdk-ui";
import { IFormatTemplate } from "../typings.js";
interface IFormatInputOwnProps {
    format: string;
    onFormatChange: (format: string) => void;
    separators?: ISeparators;
    templates?: ReadonlyArray<IFormatTemplate>;
}
type IFormatInputProps = IFormatInputOwnProps & WrappedComponentProps;
declare const FormatInputWithIntl: React.FC<import("react-intl").WithIntlProps<IFormatInputProps>> & {
    WrappedComponent: React.ComponentType<IFormatInputProps>;
};
export default FormatInputWithIntl;
//# sourceMappingURL=FormatInput.d.ts.map