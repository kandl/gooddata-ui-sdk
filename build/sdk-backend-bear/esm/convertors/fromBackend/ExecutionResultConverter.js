// (C) 2019-2022 GoodData Corporation
import { isAttributeHeader } from "@gooddata/api-model-bear";
import { isUri } from "@gooddata/api-client-bear";
import { uriRef, } from "@gooddata/sdk-model";
export function convertWarning(warning) {
    var _a;
    return {
        warningCode: warning.warningCode,
        message: warning.message,
        parameters: (_a = warning.parameters) === null || _a === void 0 ? void 0 : _a.map((param) => (isUri(param) ? uriRef(param) : param)),
    };
}
/**
 * Converts execution result's dimension headers as passed by backend into dimension descriptor. At the moment, this function
 * ensures that the 'ref' properties are correctly filled in.
 *
 * @param dims - result dimensions.
 */
export function convertDimensions(dims) {
    return dims.map((dim) => {
        return {
            headers: dim.headers.map((header) => {
                if (isAttributeHeader(header)) {
                    return {
                        attributeHeader: Object.assign(Object.assign({}, header.attributeHeader), { ref: uriRef(header.attributeHeader.uri), formOf: Object.assign(Object.assign({}, header.attributeHeader.formOf), { ref: uriRef(header.attributeHeader.formOf.uri) }) }),
                    };
                }
                else {
                    return {
                        measureGroupHeader: {
                            items: header.measureGroupHeader.items.map((measure) => {
                                return {
                                    measureHeaderItem: Object.assign(Object.assign({}, measure.measureHeaderItem), { ref: measure.measureHeaderItem.uri
                                            ? uriRef(measure.measureHeaderItem.uri)
                                            : undefined }),
                                };
                            }),
                            totalItems: header.measureGroupHeader.totalItems,
                        },
                    };
                }
            }),
        };
    });
}
//# sourceMappingURL=ExecutionResultConverter.js.map