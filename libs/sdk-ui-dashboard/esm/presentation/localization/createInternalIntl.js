// (C) 2021 GoodData Corporation
import { createIntl } from "react-intl";
import { DefaultLocale, pickCorrectWording } from "@gooddata/sdk-ui";
import { translations } from "./translations.js";
/**
 * Test intl utils
 * @internal
 */
export function createInternalIntl(locale = DefaultLocale) {
    /**
     * Because of issues described in the ticket FET-855, we decided to use this workaround.
     * After the issues that are described in the ticket are solved or at least reduced,
     * this workaround can be removed.
     */
    const settings = window.gdSettings;
    return createIntl({ locale, messages: pickCorrectWording(translations[locale], settings) });
}
//# sourceMappingURL=createInternalIntl.js.map