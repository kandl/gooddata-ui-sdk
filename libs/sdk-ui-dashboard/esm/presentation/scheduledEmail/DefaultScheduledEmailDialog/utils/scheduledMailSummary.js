import { invariant } from "ts-invariant";
import { REPEAT_TYPES, REPEAT_FREQUENCIES, FREQUENCY_TYPE, REPEAT_EXECUTE_ON } from "../constants.js";
import { getDayName, getWeek, getDate } from "./datetime.js";
import { messages } from "../../../../locales.js";
const AM = "AM";
const PM = "PM";
function getRepeatFrequencyType(repeatFrequency) {
    // eslint-disable-next-line no-prototype-builtins
    const result = FREQUENCY_TYPE.find((type) => repeatFrequency.hasOwnProperty(type));
    invariant(result, "Unknown scheduled email frequency");
    return result;
}
function getScheduledEmailRepeatString(intl, options, startDate) {
    var _a;
    const { repeatType, repeatPeriod, repeatFrequency } = options;
    const isCustomRepeatType = repeatType === REPEAT_TYPES.CUSTOM;
    const day = getDayName(startDate);
    const week = getWeek(startDate);
    if (!isCustomRepeatType) {
        return intl.formatMessage(messages[`scheduleDialogEmailRepeats_${repeatType}`], { day, week });
    }
    const every = intl.formatMessage({
        id: "dialogs.schedule.email.repeats.every",
    });
    const repeatFrequencyType = getRepeatFrequencyType(repeatFrequency);
    const frequencies = intl.formatMessage(messages[`scheduleDialogEmailRepeatsFrequencies_${repeatFrequencyType}`], {
        n: repeatPeriod,
    });
    const appliedRepeatExecuteOn = repeatFrequencyType === REPEAT_FREQUENCIES.WEEK
        ? REPEAT_EXECUTE_ON.DAY_OF_WEEK
        : (_a = repeatFrequency.month) === null || _a === void 0 ? void 0 : _a.type;
    const executeOn = repeatFrequencyType !== REPEAT_FREQUENCIES.DAY
        ? intl.formatMessage(messages[`scheduleDialogEmailRepeatsExecuteOn_${appliedRepeatExecuteOn}`], {
            date: getDate(startDate),
            day: getDayName(startDate),
            week: getWeek(startDate),
        })
        : "";
    // every 2 months on the first Friday
    return `${every} ${repeatPeriod} ${frequencies} ${executeOn}`.trim();
}
function getFormattedTime(time) {
    const { hour, minute } = time;
    const timeSuffix = getTimePeriod(hour);
    const formattedMinute = getFormattedMinute(minute);
    const formattedHour = getFormattedHour(hour);
    // 12:00 AM
    return `${formattedHour}:${formattedMinute} ${timeSuffix}`;
}
function getTimePeriod(hour) {
    return hour >= 12 ? PM : AM;
}
function getFormattedMinute(minute) {
    return minute < 10 ? "0" + minute : "" + minute;
}
function getFormattedHour(hour) {
    let formattedHour = hour > 12 ? hour - 12 : hour;
    if (hour === 0) {
        formattedHour = 12;
    }
    return formattedHour;
}
export function getScheduledEmailSummaryString(intl, recurrency, startDate) {
    const repeatDays = getScheduledEmailRepeatString(intl, recurrency, startDate);
    const atLocalization = intl.formatMessage({ id: "gs.date.at" });
    const time = getFormattedTime(recurrency.time);
    // every 2 months on the first Friday at 12:00 AM
    return `${repeatDays} ${atLocalization} ${time}`;
}
//# sourceMappingURL=scheduledMailSummary.js.map