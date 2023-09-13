// (C) 2019-2022 GoodData Corporation
import React, { useContext } from "react";
/**
 * @internal
 */
export const useScrollContext = () => useContext(ScrollContext);
/**
 * @internal
 */
export const scrollContextDefault = {
    scrollIntoView: (_element, _bottomMargin, _isElementInvisibleCheck) => { },
};
export const ScrollContext = React.createContext(scrollContextDefault);
//# sourceMappingURL=ScrollContext.js.map