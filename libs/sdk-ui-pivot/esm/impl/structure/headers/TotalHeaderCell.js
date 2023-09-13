// (C) 2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import { HEADER_LABEL_CLASS } from "../../base/constants.js";
export const ALIGN_LEFT = "left";
class TotalHeaderCell extends React.Component {
    render() {
        const { className } = this.props;
        return React.createElement("div", { className: cx("gd-pivot-table-header", className) }, this.renderText());
    }
    renderText() {
        const { displayText, textAlign } = this.props;
        const classes = cx(HEADER_LABEL_CLASS, "gd-pivot-table-header-label", {
            "gd-pivot-table-header-label--right": textAlign === "right",
            "gd-pivot-table-header-label--center": textAlign === "center",
        });
        return (React.createElement("div", { className: classes },
            React.createElement("span", null, displayText ? displayText : "")));
    }
}
TotalHeaderCell.defaultProps = {
    textAlign: ALIGN_LEFT,
};
export default TotalHeaderCell;
//# sourceMappingURL=TotalHeaderCell.js.map