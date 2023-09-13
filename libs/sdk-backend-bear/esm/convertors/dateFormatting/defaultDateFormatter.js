// (C) 2020 GoodData Corporation
import format from "date-fns/format/index.js";
import { UnexpectedError } from "@gooddata/sdk-backend-spi";
import { dateFormats, DEFAULT_DATE_FORMAT } from "./dateValueParser.js";
/**
 * Creates a default date formatting function.
 * @public
 */
export const createDefaultDateFormatter = (dateFormat = DEFAULT_DATE_FORMAT) => {
    return (value, targetDateFormat = dateFormat) => {
        if (!dateFormats.includes(targetDateFormat)) {
            throw new UnexpectedError(`Unsupported date format "${targetDateFormat}". Supported date formats are ${dateFormats}`);
        }
        return format(value, targetDateFormat);
    };
};
//# sourceMappingURL=defaultDateFormatter.js.map