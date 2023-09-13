// (C) 2019-2023 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import ColoredItemContent from "./ColoredItemContent.js";
import ColorDropdown from "../colorDropdown/ColorDropdown.js";
import { getMappingHeaderFormattedName } from "@gooddata/sdk-ui";
import { getTranslation } from "../../../../utils/translations.js";
import { isWaterfallColorHeaderItemKey } from "../../../../utils/uiConfigHelpers/waterfallChartUiConfigHelper.js";
class ColoredItem extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onColorSelected = (color) => {
            const { item, onSelect } = this.props;
            if (onSelect) {
                onSelect(item, color);
            }
        };
    }
    render() {
        const { item, colorPalette, showCustomPicker } = this.props;
        const coloredItem = item ? item : null;
        if (!coloredItem) {
            return this.renderLoadingItem();
        }
        const headerItem = coloredItem.mappingHeader;
        const headerText = this.getText(headerItem);
        return (React.createElement(ColorDropdown, { selectedColorItem: coloredItem.colorItem, colorPalette: colorPalette, onColorSelected: this.onColorSelected, showCustomPicker: showCustomPicker },
            React.createElement(ColoredItemContent, { text: headerText, color: coloredItem.color })));
    }
    renderLoadingItem() {
        return React.createElement("div", { className: "gd-list-item gd-list-item-not-loaded" });
    }
    getText(mappingHeader) {
        const { intl } = this.props;
        const headerText = getMappingHeaderFormattedName(mappingHeader) || "";
        if (headerText === null || headerText === "") {
            return `(${getTranslation("empty_value", intl)})`;
        }
        return isWaterfallColorHeaderItemKey(headerText) ? getTranslation(headerText, intl) : headerText;
    }
}
ColoredItem.defaultProps = {
    showCustomPicker: false,
    disabled: false,
};
export default injectIntl(ColoredItem);
//# sourceMappingURL=ColoredItem.js.map