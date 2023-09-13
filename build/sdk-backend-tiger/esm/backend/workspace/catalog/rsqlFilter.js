// (C) 2021-2022 GoodData Corporation
import { isUriRef } from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";
import { invariant } from "ts-invariant";
// Since tags can have spaces, need to parse this specific values to work with RSQL filtering. See https://github.com/jirutka/rsql-parser#grammar-and-semantic.
function parseTagsToRSQLFormat(tagsIdentifiers) {
    return tagsIdentifiers.map((tag) => (tag.indexOf(" ") >= 0 ? `'${tag}'` : tag));
}
export function tagsToRsqlFilter({ includeTags, excludeTags, }) {
    const rsqlFilterParts = [];
    if (!isEmpty(includeTags)) {
        const includeTagsIdentifiers = tagsToIdentifiers(includeTags);
        const includeParsedTagsIdentifiers = parseTagsToRSQLFormat(includeTagsIdentifiers);
        rsqlFilterParts.push(`tags=in=(${includeParsedTagsIdentifiers.join(",")})`);
    }
    if (!isEmpty(excludeTags)) {
        const excludeTagsIdentifiers = tagsToIdentifiers(excludeTags);
        const excludeParsedTagsIdentifiers = parseTagsToRSQLFormat(excludeTagsIdentifiers);
        rsqlFilterParts.push(`tags=out=(${excludeParsedTagsIdentifiers.join(",")})`);
    }
    return rsqlFilterParts.join(";");
}
export function addRsqlFilterToParams(params, filter) {
    if (isEmpty(filter)) {
        return params;
    }
    return Object.assign(Object.assign({}, params), { filter });
}
function tagsToIdentifiers(tags) {
    return tags.map((ref) => {
        // Tags cannot be accessed by any separate endpoint, so it doesn't make sense to reference them by uri.
        // We will likely change the tag type signature from ObjRef to plain string in the future.
        invariant(!isUriRef(ref), "Tags cannot be referenced by uri!");
        return ref.identifier;
    });
}
//# sourceMappingURL=rsqlFilter.js.map