// (C) 2020-2023 GoodData Corporation
import React, { useCallback } from "react";
import cx from "classnames";
export const AttributeUrlSectionItem = ({ item, onClickHandler, isSelected, }) => {
    const className = cx("gd-list-item gd-menu-item gd-drill-to-attribute-url-option s-drill-to-attribute-url-option gd-icon-hyperlink-warning", {
        "is-selected": isSelected,
    });
    const onClick = useCallback(() => {
        if (!onClickHandler) {
            return;
        }
        onClickHandler(item);
    }, [item, onClickHandler]);
    return (React.createElement("div", { className: className, onClick: onClick },
        React.createElement("span", { className: "gd-parameter-title" }, item.attribute.title),
        React.createElement("span", { className: "addon" },
            "(",
            item.displayForm.title,
            ")")));
};
//# sourceMappingURL=AttributeUrlSectionItem.js.map