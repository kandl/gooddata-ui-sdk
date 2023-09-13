import React from "react";
export interface IOutsideClickHandlerProps {
    onOutsideClick: (e: MouseEvent) => void;
    toggler: HTMLDivElement;
    useCapture?: boolean;
    children?: React.ReactNode;
}
export declare class OutsideClickHandler extends React.Component<IOutsideClickHandlerProps> {
    static defaultProps: {
        useCapture: boolean;
    };
    private wrapperElRef;
    componentDidUpdate(prevProps: IOutsideClickHandlerProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private handleClick;
    private addListeners;
    private removeListeners;
}
//# sourceMappingURL=OutsideClickHandler.d.ts.map