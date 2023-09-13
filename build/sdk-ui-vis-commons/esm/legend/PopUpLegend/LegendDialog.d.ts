import React from "react";
export interface ILegendDialogProps {
    name: string;
    isOpen: boolean;
    alignTo: string;
    onCloseDialog: () => void;
    children?: React.ReactNode;
}
export declare const LegendDialog: React.FC<ILegendDialogProps>;
//# sourceMappingURL=LegendDialog.d.ts.map