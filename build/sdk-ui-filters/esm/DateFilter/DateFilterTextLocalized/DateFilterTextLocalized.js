// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { resolveLocale } from "@gooddata/sdk-ui";
import { getDateFilterTitle } from "../utils/Translations/DateFilterTitle.js";
const DateFilterTextLocalizedComponent = ({ dateFormat, filter, intl, }) => React.createElement(React.Fragment, null, getDateFilterTitle(filter, resolveLocale(intl.locale), dateFormat));
export const DateFilterTextLocalized = injectIntl(DateFilterTextLocalizedComponent);
//# sourceMappingURL=DateFilterTextLocalized.js.map