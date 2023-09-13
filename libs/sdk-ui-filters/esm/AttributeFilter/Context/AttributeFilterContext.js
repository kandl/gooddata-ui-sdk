// (C) 2022-2023 GoodData Corporation
import React, { useContext } from "react";
import { useAttributeFilterController } from "../hooks/useAttributeFilterController.js";
export const AttributeFilterContext = React.createContext(null);
AttributeFilterContext.displayName = "AttributeFilterContext";
/**
 * Context providing AttributeFilter state and callbacks wrapped as {@link AttributeFilterController}.
 * @beta
 */
export const useAttributeFilterContext = () => useContext(AttributeFilterContext);
/**
 * @internal
 */
export const AttributeFilterContextProvider = (props) => {
    var _a, _b;
    const { children, fullscreenOnMobile, title: titleInput, selectionMode, selectFirst } = props;
    const controller = useAttributeFilterController(props);
    const title = (_b = titleInput !== null && titleInput !== void 0 ? titleInput : (_a = controller === null || controller === void 0 ? void 0 : controller.attribute) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "";
    return (React.createElement(AttributeFilterContext.Provider, { value: Object.assign(Object.assign({}, controller), { fullscreenOnMobile, title, selectionMode, selectFirst }) }, children));
};
//# sourceMappingURL=AttributeFilterContext.js.map