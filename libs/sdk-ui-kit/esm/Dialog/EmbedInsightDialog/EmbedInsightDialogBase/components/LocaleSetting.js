// (C) 2023 GoodData Corporation
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { LOCALES } from "@gooddata/sdk-ui";
import { DEFAULT_LOCALE } from "../types.js";
import { Dropdown, DropdownButton, DropdownList } from "../../../../Dropdown/index.js";
import { SingleSelectListItem } from "../../../../List/index.js";
import { dialogChangeMessageLabels } from "../../../../locales.js";
import { ToggleSwitch } from "./ToggleSwitch.js";
/**
 * @internal
 */
export const LocaleSetting = (props) => {
    const intl = useIntl();
    const { isChecked, selectedLocal, onChecked, onLocaleSelected } = props;
    return (React.createElement(React.Fragment, null,
        React.createElement(ToggleSwitch, { id: "locale", className: "bottom-space", label: intl.formatMessage({
                id: "embedInsightDialog.webComponents.options.locale",
            }), checked: isChecked, onChange: onChecked, questionMarkMessage: intl.formatMessage(dialogChangeMessageLabels.locale) }),
        isChecked ? (React.createElement(LocaleSelect, { selectedLocale: selectedLocal || DEFAULT_LOCALE, onSelectLocale: onLocaleSelected })) : null));
};
const localeItems = LOCALES.map((u) => ({ id: u, title: u }));
const LocaleSelect = (props) => {
    const { selectedLocale, onSelectLocale } = props;
    const renderDropdownBody = useCallback(({ closeDropdown }) => {
        return (React.createElement(DropdownList, { items: localeItems, width: 60, renderItem: ({ item }) => {
                return (React.createElement(SingleSelectListItem, { title: item.title, isSelected: item.id === selectedLocale, onClick: () => {
                        onSelectLocale(item.id);
                        closeDropdown();
                    } }));
            } }));
    }, [onSelectLocale, selectedLocale]);
    const renderDropdownButton = useCallback(({ openDropdown, isOpen }) => {
        return React.createElement(DropdownButton, { value: selectedLocale, isOpen: isOpen, onClick: openDropdown });
    }, [selectedLocale]);
    return (React.createElement("div", { className: "locale-setting-component bottom-space" },
        React.createElement(Dropdown, { renderBody: renderDropdownBody, renderButton: renderDropdownButton })));
};
//# sourceMappingURL=LocaleSetting.js.map