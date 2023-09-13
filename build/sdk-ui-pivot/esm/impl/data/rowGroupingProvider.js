// (C) 2007-2022 GoodData Corporation
import max from "lodash/max.js";
import { isResultAttributeHeader } from "@gooddata/sdk-model";
class DefaultGroupingProvider {
    reset() {
        /* not implemented in this provider */
    }
    isGroupBoundary(_rowIndex) {
        return false;
    }
    isColumnWithGrouping(_columnId) {
        return false;
    }
    processPage(_pageRows, _rowOffset, _columnIds) {
        /* not implemented in this provider */
    }
    isRepeatedValue(_columnId, _rowIndex) {
        return false;
    }
}
class AttributeGroupingProvider {
    constructor() {
        this.itemUris = {};
        this.itemRepetitions = {};
        this.repetitionsCounts = [];
        this.maxRepetitions = 0;
        this.reset();
    }
    reset() {
        this.itemUris = {};
        this.itemRepetitions = {};
        this.repetitionsCounts = [];
        this.maxRepetitions = 0;
    }
    isRepeatedValue(columnId, rowIndex) {
        if (this.itemRepetitions[columnId]) {
            return this.itemRepetitions[columnId][rowIndex] === true;
        }
        return false;
    }
    isGroupBoundary(rowIndex) {
        return (!!this.repetitionsCounts &&
            (this.repetitionsCounts[rowIndex] === undefined ||
                this.repetitionsCounts[rowIndex] < this.maxRepetitions));
    }
    isColumnWithGrouping(columnId) {
        return Object.keys(this.itemRepetitions).indexOf(columnId) < this.maxRepetitions;
    }
    processPage(pageRows, rowOffset, columnIds) {
        columnIds.forEach((columnId) => {
            if (!this.itemUris[columnId]) {
                this.itemUris[columnId] = [];
            }
            pageRows.forEach((row, rowIndex) => {
                const headerItem = row.headerItemMap[columnId];
                if (isResultAttributeHeader(headerItem)) {
                    const attributeItemUri = headerItem.attributeHeaderItem.uri;
                    this.itemUris[columnId][rowIndex + rowOffset] = attributeItemUri;
                }
            });
        });
        this.update();
    }
    update() {
        var _a;
        this.repetitionsCounts = null;
        this.maxRepetitions = 0;
        let previousColumnId = null;
        Object.keys(this.itemUris).forEach((columnId) => {
            const rowCount = this.itemUris[columnId].length;
            this.itemRepetitions[columnId] = Array(rowCount).fill(false);
            if (this.repetitionsCounts === null) {
                this.repetitionsCounts = Array(rowCount).fill(0);
            }
            this.updateAttributeColumn(this.itemUris[columnId], this.itemRepetitions[columnId], previousColumnId !== null ? this.itemRepetitions[previousColumnId] : null);
            previousColumnId = columnId;
        });
        this.maxRepetitions = (_a = max(this.repetitionsCounts)) !== null && _a !== void 0 ? _a : 0;
    }
    updateAttributeColumn(itemUris, itemRepetitions, previousAttributeItemRepetitions) {
        let previousItemUri = null;
        itemUris.forEach((itemUri, rowIndex) => {
            let repeatedItem = previousItemUri === itemUri;
            if (previousAttributeItemRepetitions !== null) {
                repeatedItem = repeatedItem && previousAttributeItemRepetitions[rowIndex];
            }
            if (repeatedItem) {
                itemRepetitions[rowIndex] = true;
                this.repetitionsCounts[rowIndex] += 1;
            }
            previousItemUri = itemUri;
        });
    }
}
export class GroupingProviderFactory {
    static createProvider(groupRows) {
        if (groupRows) {
            return new AttributeGroupingProvider();
        }
        return new DefaultGroupingProvider();
    }
}
//# sourceMappingURL=rowGroupingProvider.js.map