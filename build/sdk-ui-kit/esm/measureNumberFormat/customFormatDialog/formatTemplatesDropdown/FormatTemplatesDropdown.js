// (C) 2020-2022 GoodData Corporation
import React from "react";
import DropdownItem from "./DropdownItem.js";
import DropdownToggleButton from "./DropdownToggleButton.js";
import { Overlay } from "../../../Overlay/index.js";
export class FormatTemplatesDropdown extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isOpened: false,
        };
        this.closeDropdown = () => {
            this.setState({ isOpened: false });
        };
        this.onSelect = (selectedPreset) => {
            this.props.onChange(selectedPreset.format);
            setTimeout(() => {
                this.closeDropdown();
            });
        };
        this.toggleDropdown = () => {
            this.setState((state) => ({ isOpened: !state.isOpened }));
        };
    }
    render() {
        const { isOpened } = this.state;
        const { templates, separators } = this.props;
        return (React.createElement("div", { className: "gd-measure-format-templates" },
            React.createElement(DropdownToggleButton, { toggleDropdown: this.toggleDropdown, isOpened: isOpened }),
            isOpened ? (React.createElement(Overlay, { closeOnOutsideClick: true, closeOnParentScroll: true, alignTo: ".gd-measure-custom-format-dialog-section-title", alignPoints: [{ align: "br tr" }, { align: "cr cl", offset: { x: 10 } }], onClose: this.closeDropdown },
                React.createElement("div", { className: "gd-dropdown overlay" },
                    React.createElement("div", { className: "gd-measure-number-format-dropdown-body s-measure-number-format-templates-dropdown" }, templates.map((template) => (React.createElement(DropdownItem, { key: template.localIdentifier, template: template, onClick: this.onSelect, separators: separators }))))))) : null));
    }
}
//# sourceMappingURL=FormatTemplatesDropdown.js.map