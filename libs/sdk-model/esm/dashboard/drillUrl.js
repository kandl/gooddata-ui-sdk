// (C) 2022 GoodData Corporation
import isString from "lodash/isString.js";
import { isIdentifierRef } from "../objRef/index.js";
import { idRef } from "../objRef/factory.js";
function matchAll(regex, text) {
    const matches = [];
    let match = null;
    while ((match = regex.exec(text)) !== null) {
        matches.push(match);
    }
    return matches;
}
const identifierSplitRegexp = /(\{attribute_title\(.*?\)\})/g;
const identifierMatchRegexp = /\{attribute_title\((.*?)\)\}/g;
const identifierToPlaceholder = (ref) => `{attribute_title(${ref.identifier})}`;
const matchToUrlPlaceholder = (match) => ({
    placeholder: match[0],
    identifier: match[1],
    ref: idRef(match[1], "displayForm"),
    toBeEncoded: match.index !== 0,
});
const splitUrl = (url) => url.split(identifierSplitRegexp);
/**
 * @internal
 */
export const splitDrillUrlParts = (url) => {
    return splitUrl(url).map((urlPart) => {
        const match = identifierMatchRegexp.exec(urlPart);
        if (match !== null) {
            return matchToUrlPlaceholder(match).ref;
        }
        return urlPart;
    });
};
/**
 * @internal
 */
export const joinDrillUrlParts = (parts) => {
    // Back compatibility
    if (isString(parts)) {
        return parts;
    }
    return parts
        .map((urlPart) => {
        if (isIdentifierRef(urlPart)) {
            return identifierToPlaceholder(urlPart);
        }
        return urlPart;
    })
        .join("");
};
/**
 * @internal
 */
export const getAttributeIdentifiersPlaceholdersFromUrl = (url) => matchAll(identifierMatchRegexp, url).map(matchToUrlPlaceholder);
//# sourceMappingURL=drillUrl.js.map