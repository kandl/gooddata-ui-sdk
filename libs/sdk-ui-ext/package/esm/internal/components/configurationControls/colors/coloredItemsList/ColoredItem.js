// (C) 2019-2023 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import ColoredItemContent from "./ColoredItemContent";
import ColorDropdown from "../colorDropdown/ColorDropdown";
import { getMappingHeaderFormattedName } from "@gooddata/sdk-ui";
import { getTranslation } from "../../../../utils/translations";
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
        const { item, intl, colorPalette, showCustomPicker } = this.props;
        const coloredItem = item ? item : null;
        if (!coloredItem) {
            return this.renderLoadingItem();
        }
        const headerItem = coloredItem.mappingHeader;
        const headerText = this.getText(headerItem);
        const emptyText = `(${getTranslation("empty_value", intl)})`;
        const text = headerText === null || headerText === "" ? emptyText : headerText;
        return (React.createElement(ColorDropdown, { selectedColorItem: coloredItem.colorItem, colorPalette: colorPalette, onColorSelected: this.onColorSelected, showCustomPicker: showCustomPicker },
            React.createElement(ColoredItemContent, { text: text, color: coloredItem.color })));
    }
    renderLoadingItem() {
        return React.createElement("div", { className: "gd-list-item gd-list-item-not-loaded" });
    }
    getText(mappingHeader) {
        return getMappingHeaderFormattedName(mappingHeader) || "";
    }
}
ColoredItem.defaultProps = {
    showCustomPicker: false,
    disabled: false,
};
export default injectIntl(ColoredItem);
//# sourceMappingURL=ColoredItem.js.map