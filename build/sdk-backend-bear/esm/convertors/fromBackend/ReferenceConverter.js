import { isUri } from "@gooddata/api-client-bear";
import isArray from "lodash/isArray.js";
import isObject from "lodash/isObject.js";
import isString from "lodash/isString.js";
import { v4 as uuidv4 } from "uuid";
/*
 * Helpers
 */
const getReferenceValue = (id, references) => references[id];
const getReferenceId = (value, references) => Object.keys(references).find((id) => references[id] === value);
const defaultIdGenerator = () => uuidv4().replace(/-/g, "");
/**
 * Recursively traverses the object and tries to apply a conversion to every string value
 */
const traverse = (obj, convert) => {
    if (isArray(obj)) {
        return obj.map((a) => traverse(a, convert));
    }
    else if (isObject(obj)) {
        return Object.keys(obj).reduce((result, key) => {
            result[key] = traverse(obj[key], convert);
            return result;
        }, {});
    }
    else if (isString(obj)) {
        return convert(obj);
    }
    else {
        return obj;
    }
};
const createConverter = (conversionFunction) => (conversionData, idGenerator = defaultIdGenerator) => {
    return conversionFunction(conversionData, idGenerator);
};
/*
 * Conversion from References to URIs
 */
const convertReferenceToUri = (references) => (value) => getReferenceValue(value, references) || value;
/**
 * Converts URIs to reference based values
 *
 * @param conversionData - Data to convert
 * @param idGenerator - Function that returns unique ids, defaults to uuid
 *
 * @internal
 */
export const convertReferencesToUris = createConverter(({ references, properties }) => {
    return {
        properties: traverse(properties, convertReferenceToUri(references)),
        references,
    };
});
/*
 * Conversion from URIs to References
 */
const createUriToReferenceConverter = (originalReferences, idGenerator) => {
    const convertedReferences = {};
    return {
        convertedReferences,
        conversion: (value) => {
            if (!isUri(value)) {
                return value;
            }
            const id = getReferenceId(value, originalReferences) || // try to reuse original references
                getReferenceId(value, convertedReferences) || // or use already converted new references
                idGenerator(); // or get a completely new id
            convertedReferences[id] = value;
            return id;
        },
    };
};
/**
 * Converts URIs to reference based values
 *
 * @param conversionData - Data to convert
 * @param idGenerator - Function that returns unique ids, defaults to uuid
 * @internal
 */
export const convertUrisToReferences = createConverter(({ properties, references }, idGenerator) => {
    const converter = createUriToReferenceConverter(references, idGenerator);
    return {
        properties: traverse(properties, converter.conversion),
        references: converter.convertedReferences,
    };
});
//# sourceMappingURL=ReferenceConverter.js.map