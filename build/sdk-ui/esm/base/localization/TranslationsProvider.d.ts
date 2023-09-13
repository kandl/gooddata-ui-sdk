import React from "react";
import { WrappedComponentProps, IntlShape } from "react-intl";
/**
 * @internal
 */
export interface ITranslationsProviderOwnProps {
    children: any;
}
/**
 * @internal
 */
export interface ITranslationsComponentProps {
    numericSymbols: string[];
    emptyHeaderString: string;
    intl: IntlShape;
}
/**
 * @internal
 */
export type ITranslationsProviderProps = ITranslationsProviderOwnProps & WrappedComponentProps;
/**
 * @internal
 */
export declare class TranslationsProvider extends React.PureComponent<ITranslationsProviderProps> {
    render(): any;
}
/**
 * @internal
 */
export declare const IntlTranslationsProvider: React.FC<import("react-intl").WithIntlProps<ITranslationsProviderProps>> & {
    WrappedComponent: React.ComponentType<ITranslationsProviderProps>;
};
//# sourceMappingURL=TranslationsProvider.d.ts.map