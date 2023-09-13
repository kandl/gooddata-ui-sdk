// (C) 2019-2023 GoodData Corporation
import React, { createContext, useContext, useDebugValue, useState } from "react";
import noop from "lodash/noop.js";
/**
 * @internal
 */
const PlaceholdersContext = createContext({
    state: {
        placeholders: {},
    },
    updateState: noop,
});
PlaceholdersContext.displayName = "PlaceholdersContext";
/**
 * @internal
 */
export const usePlaceholdersContext = () => useContext(PlaceholdersContext);
/**
 * Wraps component into a PlaceholdersContext consumer enabling the children of this to access the current
 * placeholders state.
 *
 * @public
 */
export function PlaceholdersProvider(props) {
    var _a;
    const { children, initialValues } = props;
    const accumulator = {};
    const initialPlaceholdersState = (_a = initialValues === null || initialValues === void 0 ? void 0 : initialValues.reduce((acc, [placeholder, value]) => {
        acc[placeholder.id] = Object.assign(Object.assign({}, placeholder), { value });
        return acc;
    }, accumulator)) !== null && _a !== void 0 ? _a : {};
    const [state, updateState] = useState({
        placeholders: initialPlaceholdersState,
    });
    useDebugValue(state);
    return (React.createElement(PlaceholdersContext.Provider, { value: {
            state,
            updateState,
        } }, children));
}
//# sourceMappingURL=context.js.map