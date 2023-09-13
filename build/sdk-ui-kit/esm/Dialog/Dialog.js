import { __rest } from "tslib";
// (C) 2020 GoodData Corporation
import React, { Component } from "react";
import { Overlay } from "../Overlay/index.js";
import { DialogBase } from "./DialogBase.js";
/**
 * @internal
 */
export class Dialog extends Component {
    render() {
        const _a = this.props, { containerClassName, onClick, onMouseUp, onMouseOver } = _a, dialogProps = __rest(_a, ["containerClassName", "onClick", "onMouseUp", "onMouseOver"]);
        return (React.createElement(Overlay, { alignPoints: [
                {
                    align: "cc cc",
                },
            ], isModal: true, positionType: "fixed", containerClassName: containerClassName, onMouseUp: onMouseUp, onMouseOver: onMouseOver, onClick: onClick },
            React.createElement(DialogBase, Object.assign({}, dialogProps))));
    }
}
//# sourceMappingURL=Dialog.js.map