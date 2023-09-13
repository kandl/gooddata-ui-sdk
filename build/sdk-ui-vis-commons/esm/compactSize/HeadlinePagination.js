// (C) 2021 GoodData Corporation
import React, { useState } from "react";
import { HeadlinePaginationRenderer } from "./HeadlinePaginationRenderer.js";
/**
 * @internal
 */
export const HeadlinePagination = ({ renderSecondaryItem, renderTertiaryItem, }) => {
    const [item, setItem] = useState(1);
    const showNextItem = () => setItem(item + 1);
    const showPrevItem = () => setItem(item - 1);
    return (React.createElement(React.Fragment, null,
        React.createElement(HeadlinePaginationRenderer, { item: item, showNextItem: showNextItem, showPrevItem: showPrevItem }),
        item === 1 && renderSecondaryItem(),
        item === 2 && renderTertiaryItem()));
};
//# sourceMappingURL=HeadlinePagination.js.map