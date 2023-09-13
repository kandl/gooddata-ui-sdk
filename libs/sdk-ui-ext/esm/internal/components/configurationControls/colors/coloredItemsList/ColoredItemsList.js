// (C) 2019-2023 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { DropdownList } from "@gooddata/sdk-ui-kit";
import ColoredItem from "./ColoredItem.js";
import { getSearchedItems } from "../../../../utils/colors.js";
const VISIBLE_ITEMS_COUNT = 5;
const SEARCHFIELD_VISIBILITY_THRESHOLD = 7;
const DROPDOWN_BODY_WIDTH = 218;
class ColoredItemsList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onScroll = () => {
            var _a;
            if ((_a = this.listRef) === null || _a === void 0 ? void 0 : _a.current) {
                const node = this.listRef.current;
                node.dispatchEvent(new CustomEvent("goodstrap.scrolled", { bubbles: true }));
            }
        };
        this.onSearch = (searchString) => {
            this.setState({ searchString });
            this.closeOpenDropdownOnSearch();
        };
        this.isSearchFieldVisible = () => {
            return this.props.inputItems.length > SEARCHFIELD_VISIBILITY_THRESHOLD && !this.props.isLoading;
        };
        this.onSelect = (selectedColorItem, color) => {
            this.props.onSelect(selectedColorItem, color);
        };
        this.state = {
            searchString: "",
        };
        this.listRef = React.createRef();
    }
    render() {
        const searchString = this.isSearchFieldVisible() ? this.state.searchString : "";
        const items = getSearchedItems(this.props.inputItems, searchString);
        return (React.createElement("div", { ref: this.listRef },
            React.createElement(DropdownList, { width: DROPDOWN_BODY_WIDTH, showSearch: this.isSearchFieldVisible(), searchString: searchString, onSearch: this.onSearch, onScrollStart: this.onScroll, items: items, className: "gd-colored-items-list", maxVisibleItemsCount: VISIBLE_ITEMS_COUNT, isLoading: this.props.isLoading, renderItem: ({ item }) => (React.createElement(ColoredItem, { colorPalette: this.props.colorPalette, onSelect: this.onSelect, showCustomPicker: this.props.showCustomPicker, disabled: this.props.disabled, item: item })) })));
    }
    closeOpenDropdownOnSearch() {
        // we have to close all dropdown ONE-3526
        // (IE has bug onClick on ClearIcon in Input doesn't fire click event and dropdown will not close)
        // so we can close it by onScroll event
        this.onScroll();
    }
}
ColoredItemsList.defaultProps = {
    disabled: false,
    isLoading: false,
};
export default injectIntl(ColoredItemsList);
//# sourceMappingURL=ColoredItemsList.js.map