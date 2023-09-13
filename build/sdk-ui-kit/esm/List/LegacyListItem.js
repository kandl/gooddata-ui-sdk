// (C) 2020-2022 GoodData Corporation
import React, { Component } from "react";
/**
 * @internal
 * @deprecated This component is deprecated use ListItem instead
 */
class LegacyListItem extends Component {
    render() {
        var _a, _b, _c, _d;
        const { item, listItemClass } = this.props;
        const ListItemComponent = listItemClass;
        const itemType = (_b = (_a = item === null || item === void 0 ? void 0 : item.source) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : null;
        if (itemType === "separator") {
            return React.createElement("div", { role: "list-item-separator", className: "gd-list-item gd-list-item-separator" });
        }
        if (itemType === "header") {
            const itemTitle = (_d = (_c = item === null || item === void 0 ? void 0 : item.source) === null || _c === void 0 ? void 0 : _c.title) !== null && _d !== void 0 ? _d : null;
            return (React.createElement("div", { role: "list-item-header", className: "gd-list-item gd-list-item-header" }, itemTitle));
        }
        return React.createElement(ListItemComponent, Object.assign({}, item));
    }
}
LegacyListItem.defaultProps = {
    item: {},
};
export { LegacyListItem };
//# sourceMappingURL=LegacyListItem.js.map