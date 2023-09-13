// (C) 2020-2023 GoodData Corporation
import { isAttributeDescriptor, isResultAttributeHeader, } from "@gooddata/sdk-model";
import { createDateValueFormatter } from "./dateValueFormatter.js";
import { DEFAULT_DATE_FORMAT } from "./dateValueParser.js";
import { createDefaultDateFormatter } from "./defaultDateFormatter.js";
// TODO: rewrite. move search for date attributes into data view facade / meta() section
export function findDateAttributeUris(dimensions) {
    const dateAttrsDescriptor = dimensions
        .reduce((attrDimensions, dimensionItem) => {
        attrDimensions.push(...dimensionItem.headers.filter(isAttributeDescriptor));
        return attrDimensions;
    }, [])
        .filter((attrDescriptor) => attrDescriptor.attributeHeader.type === "GDC.time.day_us");
    return dateAttrsDescriptor.map((dateAttrDescriptor) => dateAttrDescriptor.attributeHeader.formOf.uri);
}
export function transformDateFormat(resultHeader, dateAttributeUris, dateFormat) {
    if (!isResultAttributeHeader(resultHeader) ||
        !(dateAttributeUris === null || dateAttributeUris === void 0 ? void 0 : dateAttributeUris.length) ||
        !dateFormat ||
        dateFormat === DEFAULT_DATE_FORMAT) {
        return resultHeader;
    }
    const resultHeaderUri = resultHeader.attributeHeaderItem.uri;
    const foundUri = dateAttributeUris.some((dateAttributeUri) => resultHeaderUri === null || resultHeaderUri === void 0 ? void 0 : resultHeaderUri.startsWith(dateAttributeUri));
    if (!foundUri) {
        return resultHeader;
    }
    try {
        const dateValueFormatter = createDateValueFormatter(createDefaultDateFormatter(dateFormat));
        return {
            attributeHeaderItem: {
                name: dateValueFormatter(resultHeader.attributeHeaderItem.name),
                uri: resultHeaderUri,
            },
        };
    }
    catch (_a) {
        return resultHeader;
    }
}
//# sourceMappingURL=dateFormatter.js.map