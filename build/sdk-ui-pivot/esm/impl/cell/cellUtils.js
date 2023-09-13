// (C) 2007-2023 GoodData Corporation
import cx from "classnames";
import { ClientFormatterFacade } from "@gooddata/number-formatter";
function getFormattedNumber(value, format, separators) {
    const parsedNumber = ClientFormatterFacade.convertValue(value);
    return ClientFormatterFacade.formatValue(parsedNumber, format, separators);
}
// TODO: move to cell class; refactor tests
export function getCellClassNames(rowIndex, columnIndex, isDrillable) {
    return cx({
        "gd-cell-drillable": isDrillable,
    }, "gd-cell", `s-cell-${rowIndex}-${columnIndex}`, "s-table-cell");
}
export function getMeasureCellFormattedValue(value, format, separators) {
    const { formattedValue } = getFormattedNumber(value, format, separators);
    return formattedValue === "" ? "–" : formattedValue;
}
export function getMeasureCellStyle(value, format, separators, applyColor) {
    const { formattedValue, colors } = getFormattedNumber(value, format, separators);
    const color = colors.color;
    const backgroundColor = colors.backgroundColor;
    const measureCellDefault = {
        textAlign: "right",
    };
    if (formattedValue === "") {
        return Object.assign(Object.assign({}, measureCellDefault), { color: "var(--gd-table-nullValueColor, var(--gd-palette-complementary-6, #94a1ad))", fontWeight: "bold" });
    }
    if (!applyColor) {
        return Object.assign({}, measureCellDefault);
    }
    return Object.assign(Object.assign(Object.assign({}, measureCellDefault), (color && { color })), (backgroundColor && { backgroundColor }));
}
//# sourceMappingURL=cellUtils.js.map