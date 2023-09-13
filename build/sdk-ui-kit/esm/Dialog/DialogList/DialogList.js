// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { DialogListLoading } from "./DialogListLoading.js";
import { DialogListEmpty } from "./DialogListEmpty.js";
import { DialogListItemBasic } from "./DialogListItemBasic.js";
/**
 * @internal
 */
export const DialogList = (props) => {
    const { items, isLoading, className, emptyMessageElement, itemComponent, itemClassName, onItemClick, onItemDelete, } = props;
    if (isLoading) {
        return React.createElement(DialogListLoading, null);
    }
    if (items.length === 0) {
        return React.createElement(DialogListEmpty, { message: emptyMessageElement });
    }
    const ListItemComponent = itemComponent !== null && itemComponent !== void 0 ? itemComponent : DialogListItemBasic;
    const classNames = cx("gd-dialog-list-wrapper s-dialog-list-wrapper", className);
    return (React.createElement("div", { className: classNames },
        React.createElement("div", { className: "gd-dialog-list" }, items.map((item) => (React.createElement(ListItemComponent, { key: item.id, className: itemClassName, item: item, onClick: onItemClick, onDelete: onItemDelete }))))));
};
//# sourceMappingURL=DialogList.js.map