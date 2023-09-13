// (C) 2019-2022 GoodData Corporation
import { v4 as uuidv4 } from "uuid";
import identity from "lodash/identity.js";
import { useComposedPlaceholder, usePlaceholder } from "./hooks.js";
/**
 * Create a new placeholder.
 * See {@link IPlaceholder}.
 *
 * @public
 */
export function newPlaceholder(defaultValue, options = {}) {
    const { id, validate } = options;
    const placeholder = {
        type: "IPlaceholder",
        id: id !== null && id !== void 0 ? id : uuidv4(),
        defaultValue,
        validate,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        use: () => usePlaceholder(placeholder),
    };
    return placeholder;
}
/**
 * Create a new composed placeholder.
 * See {@link IComposedPlaceholder}.
 *
 * @public
 */
export function newComposedPlaceholder(placeholders, computeValue = identity) {
    const placeholder = {
        type: "IComposedPlaceholder",
        placeholders,
        computeValue,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        use: (resolutionContext) => useComposedPlaceholder(placeholder, resolutionContext),
    };
    return placeholder;
}
//# sourceMappingURL=factory.js.map