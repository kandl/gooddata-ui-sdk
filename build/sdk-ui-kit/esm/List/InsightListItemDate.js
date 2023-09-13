// (C) 2007-2023 GoodData Corporation
import React from "react";
import toDate from "date-fns-tz/toDate";
import subDays from "date-fns/subDays/index.js";
import isSameDay from "date-fns/isSameDay/index.js";
import isSameYear from "date-fns/isSameYear/index.js";
import { FormattedMessage, FormattedTime, FormattedDate } from "react-intl";
/**
 * @internal
 */
export const InsightListItemDate = ({ config }) => {
    const relativeDate = config.isToday ? "gs.date.today" : "gs.date.yesterday";
    if (config.isToday || config.isYesterday) {
        return (React.createElement("span", null,
            React.createElement(FormattedMessage, { id: relativeDate }),
            "\u00A0",
            React.createElement(FormattedMessage, { id: "gs.date.at" }),
            "\u00A0",
            React.createElement(FormattedTime, { value: config.date, format: "hhmm" })));
    }
    else if (config.isCurrentYear) {
        return React.createElement(FormattedDate, { value: config.date, format: "shortWithoutYear" });
    }
    return React.createElement(FormattedDate, { value: config.date, format: "shortWithYear" });
};
export const META_DATA_TIMEZONE = "Europe/Prague";
/**
 * Build date time config for InsightListItemDate component.
 *
 * @param date - string ISO date
 * @param options - optional options object
 * @returns date time config
 *
 * @internal
 */
export function getDateTimeConfig(date, options = {}) {
    const { dateTimezone = META_DATA_TIMEZONE, now = new Date() } = options;
    const dateInLocalTimezone = toDate(date, { timeZone: dateTimezone });
    const yesterday = subDays(now, 1);
    const isToday = isSameDay(dateInLocalTimezone, now);
    const isYesterday = isSameDay(dateInLocalTimezone, yesterday);
    const isCurrentYear = isSameYear(dateInLocalTimezone, now);
    return {
        date: dateInLocalTimezone,
        isToday,
        isYesterday,
        isCurrentYear,
    };
}
//# sourceMappingURL=InsightListItemDate.js.map