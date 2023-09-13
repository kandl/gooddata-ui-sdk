// (C) 2007-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { messages } from "../../locales.js";
import { emptyHeaderTitleFromIntl } from "./intlUtils.js";
const getNumericSymbols = (intl) => {
    return [messages.k, messages.m, messages.g, messages.t, messages.p, messages.e].map((desc) => intl.formatMessage(desc));
};
/**
 * @internal
 */
export class TranslationsProvider extends React.PureComponent {
    render() {
        const props = {
            numericSymbols: getNumericSymbols(this.props.intl),
            emptyHeaderString: emptyHeaderTitleFromIntl(this.props.intl),
            intl: this.props.intl,
        };
        return this.props.children(props);
    }
}
/**
 * @internal
 */
export const IntlTranslationsProvider = injectIntl(TranslationsProvider);
//# sourceMappingURL=TranslationsProvider.js.map