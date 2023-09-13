import { ClientFormatterFacade } from "@gooddata/number-formatter";
import escape from "lodash/escape.js";
import unescape from "lodash/unescape.js";
const customEscape = (str) => str && escape(unescape(str));
/**
 * Creates value formatter that uses `@gooddata/number-formatter` to format raw measure values according
 * to the format string.
 *
 * @remarks
 * By default, the format will strip away all the coloring information and
 * just return the value as string.
 *
 * @param separators - number separators to use. if not specified then `numberjs` defaults will be used
 * @public
 */
export function createNumberJsFormatter(separators) {
    return (value, format) => {
        const valueToFormat = ClientFormatterFacade.convertValue(value);
        const { formattedValue } = ClientFormatterFacade.formatValue(valueToFormat, format, separators);
        return customEscape(formattedValue);
    };
}
/**
 * Default configuration for the data access methods. Uses default `@gooddata/number-formatter` formatter and no result formatting.
 *
 * @public
 */
export const DefaultDataAccessConfig = {
    valueFormatter: createNumberJsFormatter(),
};
//# sourceMappingURL=dataAccessConfig.js.map