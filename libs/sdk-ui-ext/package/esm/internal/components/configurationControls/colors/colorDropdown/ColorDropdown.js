// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { isColorFromPalette, isRgbColor } from "@gooddata/sdk-model";
import { v4 as uuidv4 } from "uuid";
import { ColorPicker } from "@gooddata/sdk-ui-kit";
import ColorOverlay, { DropdownVersionType } from "./ColorOverlay";
import ColorPalette from "./ColorPalette";
import CustomColorButton from "./CustomColorButton";
export var IconPosition;
(function (IconPosition) {
    IconPosition[IconPosition["Down"] = 0] = "Down";
    IconPosition[IconPosition["Right"] = 1] = "Right";
})(IconPosition || (IconPosition = {}));
const COLOR_FOR_UNKNOWN_ITEM = {
    r: 255,
    g: 0,
    b: 0,
};
class ColorDropdown extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onColorPickerSubmit = (color) => {
            const item = {
                type: "rgb",
                value: color,
            };
            this.onColorSelected(item);
        };
        this.onColorPickerCancel = () => {
            this.setState({ dropdownVersion: DropdownVersionType.ColorPalette });
        };
        this.onCustomColorButtonClick = () => {
            this.setState({ dropdownVersion: DropdownVersionType.ColorPicker });
        };
        this.onClose = () => {
            this.setState({ isDropdownOpen: false, dropdownVersion: DropdownVersionType.ColorPalette });
        };
        this.onDropdownButtonClick = () => {
            this.toggleDropdown();
        };
        this.onColorSelected = (color) => {
            this.setState({
                isDropdownOpen: false,
                dropdownVersion: DropdownVersionType.ColorPalette,
            });
            setTimeout(() => {
                this.props.onColorSelected(color);
            }, 100);
        };
        this.id = uuidv4();
        this.state = {
            isDropdownOpen: false,
            dropdownVersion: DropdownVersionType.ColorPalette,
        };
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: this.getClassName(), onClick: this.onDropdownButtonClick }, this.setupDropdownChild()),
            this.state.isDropdownOpen ? (React.createElement(ColorOverlay, { alignTo: `.${this.getClassName()}`, onClose: this.onClose, dropdownVersion: this.state.dropdownVersion, key: this.state.dropdownVersion },
                React.createElement("div", { className: "overlay dropdown-body" }, this.isColorPaletteContent()
                    ? this.renderColorPaletteContent()
                    : this.renderColorPickerContent()))) : null));
    }
    setupDropdownChild() {
        const childProps = {
            isSelected: this.state.isDropdownOpen,
            position: this.getIconPosition(),
        };
        return React.cloneElement(this.props.children, childProps);
    }
    getIconPosition() {
        return this.state.dropdownVersion === DropdownVersionType.ColorPalette
            ? IconPosition.Down
            : IconPosition.Right;
    }
    isColorPaletteContent() {
        return this.state.dropdownVersion === DropdownVersionType.ColorPalette;
    }
    renderColorPaletteContent() {
        return (React.createElement("div", { className: "gd-color-drop-down" },
            React.createElement(ColorPalette, { selectedColorGuid: this.getSelectedGuidFromColorItem(), colorPalette: this.props.colorPalette, onColorSelected: this.onColorSelected }),
            this.props.showCustomPicker ? (React.createElement(CustomColorButton, { onClick: this.onCustomColorButtonClick })) : null));
    }
    getSelectedGuidFromColorItem() {
        if (isColorFromPalette(this.props.selectedColorItem)) {
            return this.props.selectedColorItem.value;
        }
        return null;
    }
    renderColorPickerContent() {
        return (React.createElement(ColorPicker, { initialRgbColor: this.getSelectedColorFromPalette(), onSubmit: this.onColorPickerSubmit, onCancel: this.onColorPickerCancel }));
    }
    getSelectedColorFromPalette() {
        if (isColorFromPalette(this.props.selectedColorItem)) {
            const selected = this.props.colorPalette.find((item) => {
                return item.guid === this.props.selectedColorItem.value;
            });
            if (selected) {
                return selected.fill;
            }
        }
        if (isRgbColor(this.props.selectedColorItem)) {
            return this.props.selectedColorItem.value;
        }
        return COLOR_FOR_UNKNOWN_ITEM;
    }
    getClassName() {
        return `s-color-drop-down-button-${this.id}`;
    }
    toggleDropdown() {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen,
            dropdownVersion: DropdownVersionType.ColorPalette,
        });
    }
}
export default injectIntl(ColorDropdown);
//# sourceMappingURL=ColorDropdown.js.map