import { __rest } from "tslib";
// (C) 2020 GoodData Corporation
import React, { PureComponent } from "react";
import { Overlay } from "../Overlay/index.js";
import { ConfirmDialogBase } from "./ConfirmDialogBase.js";
/**
 * @internal
 */
export class ConfirmDialog extends PureComponent {
    render() {
        const _a = this.props, { containerClassName } = _a, dialogProps = __rest(_a, ["containerClassName"]);
        return (React.createElement(Overlay, { alignPoints: [
                {
                    align: "cc cc",
                },
            ], isModal: true, positionType: "fixed", containerClassName: containerClassName },
            React.createElement(ConfirmDialogBase, Object.assign({}, dialogProps))));
    }
}
//# sourceMappingURL=ConfirmDialog.js.map