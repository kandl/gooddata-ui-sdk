// (C) 2019-2021 GoodData Corporation
import { attributeDescriptorLocalId } from "@gooddata/sdk-model";
import { AVAILABLE_TOTALS } from "../../base/constants.js";
import findIndex from "lodash/findIndex.js";
import intersection from "lodash/intersection.js";
import isEqual from "lodash/isEqual.js";
import sortBy from "lodash/sortBy.js";
import uniq from "lodash/uniq.js";
function getTotalsForMeasureAndType(totals, type, measureLocalIdentifier) {
    return totals.filter((total) => total.measureIdentifier === measureLocalIdentifier && total.type === type);
}
function getAttributeIntersection(totals, type, measureLocalIdentifiers) {
    const attributeGroups = measureLocalIdentifiers.map((measure) => {
        const filteredTotals = getTotalsForMeasureAndType(totals, type, measure);
        return filteredTotals.map((total) => total.attributeIdentifier);
    });
    return intersection(...attributeGroups);
}
function getUniqueMeasures(totals, type) {
    const totalsOfType = totals.filter((total) => total.type === type);
    return uniq(totalsOfType.map((total) => total.measureIdentifier));
}
function areMeasuresSame(measureLocalIdentifiers1, measureLocalIdentifiers2) {
    const sameMeasureLocalIdentifiers = intersection(measureLocalIdentifiers1, measureLocalIdentifiers2);
    return sameMeasureLocalIdentifiers.length === measureLocalIdentifiers2.length;
}
function getTotalsForAttributeHeader(totals, measureLocalIdentifiers, ignoreMeasures = false) {
    return AVAILABLE_TOTALS.reduce((columnTotals, type) => {
        const uniqueMeasureLocalIdentifiers = getUniqueMeasures(totals, type);
        if (ignoreMeasures || areMeasuresSame(uniqueMeasureLocalIdentifiers, measureLocalIdentifiers)) {
            const attributeLocalIdentifiers = getAttributeIntersection(totals, type, uniqueMeasureLocalIdentifiers);
            if (attributeLocalIdentifiers.length) {
                columnTotals.push({
                    type,
                    attributes: attributeLocalIdentifiers,
                });
            }
        }
        return columnTotals;
    }, []);
}
function getTotalsForMeasureHeader(totals, measureLocalIdentifier) {
    return totals.reduce((turnedOnAttributes, total) => {
        if (total.measureIdentifier === measureLocalIdentifier) {
            const totalHeaderType = turnedOnAttributes.find((turned) => turned.type === total.type);
            if (totalHeaderType === undefined) {
                turnedOnAttributes.push({
                    type: total.type,
                    attributes: [total.attributeIdentifier],
                });
            }
            else {
                totalHeaderType.attributes.push(total.attributeIdentifier);
            }
        }
        return turnedOnAttributes;
    }, []);
}
function isTotalEnabledForAttribute(attributeLocalIdentifier, columnAttributeLocalIdentifier, totalType, columnTotals, rowTotals) {
    const columns = columnTotals.some((total) => {
        const find = total.attributes.some((attribute) => attributeLocalIdentifier.includes(attribute));
        return total.type === totalType && find;
    });
    const rows = rowTotals.some((total) => {
        const find = total.attributes.some((attribute) => columnAttributeLocalIdentifier.includes(attribute));
        return total.type === totalType && find;
    });
    return columns || rows;
}
function isTotalEnabledForSubMenuAttribute(attributeLocalIdentifier, totalType, totals) {
    return totals.some((total) => {
        return total.type === totalType && total.attributes.includes(attributeLocalIdentifier);
    });
}
function includeTotals(totals, totalsChanged) {
    const columnTotalsChangedUnique = totalsChanged.filter((totalChanged) => !totals.some((total) => isEqual(total, totalChanged)));
    return [...totals, ...columnTotalsChangedUnique];
}
function excludeTotals(totals, totalsChanged) {
    return totals.filter((total) => !totalsChanged.find((totalChanged) => isEqual(totalChanged, total)));
}
export function getUpdatedColumnOrRowTotals(totals, menuAggregationClickConfig) {
    const { type, measureIdentifiers, attributeIdentifier, include } = menuAggregationClickConfig;
    const totalsChanged = measureIdentifiers.map((measureIdentifier) => ({
        type,
        measureIdentifier,
        attributeIdentifier,
    }));
    const updatedTotals = include
        ? includeTotals(totals, totalsChanged)
        : excludeTotals(totals, totalsChanged);
    return sortBy(updatedTotals, (total) => findIndex(AVAILABLE_TOTALS, (rankedItem) => rankedItem === total.type));
}
export function getAttributeDescriptorsLocalId(attributeDescriptors) {
    if (attributeDescriptors) {
        return attributeDescriptors.map(attributeDescriptorLocalId);
    }
    return [];
}
export default {
    getTotalsForAttributeHeader,
    getTotalsForMeasureHeader,
    isTotalEnabledForAttribute,
    isTotalEnabledForSubMenuAttribute,
    getUpdatedColumnOrRowTotals,
};
//# sourceMappingURL=aggregationsMenuHelper.js.map