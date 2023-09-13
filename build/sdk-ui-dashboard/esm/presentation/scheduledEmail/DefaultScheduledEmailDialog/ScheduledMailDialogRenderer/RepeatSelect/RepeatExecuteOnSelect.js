// (C) 2019-2023 GoodData Corporation
import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { Dropdown, DropdownList, DropdownButton, SingleSelectListItem } from "@gooddata/sdk-ui-kit";
import { invariant } from "ts-invariant";
import { DEFAULT_DROPDOWN_ALIGN_POINTS, DEFAULT_DROPDOWN_ZINDEX, REPEAT_EXECUTE_ON, } from "../../constants.js";
import { getDate, getIntlDayName, getWeek } from "../../utils/datetime.js";
import { messages } from "../../../../../locales.js";
const DROPDOWN_WIDTH = 154;
const getLocalizationKey = (id) => {
    switch (id) {
        case REPEAT_EXECUTE_ON.DAY_OF_MONTH:
            return messages.scheduleDialogEmailRepeatsExecuteOn_dayOfMonth;
        case REPEAT_EXECUTE_ON.DAY_OF_WEEK:
            return messages.scheduleDialogEmailRepeatsExecuteOn_dayOfWeek;
        default:
            throw new Error("Invariant: Unexpected localization key.");
    }
};
export const RepeatExecuteOnSelect = (props) => {
    const { onChange, repeatExecuteOn, startDate } = props;
    const intl = useIntl();
    const repeatExecuteOnItems = useMemo(() => {
        return [REPEAT_EXECUTE_ON.DAY_OF_MONTH, REPEAT_EXECUTE_ON.DAY_OF_WEEK].map((id) => {
            const localizationKey = getLocalizationKey(id);
            return {
                id,
                title: intl.formatMessage(localizationKey, {
                    date: getDate(startDate),
                    day: getIntlDayName(intl, startDate),
                    week: getWeek(startDate),
                }),
            };
        });
    }, [intl, startDate]);
    const repeatExecuteOnItem = repeatExecuteOnItems.find((item) => item.id === repeatExecuteOn);
    invariant(repeatExecuteOnItem, "Inconsistent state in RepeatExecuteOnSelect");
    return (React.createElement(Dropdown, { alignPoints: DEFAULT_DROPDOWN_ALIGN_POINTS, className: "gd-schedule-email-dialog-repeat-execute-on s-gd-schedule-email-dialog-repeat-execute-on", renderBody: ({ closeDropdown, isMobile }) => (React.createElement(DropdownList, { width: DROPDOWN_WIDTH, items: repeatExecuteOnItems, isMobile: isMobile, renderItem: ({ item }) => (React.createElement(SingleSelectListItem, { title: item.title, onClick: () => {
                    onChange(item.id);
                    closeDropdown();
                }, isSelected: repeatExecuteOnItem.id === item.id })) })), renderButton: ({ toggleDropdown }) => (React.createElement(DropdownButton, { value: repeatExecuteOnItem.title, onClick: toggleDropdown })), overlayPositionType: "sameAsTarget", overlayZIndex: DEFAULT_DROPDOWN_ZINDEX }));
};
//# sourceMappingURL=RepeatExecuteOnSelect.js.map