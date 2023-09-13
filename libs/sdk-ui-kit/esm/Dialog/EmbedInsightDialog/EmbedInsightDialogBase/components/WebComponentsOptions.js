// (C) 2023 GoodData Corporation
import React, { useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { dialogChangeMessageLabels } from "../../../../locales.js";
import { HeightSetting } from "./HeightSetting.js";
import { ToggleSwitch } from "./ToggleSwitch.js";
import { LocaleSetting } from "./LocaleSetting.js";
/**
 * @internal
 */
export const WebComponentsOptions = (props) => {
    const intl = useIntl();
    const { option, onChange } = props;
    const onDisplayTitleChange = useCallback(() => {
        const opt = Object.assign(Object.assign({}, option), { displayTitle: !option.displayTitle });
        onChange(opt);
    }, [option, onChange]);
    const onCustomTitleChange = useCallback(() => {
        const opt = Object.assign(Object.assign({}, option), { customTitle: !option.customTitle });
        onChange(opt);
    }, [option, onChange]);
    const onAllowLocaleChange = useCallback(() => {
        const opt = Object.assign(Object.assign({}, option), { allowLocale: !option.allowLocale });
        onChange(opt);
    }, [option, onChange]);
    const onLocaleValueChange = useCallback((locale) => {
        const opt = Object.assign(Object.assign({}, option), { locale });
        onChange(opt);
    }, [option, onChange]);
    const onCustomHeightChange = useCallback(() => {
        const opt = Object.assign(Object.assign({}, option), { customHeight: !option.customHeight });
        onChange(opt);
    }, [option, onChange]);
    const onCustomHeightValueChange = useCallback((height, unit) => {
        const opt = Object.assign(Object.assign({}, option), { height, unit });
        onChange(opt);
    }, [option, onChange]);
    return (React.createElement("div", { className: "embed-insight-dialog-lang-selector" },
        React.createElement("strong", { className: "bottom-space" },
            React.createElement(FormattedMessage, { id: "embedInsightDialog.webComponents.options" })),
        React.createElement(ToggleSwitch, { id: "display-title", className: "bottom-space", label: intl.formatMessage({
                id: "embedInsightDialog.webComponents.options.displayTitle",
            }), checked: option.displayTitle, onChange: onDisplayTitleChange }),
        React.createElement(ToggleSwitch, { id: "custom-title", className: "bottom-space", label: intl.formatMessage({
                id: "embedInsightDialog.webComponents.options.customTitle",
            }), checked: option.customTitle, disabled: !option.displayTitle, onChange: onCustomTitleChange, questionMarkMessage: intl.formatMessage(!option.displayTitle
                ? dialogChangeMessageLabels.disabledCustomTitle
                : dialogChangeMessageLabels.customTitle) }),
        React.createElement(LocaleSetting, { isChecked: option.allowLocale, selectedLocal: option.locale, onChecked: onAllowLocaleChange, onLocaleSelected: onLocaleValueChange }),
        React.createElement(ToggleSwitch, { id: "custom-height", label: intl.formatMessage({
                id: "embedInsightDialog.code.options.custom.height",
            }), checked: option.customHeight, onChange: onCustomHeightChange }),
        option.customHeight ? (React.createElement(HeightSetting, { value: option.height, unit: option.unit, onValueChange: onCustomHeightValueChange })) : null));
};
//# sourceMappingURL=WebComponentsOptions.js.map