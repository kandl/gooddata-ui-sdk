import React from "react";
import cx from "classnames";
import { HEADER_LABEL_CLASS } from "../../base/constants.js";
export default class MixedValuesColumnHeader extends React.Component {
    render() {
        return (React.createElement("div", { className: cx("gd-pivot-table-header s-pivot-table-column-header s-pivot-table-mixed-values-column-header") },
            React.createElement("div", { className: cx(HEADER_LABEL_CLASS, "gd-pivot-table-header-label") })));
    }
}
//# sourceMappingURL=MixedValuesColumnHeader.js.map