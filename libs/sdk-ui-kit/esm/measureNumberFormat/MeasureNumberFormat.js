// (C) 2020-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { IntlWrapper } from "@gooddata/sdk-ui";
import { PresetType } from "./typings.js";
import { PresetsDropdown } from "./presetsDropdown/PresetsDropdown.js";
import { CustomFormatDialog } from "./customFormatDialog/CustomFormatDialog.js";
export const CUSTOM_FORMAT_PRESET_LOCAL_IDENTIFIER = "customFormat";
class WrappedMeasureNumberFormat extends React.PureComponent {
    constructor(props) {
        super(props);
        this.findSelectedPreset = () => this.props.presets.find((preset) => preset.format === this.props.selectedFormat) ||
            this.getCustomFormatPreset();
        this.toggleDropdownOpened = (e) => {
            this.toggleButtonEl = e.currentTarget;
            this.setState((state) => (Object.assign(Object.assign({}, state), { showDropdown: !state.showDropdown })));
            this.toggleCustomFormatDialog();
        };
        this.closeDropdown = () => {
            this.setState({ showDropdown: false });
        };
        this.toggleCustomFormatDialog = (open = false) => {
            this.setState({
                showCustomFormatDialog: open,
            });
        };
        this.onCustomFormatDialogApply = (format) => {
            this.toggleCustomFormatDialog(false);
            this.setState({
                selectedPreset: this.getCustomFormatPreset(),
            });
            this.props.setFormat(format);
        };
        this.onCustomFormatDialogCancel = () => {
            this.toggleCustomFormatDialog(false);
        };
        this.onSelect = (selectedPreset) => {
            const { setFormat } = this.props;
            this.closeDropdown();
            if (this.isCustomPreset(selectedPreset)) {
                this.toggleCustomFormatDialog(true);
            }
            else {
                this.setState((state) => (Object.assign(Object.assign({}, state), { selectedPreset })));
                setFormat(selectedPreset.format);
            }
        };
        this.isCustomPreset = ({ localIdentifier, type }) => localIdentifier === CUSTOM_FORMAT_PRESET_LOCAL_IDENTIFIER && type === PresetType.CUSTOM_FORMAT;
        this.getCustomFormatPreset = () => ({
            name: this.props.intl.formatMessage({ id: "measureNumberFormat.custom.optionLabel" }),
            localIdentifier: CUSTOM_FORMAT_PRESET_LOCAL_IDENTIFIER,
            format: null,
            previewNumber: null,
            type: PresetType.CUSTOM_FORMAT,
        });
        this.state = {
            selectedPreset: this.findSelectedPreset(),
            showDropdown: false,
            showCustomFormatDialog: false,
        };
    }
    render() {
        const { toggleButton: ToggleButton, disabled, anchorElementSelector, presets, separators, selectedFormat, defaultCustomFormat, presetsDropdownPositioning, customFormatDialogPositioning, documentationLink, templates, intl, } = this.props;
        const { showDropdown, showCustomFormatDialog, selectedPreset } = this.state;
        const buttonText = intl.formatMessage({ id: "measureNumberFormat.buttonLabel" }, { selectedFormatPresetName: selectedPreset.name });
        const anchorEl = anchorElementSelector || this.toggleButtonEl;
        const customPreset = this.getCustomFormatPreset();
        return (React.createElement(React.Fragment, null,
            React.createElement(ToggleButton, { text: buttonText, isOpened: showDropdown || showCustomFormatDialog, toggleDropdown: this.toggleDropdownOpened, selectedPreset: selectedPreset, disabled: disabled }),
            showDropdown ? (React.createElement(PresetsDropdown, { presets: presets, customPreset: customPreset, separators: separators, selectedPreset: selectedPreset, onSelect: this.onSelect, onClose: this.closeDropdown, anchorEl: anchorEl, positioning: presetsDropdownPositioning, intl: intl })) : null,
            showCustomFormatDialog ? (React.createElement(CustomFormatDialog, { onApply: this.onCustomFormatDialogApply, onCancel: this.onCustomFormatDialogCancel, formatString: selectedFormat || defaultCustomFormat, separators: separators, anchorEl: anchorEl, positioning: customFormatDialogPositioning, documentationLink: documentationLink, templates: templates, intl: intl })) : null));
    }
}
const MeasureNumberFormatWithIntl = injectIntl(WrappedMeasureNumberFormat);
/**
 * @internal
 */
export class MeasureNumberFormat extends React.PureComponent {
    render() {
        return (React.createElement(IntlWrapper, { locale: this.props.locale },
            React.createElement(MeasureNumberFormatWithIntl, Object.assign({}, this.props))));
    }
}
//# sourceMappingURL=MeasureNumberFormat.js.map