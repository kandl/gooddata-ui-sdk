// (C) 2023 GoodData Corporation
import { createContext, useContext } from "react";
import noop from "lodash/noop.js";
export const BaseHeadlineContext = createContext({
    clientWidth: 0,
    clientHeight: 0,
    config: null,
    fireDrillEvent: noop,
});
export const useBaseHeadline = () => useContext(BaseHeadlineContext);
//# sourceMappingURL=BaseHeadlineContext.js.map