import React, { Component } from "react";
/**
 * @internal
 */
export interface IAutoSizeChildren {
    width: number;
    height: number;
}
/**
 * @internal
 */
export interface IAutoSizeProps {
    children: ({ width, height }: IAutoSizeChildren) => React.ReactNode;
}
/**
 * @internal
 */
export declare class AutoSize extends Component<IAutoSizeProps> {
    state: {
        width: number;
        height: number;
    };
    private updateSize;
    private throttledUpdateSize;
    private wrapperRef;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
//# sourceMappingURL=AutoSize.d.ts.map