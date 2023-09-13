// (C) 2023 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import { getComparisonRgbColor } from "@gooddata/sdk-ui-charts";
import ColoredItemContent from "../../../colors/coloredItemsList/ColoredItemContent.js";
import ColorDropdown from "../../../colors/colorDropdown/ColorDropdown.js";
import DisabledBubbleMessage from "../../../../DisabledBubbleMessage.js";
const ColorItem = ({ disabled, showDisabledMessage, color, colorType, colorPalette, labelDescriptor, valuePath, properties, pushData, }) => {
    const { formatMessage } = useIntl();
    const label = formatMessage(labelDescriptor);
    const rgbColor = getComparisonRgbColor(color, colorType, colorPalette);
    const handleColorSelected = (color) => {
        const clonedProperties = cloneDeep(properties);
        set(clonedProperties.controls, valuePath, color);
        pushData({ properties: clonedProperties });
    };
    return (React.createElement(DisabledBubbleMessage, { showDisabledMessage: showDisabledMessage },
        React.createElement(ColorDropdown, { colorPalette: colorPalette, onColorSelected: handleColorSelected, selectedColorItem: color, showCustomPicker: true, disabled: disabled },
            React.createElement(ColoredItemContent, { text: label, color: rgbColor }))));
};
export default ColorItem;
//# sourceMappingURL=ColorItem.js.map