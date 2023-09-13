// (C) 2019-2023 GoodData Corporation
import React from "react";
import { Overlay } from "@gooddata/sdk-ui-kit";
export var DropdownVersionType;
(function (DropdownVersionType) {
    DropdownVersionType[DropdownVersionType["ColorPalette"] = 0] = "ColorPalette";
    DropdownVersionType[DropdownVersionType["ColorPicker"] = 1] = "ColorPicker";
})(DropdownVersionType || (DropdownVersionType = {}));
const ALIGN_POINTS_COLOR_PALETTE_PICKER = [
    {
        align: "bl tl",
        offset: {
            x: 0,
            y: 2,
        },
    },
    {
        align: "tl bl",
        offset: {
            x: 0,
            y: 2,
        },
    },
];
const ALIGN_POINTS_CUSTOM_COLOR_PICKER = [
    {
        align: "cr cl",
        offset: {
            x: 5,
            y: 0,
        },
    },
    {
        align: "br bl",
        offset: {
            x: 5,
            y: 100,
        },
    },
    {
        align: "br bl",
        offset: {
            x: 5,
            y: 0,
        },
    },
];
export default class ColorOverlay extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.stopScrollingPropagation = () => {
            document.body.addEventListener("wheel", this.stopPropagation);
        };
        this.startScrollingPropagation = () => {
            document.body.removeEventListener("wheel", this.stopPropagation);
        };
        this.stopPropagation = (e) => {
            e.stopPropagation();
        };
        this.onClose = () => {
            this.props.onClose();
        };
    }
    componentWillUnmount() {
        this.startScrollingPropagation();
    }
    render() {
        return (React.createElement(Overlay, { alignTo: this.props.alignTo, onClose: this.onClose, alignPoints: this.getAlignPoints(), closeOnOutsideClick: true, closeOnParentScroll: true, closeOnMouseDrag: true },
            React.createElement("div", { onMouseOver: this.stopScrollingPropagation, onMouseOut: this.startScrollingPropagation, "aria-label": "Color overlay content" }, this.props.children)));
    }
    getAlignPoints() {
        if (this.props.dropdownVersion === DropdownVersionType.ColorPalette) {
            return ALIGN_POINTS_COLOR_PALETTE_PICKER;
        }
        return ALIGN_POINTS_CUSTOM_COLOR_PICKER;
    }
}
//# sourceMappingURL=ColorOverlay.js.map