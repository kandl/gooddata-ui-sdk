import { invariant } from "ts-invariant";
import isArray from "lodash/isArray.js";
class ResultDataMethods {
    constructor(dataView) {
        this.dataView = dataView;
    }
    isEmpty() {
        return this.dataView.data.length === 0;
    }
    firstDimSize() {
        return this.dataView.totalCount[0];
    }
    secondDimSize() {
        return this.dataView.totalCount[1];
    }
    dataAt(index) {
        return this.dataView.data[index];
    }
    data() {
        return this.dataView.data;
    }
    singleDimData() {
        const d = this.dataView.data;
        if (d === null) {
            return [];
        }
        const e = d[0];
        invariant(!isArray(e), "trying to work with single-dim data while the underlying data view has two dims");
        return d;
    }
    twoDimData() {
        const d = this.dataView.data;
        if (d === null) {
            return [];
        }
        const e = d[0];
        if (e === null || !e) {
            return [];
        }
        return isArray(e) ? d : [d];
    }
    totals() {
        return this.dataView.totals;
    }
    rowTotals() {
        var _a;
        return (_a = this.dataView.totals) === null || _a === void 0 ? void 0 : _a[0];
    }
    columnTotals() {
        var _a;
        return (_a = this.dataView.totals) === null || _a === void 0 ? void 0 : _a[1];
    }
    totalOfTotals() {
        return this.dataView.totalTotals;
    }
    /**
     *
     * @returns - existance of totals for rows
     */
    hasRowTotals() {
        var _a;
        return ((_a = this.dataView.totals) === null || _a === void 0 ? void 0 : _a[0]) !== undefined && this.dataView.totals[0].length > 0;
    }
    /**
     *
     * @returns - existance of totals for columns
     */
    hasColumnTotals() {
        var _a;
        return ((_a = this.dataView.totals) === null || _a === void 0 ? void 0 : _a[1]) !== undefined && this.dataView.totals[1].length > 0;
    }
    /**
     *
     * @returns - existance of totals
     */
    hasTotals() {
        return this.dataView.totals !== undefined;
    }
}
export function newResultDataMethods(dataView) {
    return new ResultDataMethods(dataView);
}
//# sourceMappingURL=resultDataMethods.js.map