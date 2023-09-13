// (C) 2019-2022 GoodData Corporation
import { isAttributeHeader } from "@gooddata/api-client-tiger";
import { idRef, isIdentifierRef, isSimpleMeasure, measureItem, measureLocalId, } from "@gooddata/sdk-model";
import keyBy from "lodash/keyBy.js";
import mapValues from "lodash/mapValues.js";
import groupBy from "lodash/groupBy.js";
import uniqBy from "lodash/uniqBy.js";
const DEFAULT_FORMAT = "#,#.##";
function transformDimension(dim, simpleMeasureRefs, attrTotals) {
    return {
        headers: dim.headers.map((header) => {
            var _a, _b;
            const h = header;
            if (isAttributeHeader(h)) {
                return {
                    attributeHeader: {
                        // TODO: TIGER-HACK: Tiger provides no uri
                        uri: "",
                        identifier: h.attributeHeader.label.id,
                        ref: idRef(h.attributeHeader.label.id, "displayForm"),
                        formOf: {
                            identifier: h.attributeHeader.attribute.id,
                            name: h.attributeHeader.attributeName,
                            // TODO: TIGER-HACK: Tiger provides no uri
                            uri: "",
                            ref: idRef(h.attributeHeader.attribute.id, "attribute"),
                        },
                        localIdentifier: h.attributeHeader.localIdentifier,
                        name: h.attributeHeader.labelName,
                        totalItems: (_a = attrTotals[h.attributeHeader.localIdentifier]) !== null && _a !== void 0 ? _a : [],
                        granularity: h.attributeHeader.granularity,
                        format: h.attributeHeader.format,
                    },
                };
            }
            else {
                /*
                 * Funny stuff #1: tiger does not send name & format according to the contract (which is inspired
                 *  by bear behavior). The code must reconciliate as follows:
                 *
                 *  -  if name does not come from tiger, then default the name to localIdentifier
                 *  -  if format does not come from tiger, then default to a hardcoded format
                 *
                 * Funny stuff #2: tiger does not send simple measure identifier. The code must reconciliate:
                 *
                 * -   look up simple measure by local id from execution definition
                 */
                return {
                    measureGroupHeader: {
                        items: ((_b = h.measureGroupHeaders) === null || _b === void 0 ? void 0 : _b.map((m) => {
                            var _a, _b;
                            const ref = simpleMeasureRefs[m.localIdentifier];
                            const identifier = isIdentifierRef(ref) ? ref.identifier : undefined;
                            return {
                                measureHeaderItem: {
                                    localIdentifier: m.localIdentifier,
                                    name: (_a = m.name) !== null && _a !== void 0 ? _a : m.localIdentifier,
                                    format: (_b = m.format) !== null && _b !== void 0 ? _b : DEFAULT_FORMAT,
                                    identifier,
                                    ref,
                                },
                            };
                        })) || [],
                    },
                };
            }
        }),
    };
}
/**
 * Compute mapping from attribute identifiers to all ITotalDescriptors corresponding to that attribute.
 */
function getAttrTotals(def) {
    const attrTotals = def.dimensions.map((dim) => {
        var _a;
        const totalsByAttrId = groupBy((_a = dim.totals) !== null && _a !== void 0 ? _a : [], (total) => total.attributeIdentifier);
        return mapValues(totalsByAttrId, (totals) => uniqBy(totals, (total) => total.type).map((total) => ({ totalHeaderItem: { name: total.type } })));
    });
    return Object.assign({}, ...attrTotals);
}
/**
 * Transforms dimensions in the result provided by backend to the unified model used in SDK. The tiger backend
 * does not return all the data needed by the SPI. For some information, the transformation needs to look into
 * the input execution definition.
 *
 * @param dimensions - dimensions from execution result
 * @param def - execution definition, this is needed to augment the descriptors with data required by the SPI which
 *  the tiger backend does not pass
 *
 * @returns dimensions as used in the unified model
 */
export function transformResultDimensions(dimensions, def) {
    const simpleMeasures = def.measures.filter(isSimpleMeasure);
    const measureRefs = mapValues(keyBy(simpleMeasures, measureLocalId), (m) => measureItem(m));
    return dimensions.map((dim) => transformDimension(dim, measureRefs, getAttrTotals(def)));
}
//# sourceMappingURL=dimensions.js.map