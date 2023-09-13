import merge from "lodash/merge";
import { translationUtils } from "@gooddata/util";
import { messagesMap as sdkUiTranslations } from "@gooddata/sdk-ui";
import enUS from "../translations/en-US.json";
import deDE from "../translations/de-DE.json";
import esES from "../translations/es-ES.json";
import frFR from "../translations/fr-FR.json";
import jaJP from "../translations/ja-JP.json";
import nlNL from "../translations/nl-NL.json";
import ptBR from "../translations/pt-BR.json";
import ptPT from "../translations/pt-PT.json";
import zhHans from "../translations/zh-Hans.json";
import ruRU from "../translations/ru-RU.json";
export function getTranslation(translationId, intl, values = {}) {
    return intl ? intl.formatMessage({ id: translationId }, values) : translationId;
}
export function getTranslatedDropdownItems(dropdownItems, intl) {
    return dropdownItems.map((item) => {
        const translatedTitleProp = item.title ? { title: getTranslation(item.title, intl) } : {};
        const translatedInfoProp = item.info ? { info: getTranslation(item.info, intl) } : {};
        return Object.assign(Object.assign(Object.assign({}, item), translatedTitleProp), translatedInfoProp);
    });
}
const sdkUiExtTranslations = {
    "en-US": translationUtils.removeMetadata(enUS),
    "de-DE": deDE,
    "es-ES": esES,
    "fr-FR": frFR,
    "ja-JP": jaJP,
    "nl-NL": nlNL,
    "pt-BR": ptBR,
    "pt-PT": ptPT,
    "zh-Hans": zhHans,
    "ru-RU": ruRU,
};
/**
 * @internal
 */
export const translations = merge(sdkUiTranslations, // we use also some of the sdk-ui strings here so we need to merge them in here
sdkUiExtTranslations);
//# sourceMappingURL=translations.js.map