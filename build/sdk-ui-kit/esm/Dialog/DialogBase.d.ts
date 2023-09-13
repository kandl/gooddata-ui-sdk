import React, { PureComponent } from "react";
import { IDialogBaseProps } from "./typings.js";
/**
 * @internal
 */
export declare class DialogBase<P extends IDialogBaseProps> extends PureComponent<P> {
    static defaultProps: Partial<IDialogBaseProps>;
    protected onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void | undefined;
    protected getDialogClasses(additionalClassName?: string): string;
    protected renderCloseButton(): JSX.Element;
    render(): JSX.Element;
}
//# sourceMappingURL=DialogBase.d.ts.map