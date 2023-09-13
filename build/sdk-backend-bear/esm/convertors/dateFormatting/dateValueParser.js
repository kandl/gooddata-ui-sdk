// (C) 2020-2022 GoodData Corporation
import parse from "date-fns/parse/index.js";
import { UnexpectedError } from "@gooddata/sdk-backend-spi";
export const dateFormats = [
    "MM/dd/yyyy",
    "dd/MM/yyyy",
    "dd-MM-yyyy",
    "yyyy-MM-dd",
    "M/d/yy",
    "dd.MM.yyyy",
];
export const DEFAULT_DATE_FORMAT = "MM/dd/yyyy";
/**
 * Parses a string representation of a date of a given date format to a Date object.
 * @param value - value to parse.
 * @param dateFormat - dateFormat to assume when parsing the value.
 * @internal
 */
export const parseDateValue = (value, dateFormat = DEFAULT_DATE_FORMAT) => {
    if (!dateFormats.includes(dateFormat)) {
        throw new UnexpectedError(`Unsupported date format "${dateFormat}". Supported date formats are ${dateFormats}`);
    }
    if (value === null) {
        throw new UnexpectedError("Unsupported date value null. Nulls are not supported as date values");
    }
    return parse(value, dateFormat, new Date());
};
//# sourceMappingURL=dateValueParser.js.map