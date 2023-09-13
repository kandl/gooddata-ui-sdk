// (C) 2020-2022 GoodData Corporation
import React from "react";
import { PresetsDropdownItem } from "./PresetsDropdownItem.js";
import { SnapPoint } from "../../typings/positioning.js";
import { positioningToAlignPoints } from "../../utils/positioning.js";
import { Overlay } from "../../Overlay/index.js";
class PresetsDropdown extends React.PureComponent {
    render() {
        const { presets, anchorEl, onClose, positioning } = this.props;
        return (React.createElement(Overlay, { closeOnOutsideClick: true, closeOnParentScroll: true, closeOnMouseDrag: true, alignTo: anchorEl, alignPoints: positioningToAlignPoints(positioning), onClose: onClose },
            React.createElement("div", { className: "gd-dropdown overlay" },
                React.createElement("div", { className: "gd-measure-number-format-dropdown-body s-measure-number-format-dropdown-body" },
                    presets.map((preset, index) => this.renderPresetOption(preset, index)),
                    this.renderCustomFormatItem()))));
    }
    renderPresetOption(preset, index) {
        const { selectedPreset, separators, onSelect } = this.props;
        const isPresetItemSelected = selectedPreset && preset.localIdentifier === selectedPreset.localIdentifier;
        return (React.createElement(PresetsDropdownItem, { key: `${preset.localIdentifier}_${index}`, preset: preset, separators: separators, onClick: onSelect, isSelected: isPresetItemSelected }));
    }
    renderCustomFormatItem() {
        const { customPreset, presets } = this.props;
        return this.renderPresetOption(customPreset, presets.length);
    }
}
PresetsDropdown.defaultProps = {
    positioning: [
        { snapPoints: { parent: SnapPoint.BottomLeft, child: SnapPoint.TopLeft } },
        { snapPoints: { parent: SnapPoint.TopLeft, child: SnapPoint.BottomLeft } },
    ],
};
export { PresetsDropdown };
//# sourceMappingURL=PresetsDropdown.js.map