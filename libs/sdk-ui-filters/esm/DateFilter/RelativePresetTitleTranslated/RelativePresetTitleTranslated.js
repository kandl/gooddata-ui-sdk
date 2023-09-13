// (C) 2007-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { messages } from "../../locales.js";
export const RelativePresetTitleTranslated = ({ granularity }) => {
    const intlDesc = messages[granularity] || null;
    if (!intlDesc) {
        return null;
    }
    return React.createElement(FormattedMessage, { id: intlDesc.id });
};
//# sourceMappingURL=RelativePresetTitleTranslated.js.map