import React, { PureComponent } from "react";
import { IntlShape } from "react-intl";
/**
 * @internal
 */
export interface ILegacyMultiSelectListItemProps {
    intl: IntlShape;
    isLoading?: boolean;
    onMouseOut?: (source: any) => void;
    onMouseOver?: (source: any) => void;
    onOnly?: (source: any) => void;
    onSelect?: (source: any) => void;
    selected?: boolean;
    source?: any;
}
/**
 * @internal
 * @deprecated This component is deprecated use MultiSelectListItem instead
 */
export declare class LegacyMultiSelectListItem extends PureComponent<ILegacyMultiSelectListItemProps> {
    static defaultProps: {
        isLoading: boolean;
        onMouseOver: (...args: any[]) => void;
        onMouseOut: (...args: any[]) => void;
        onOnly: (...args: any[]) => void;
        onSelect: (...args: any[]) => void;
        selected: boolean;
        source: {};
    };
    constructor(props: ILegacyMultiSelectListItemProps);
    protected getClassNames(): string;
    protected handleSelect: () => void;
    protected handleMouseOver: () => void;
    protected handleMouseOut: () => void;
    private handleOnly;
    protected renderOnly(): JSX.Element;
    render(): JSX.Element;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<ILegacyMultiSelectListItemProps>> & {
    WrappedComponent: React.ComponentType<ILegacyMultiSelectListItemProps>;
};
export default _default;
//# sourceMappingURL=LegacyMultiSelectListItem.d.ts.map