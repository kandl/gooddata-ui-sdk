// (C) 2007-2022 GoodData Corporation
import React from "react";
import { ColorLegend } from "./ColorLegend.js";
/**
 * @internal
 */
export class HeatmapLegend extends React.PureComponent {
    render() {
        const { title, series, format, numericSymbols, size, position } = this.props;
        const data = series.map((item) => {
            const { range, color } = item;
            return { range, color };
        });
        return (React.createElement(ColorLegend, { data: data, format: format, size: size, numericSymbols: numericSymbols, position: position, title: title }));
    }
}
//# sourceMappingURL=HeatmapLegend.js.map