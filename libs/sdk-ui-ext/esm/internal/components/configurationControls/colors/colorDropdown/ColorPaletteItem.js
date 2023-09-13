// (C) 2019-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
const ITEM_MARGIN = 5;
export default class ColorPaletteItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onColorSelected = () => {
            const selectedItem = {
                type: "guid",
                value: this.props.paletteItem.guid,
            };
            this.props.onColorSelected(selectedItem);
        };
        this.itemRef = React.createRef();
    }
    render() {
        return (React.createElement("div", { "aria-label": this.getRgbStringFromPaletteItem(), ref: this.itemRef, onClick: this.onColorSelected, style: {
                backgroundColor: this.getRgbStringFromPaletteItem(),
            }, className: this.getClassNames() }));
    }
    componentDidMount() {
        this.scrollSelectedItemIntoParent();
    }
    scrollSelectedItemIntoParent() {
        if (this.props.selected &&
            this.itemRef.current &&
            this.itemRef.current.parentNode &&
            this.isItemVisible()) {
            const target = this.itemRef.current;
            target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop - ITEM_MARGIN;
        }
    }
    isItemVisible() {
        const target = this.itemRef.current;
        const offset = target.offsetTop - target.parentNode.offsetTop;
        const itemHeight = target.clientHeight;
        const parentHeight = target.parentNode.clientHeight;
        return parentHeight < offset + itemHeight;
    }
    getClassNames() {
        return cx("gd-color-list-item", `s-color-list-item-${this.props.paletteItem.guid}`, {
            "gd-color-list-item-active": this.props.selected,
        });
    }
    getRgbStringFromPaletteItem() {
        const { r, g, b } = this.props.paletteItem.fill;
        return `rgb(${r},${g},${b})`;
    }
}
//# sourceMappingURL=ColorPaletteItem.js.map