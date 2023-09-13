// (C) 2022 GoodData Corporation
import * as React from "react";
import { useCallback, useState } from "react";
import { Dropdown, DropdownButton, DropdownList, SingleSelectListItem, Icon } from "@gooddata/sdk-ui-kit";
import { FormattedMessage, useIntl } from "react-intl";
import { ScheduleDropdown } from "./ScheduleDropdown.js";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { DEFAULT_DROPDOWN_ALIGN_POINTS, DEFAULT_DROPDOWN_ZINDEX } from "../../constants.js";
const ICON_SIZE_BUTTON = 18;
const DROPDOWN_WIDTH = 70;
export const FormatOptionsDropdown = (props) => {
    var _a, _b;
    const { onApply } = props;
    const intl = useIntl();
    const theme = useTheme();
    const FORMAT_VALUES = ["csv", "xlsx"];
    const [format, setFormat] = useState(props.format);
    const [mergeHeaders, setMergeHeaders] = useState(props.mergeHeaders);
    const [includeFilters, setIncludeFilters] = useState(props.includeFilters);
    const canApply = format !== props.format ||
        mergeHeaders !== props.mergeHeaders ||
        includeFilters !== props.includeFilters;
    const handleOnApply = useCallback(() => onApply({
        format,
        mergeHeaders,
        includeFilters,
    }), [format, mergeHeaders, includeFilters, onApply]);
    const handleOnCancel = useCallback(() => {
        setFormat(props.format);
        setMergeHeaders(props.mergeHeaders);
        setIncludeFilters(props.includeFilters);
    }, [props.format, props.mergeHeaders, props.includeFilters]);
    const renderBodyContentSelector = () => {
        return (React.createElement("div", { className: "gd-format-options-dropdown-selector" },
            React.createElement("span", { className: "input-label-text" },
                React.createElement(FormattedMessage, { id: "dialogs.schedule.email.insight.format" })),
            React.createElement("div", null,
                React.createElement(Dropdown, { overlayPositionType: "sameAsTarget", className: "s-format-options-dropdown", alignPoints: DEFAULT_DROPDOWN_ALIGN_POINTS, overlayZIndex: DEFAULT_DROPDOWN_ZINDEX, renderButton: ({ isOpen, toggleDropdown }) => (React.createElement(DropdownButton, { className: "s-format-options-format-dropdown-button", value: format.toUpperCase(), isOpen: isOpen, onClick: toggleDropdown })), renderBody: ({ closeDropdown }) => (React.createElement(DropdownList, { width: DROPDOWN_WIDTH, items: FORMAT_VALUES, renderItem: ({ item }) => {
                            return (React.createElement(SingleSelectListItem, { className: "s-format-options-dropdown-content schedule-dropdown-ignore-click", title: item.toUpperCase(), onClick: () => {
                                    setFormat(item);
                                    closeDropdown();
                                } }));
                        } })) }))));
    };
    const renderBodyContentSelectorOptions = () => {
        return (React.createElement("div", { className: "gd-format-options-dropdown-xlsx" },
            React.createElement("div", null,
                React.createElement("label", { className: "input-checkbox-label" },
                    React.createElement("input", { type: "checkbox", className: "input-checkbox s-attachments-merge-headers", checked: mergeHeaders, onChange: (event) => setMergeHeaders(event.target.checked) }),
                    React.createElement("span", { className: "input-label-text" },
                        React.createElement(FormattedMessage, { id: "dialogs.schedule.email.attribute.merged" })))),
            React.createElement("div", null,
                React.createElement("label", { className: "input-checkbox-label s-attachments-include-filters" },
                    React.createElement("input", { type: "checkbox", className: "input-checkbox", checked: includeFilters, onChange: (event) => setIncludeFilters(event.target.checked) }),
                    React.createElement("span", { className: "input-label-text" },
                        React.createElement(FormattedMessage, { id: "dialogs.schedule.email.show.filters" }))))));
    };
    return (React.createElement(ScheduleDropdown, { title: intl.formatMessage({ id: "dialogs.schedule.email.format.options" }), applyDisabled: !canApply, onApply: handleOnApply, onCancel: handleOnCancel, buttonClassName: "s-schedule-format-options-button", bodyClassName: "s-schedule-format-options-body", iconComponent: React.createElement(Icon.SettingsGear, { color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c6, width: ICON_SIZE_BUTTON, height: ICON_SIZE_BUTTON }), contentComponent: React.createElement("div", { className: "gd-format-options-dropdown" },
            renderBodyContentSelector(),
            format === "xlsx" && renderBodyContentSelectorOptions()) }));
};
//# sourceMappingURL=FormatOptionsDropdown.js.map