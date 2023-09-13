import { IntlShape } from "react-intl";
/**
 * @beta
 */
export interface IMessageTranslator {
    formatMessage: IntlShape["formatMessage"];
}
/**
 * @beta
 */
export interface IDateTranslator {
    formatDate: IntlShape["formatDate"];
}
/**
 * @beta
 */
export interface IDateAndMessageTranslator extends IDateTranslator, IMessageTranslator {
}
