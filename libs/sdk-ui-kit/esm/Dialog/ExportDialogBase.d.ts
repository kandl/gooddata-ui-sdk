/// <reference types="react" />
import { DialogBase } from "./DialogBase.js";
import { IExportDialogBaseProps, IExportDialogBaseState } from "./typings.js";
/**
 * @internal
 */
export declare class ExportDialogBase extends DialogBase<IExportDialogBaseProps> {
    static defaultProps: IExportDialogBaseProps;
    state: IExportDialogBaseState;
    render(): JSX.Element;
    private onFilterContextChange;
    private onMergeHeadersChange;
    private onSubmit;
}
//# sourceMappingURL=ExportDialogBase.d.ts.map