import { Component, ReactNode } from "react";
import { IFlexDimensionsProps, IFlexDimensionsState } from "./typings.js";
/**
 * @internal
 */
export declare class FlexDimensions extends Component<IFlexDimensionsProps, IFlexDimensionsState> {
    static defaultProps: {
        children: boolean;
        className: string;
        measureWidth: boolean;
        measureHeight: boolean;
    };
    private wrapperRef;
    private readonly throttledUpdateSize;
    constructor(props: IFlexDimensionsProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getChildrenDimensions(): Partial<IFlexDimensionsState>;
    updateSize: () => void;
    renderChildren(): ReactNode;
    render(): ReactNode;
}
//# sourceMappingURL=FlexDimensions.d.ts.map