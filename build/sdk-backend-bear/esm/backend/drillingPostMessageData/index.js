import compact from "lodash/compact.js";
import includes from "lodash/includes.js";
import isArray from "lodash/isArray.js";
import uniq from "lodash/uniq.js";
const getUriFromPairByIdentifier = (identifier, uriIdentifierPairs, excludeUris) => {
    const resolvedPair = uriIdentifierPairs
        .filter((result) => !includes(excludeUris, result.uri))
        .find((result) => result.identifier === identifier);
    return resolvedPair === null || resolvedPair === void 0 ? void 0 : resolvedPair.uri;
};
/**
 * @internal
 */
export const sanitizeDrillingActivationPostMessageData = async (workspace, postMessageData, idToUriConverter) => {
    const { uris, identifiers, composedFrom } = postMessageData;
    const simpleUris = isArray(uris) ? uris : [];
    const simpleIdentifiers = isArray(identifiers) ? identifiers : [];
    const composedFromUris = (composedFrom === null || composedFrom === void 0 ? void 0 : composedFrom.uris) && isArray(composedFrom.uris) ? composedFrom.uris : [];
    const composedFromIdentifiers = (composedFrom === null || composedFrom === void 0 ? void 0 : composedFrom.identifiers) && isArray(composedFrom.identifiers) ? composedFrom.identifiers : [];
    const allIdentifiers = uniq([...simpleIdentifiers, ...composedFromIdentifiers]);
    const urisFromIdentifiers = allIdentifiers.length
        ? await idToUriConverter(workspace, allIdentifiers)
        : [];
    const allUris = uniq([
        ...simpleUris,
        ...compact(simpleIdentifiers.map((identifier) => getUriFromPairByIdentifier(identifier, urisFromIdentifiers, simpleUris))),
    ]);
    const allComposedFromUris = uniq([
        ...composedFromUris,
        ...compact(composedFromIdentifiers.map((identifier) => getUriFromPairByIdentifier(identifier, urisFromIdentifiers, composedFromUris))),
    ]);
    return { uris: allUris, composedFrom: { uris: allComposedFromUris } };
};
//# sourceMappingURL=index.js.map