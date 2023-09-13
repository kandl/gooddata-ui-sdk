import { getMappingHeaderName, getMappingHeaderUri, hasMappingHeaderFormattedName } from "@gooddata/sdk-ui";
import { invariant } from "ts-invariant";
/**
 * @deprecated this is linked to deprecated API
 */
function extractIdsFromAttributeElementUri(uri) {
    // no reasonable way to avoid the super-linear backtracking right now
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    const [, attributeId, , attributeValueId = null] = uri.match(/obj\/([^/]*)(\/elements\?id=)?(.*)$/);
    return [attributeId, attributeValueId];
}
/**
 * Given row in an ag-grid table and the table's descriptor, this function will create a drilled row. Drilled
 * row is an array with cols ordered in the same way as they appear in the table. The information about slice
 * columns appear first, followed by values of data columns.
 *
 * The the information about slice column contains both
 */
export function createDrilledRow(row, tableDescriptor) {
    const result = [];
    tableDescriptor.headers.sliceCols.forEach((col) => {
        var _a;
        const mappingHeader = row.headerItemMap[col.id];
        // if there is no entry for slice column in the row's headerItemMap, then the construction of
        // row data is hosed or table code allowed to click on something that should not be drillable
        invariant(mappingHeader);
        const drillItemUri = (_a = getMappingHeaderUri(mappingHeader)) !== null && _a !== void 0 ? _a : null;
        const id = getDrillItemId(drillItemUri);
        switch (id) {
            case "":
                result.push(createDrilledSliceDetail("", "", ""));
                break;
            case null:
                result.push(createDrilledSliceDetail(null, null, null));
                break;
            default:
                if (hasMappingHeaderFormattedName(mappingHeader)) {
                    // we want to use the original name instead of the formatted name in drilling
                    result.push(createDrilledSliceDetail(id, drillItemUri, getMappingHeaderName(mappingHeader) || row[col.id]));
                }
                else {
                    result.push(createDrilledSliceDetail(id, drillItemUri, row[col.id]));
                }
                break;
        }
    });
    tableDescriptor.headers.leafDataCols.forEach((col) => {
        result.push(row[col.id]);
    });
    return result;
}
function createDrilledSliceDetail(id, uri, name) {
    return {
        id,
        uri,
        name,
    };
}
function getDrillItemId(drillItemUri) {
    // Note: this is related to `id` deprecation. The whole `id` thing does not make sense. Code should
    // send the entire URI (== PK of the element) so that the code is backend-agnostic. Doing the check
    // here so that for bear, drill contains the `id` and for other backends code adds the entire uri (PK).
    // with this in place, we don't have to worry about how other backends represent the PK of the element.
    return (drillItemUri === null || drillItemUri === void 0 ? void 0 : drillItemUri.startsWith("/gdc"))
        ? extractIdsFromAttributeElementUri(drillItemUri)[1]
        : null !== null && null !== void 0 ? null : drillItemUri;
}
//# sourceMappingURL=drilledRowFactory.js.map