import { transformDateFormat } from "../../dateFormatting/dateFormatter.js";
export function createResultHeaderTransformer(dateAttributeUris) {
    return (resultHeader, postProcessing) => {
        return transformDateFormat(resultHeader, dateAttributeUris, postProcessing === null || postProcessing === void 0 ? void 0 : postProcessing.dateFormat);
    };
}
//# sourceMappingURL=result.js.map