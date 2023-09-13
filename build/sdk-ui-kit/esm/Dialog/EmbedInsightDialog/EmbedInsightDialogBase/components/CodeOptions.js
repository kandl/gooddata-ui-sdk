// (C) 2022-2023 GoodData Corporation
import React, { useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { HeightSetting } from "./HeightSetting.js";
import { ToggleSwitch } from "./ToggleSwitch.js";
/**
 * @internal
 */
export const CodeOptions = (props) => {
    const intl = useIntl();
    const { option, onChange } = props;
    const onDisplayConfigurationChange = useCallback(() => {
        const opt = Object.assign(Object.assign({}, option), { displayConfiguration: !option.displayConfiguration });
        onChange(opt);
    }, [option, onChange]);
    const onCustomHeightChange = useCallback(() => {
        const opt = Object.assign(Object.assign({}, option), { customHeight: !option.customHeight });
        onChange(opt);
    }, [option, onChange]);
    const onHeightValueChange = useCallback((height, unit) => {
        const opt = Object.assign(Object.assign({}, option), { height, unit });
        onChange(opt);
    }, [option, onChange]);
    return (React.createElement("div", { className: "embed-insight-dialog-lang-selector" },
        React.createElement("strong", { className: "bottom-space" },
            React.createElement(FormattedMessage, { id: "embedInsightDialog.react.options" })),
        React.createElement(ToggleSwitch, { id: "display-configuration", className: "bottom-space", label: intl.formatMessage({
                id: "embedInsightDialog.code.options.display.configuration",
            }), questionMarkMessage: intl.formatMessage({
                id: "embedInsightDialog.code.options.include.config.info",
            }), checked: option.displayConfiguration, onChange: onDisplayConfigurationChange }),
        React.createElement(ToggleSwitch, { id: "custom-height", label: intl.formatMessage({
                id: "embedInsightDialog.code.options.custom.height",
            }), checked: option.customHeight, onChange: onCustomHeightChange }),
        option.customHeight ? (React.createElement(HeightSetting, { value: option.height, unit: option.unit, onValueChange: onHeightValueChange })) : null));
};
//# sourceMappingURL=CodeOptions.js.map