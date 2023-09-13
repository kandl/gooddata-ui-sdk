import React from "react";
import TotalHeaderCell, { ALIGN_LEFT } from "./TotalHeaderCell.js";
export const ColumnTotalGroupHeader = (props) => {
    return (React.createElement(TotalHeaderCell, { className: "gd-pivot-table-column-total-group-header s-pivot-table-column-total-group-header", textAlign: ALIGN_LEFT, displayText: props.displayName }));
};
//# sourceMappingURL=ColumnTotalGroupHeader.js.map