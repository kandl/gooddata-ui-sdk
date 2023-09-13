// (C) 2019-2022 GoodData Corporation
import React from "react";
import set from "lodash/set.js";
import cloneDeep from "lodash/cloneDeep.js";
import { injectIntl } from "react-intl";
import { Button } from "@gooddata/sdk-ui-kit";
import cx from "classnames";
import ConfigSection from "../../configurationControls/ConfigSection.js";
import ColoredItemsList from "./coloredItemsList/ColoredItemsList.js";
import { getTranslation } from "../../../utils/translations.js";
import { getColoredInputItems, getProperties } from "../../../utils/colors.js";
import { messages } from "../../../../locales.js";
export const COLOR_MAPPING_CHANGED = "COLOR_MAPPING_CHANGED";
class ColorsSection extends React.Component {
    constructor() {
        super(...arguments);
        this.onSelect = (selectedColorItem, color) => {
            const { properties, pushData } = this.props;
            const { mappingHeader } = selectedColorItem;
            const result = getProperties(properties, mappingHeader, color);
            const message = {
                messageId: COLOR_MAPPING_CHANGED,
                properties: result,
            };
            pushData(message);
        };
        this.onResetColors = () => {
            const { properties, pushData } = this.props;
            if (this.isDefaultColorMapping()) {
                return;
            }
            const propertiesWithoutColorMapping = set(cloneDeep(properties), "controls.colorMapping", undefined);
            const message = {
                messageId: COLOR_MAPPING_CHANGED,
                properties: propertiesWithoutColorMapping,
                references: {},
            };
            pushData(message);
        };
    }
    render() {
        const { pushData, propertiesMeta } = this.props;
        return (React.createElement(ConfigSection, { title: messages.colors.id, pushData: pushData, propertiesMeta: propertiesMeta, id: "colors_section", className: "adi-color-configuration" }, this.renderSectionContents()));
    }
    isColoredListVisible() {
        const { colors, hasMeasures, controlsDisabled, isLoading } = this.props;
        return isLoading || (!controlsDisabled && colors && colors.colorPalette && hasMeasures);
    }
    renderResetButton() {
        const { controlsDisabled } = this.props;
        const isDisabled = controlsDisabled || this.isDefaultColorMapping();
        const classes = cx("gd-color-reset-colors-section", {
            disabled: isDisabled,
        });
        return (React.createElement("div", { className: classes },
            React.createElement(Button, { value: getTranslation(messages.resetColors.id, this.props.intl), className: "gd-button-link s-reset-colors-button", onClick: this.onResetColors, disabled: isDisabled })));
    }
    renderColoredList() {
        const { colors, showCustomPicker, controlsDisabled, isLoading } = this.props;
        const inputItems = getColoredInputItems(colors);
        const colorPalette = (colors === null || colors === void 0 ? void 0 : colors.colorPalette) ? colors.colorPalette : [];
        return (React.createElement("div", null,
            React.createElement(ColoredItemsList, { colorPalette: colorPalette, inputItems: inputItems, onSelect: this.onSelect, showCustomPicker: showCustomPicker, disabled: controlsDisabled, isLoading: isLoading }),
            this.renderResetButton()));
    }
    isDefaultColorMapping() {
        var _a, _b;
        const { properties } = this.props;
        const colorMapping = (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.colorMapping) !== null && _b !== void 0 ? _b : [];
        return !colorMapping || colorMapping.length === 0;
    }
    renderUnsupportedColoredList() {
        return (React.createElement("div", { className: "gd-color-unsupported" }, getTranslation(messages.unsupportedColors.id, this.props.intl)));
    }
    renderSectionContents() {
        return this.isColoredListVisible() ? this.renderColoredList() : this.renderUnsupportedColoredList();
    }
}
export default injectIntl(ColorsSection);
//# sourceMappingURL=ColorsSection.js.map