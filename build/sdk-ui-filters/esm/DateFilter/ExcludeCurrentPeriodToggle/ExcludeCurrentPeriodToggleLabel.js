// (C) 2007-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { granularityIntlCodes } from "../constants/i18n.js";
import { messages } from "../../locales.js";
export const ExcludeCurrentPeriodToggleLabel = (props) => {
    const id = !props.disabled && props.granularity
        ? messages[`${granularityIntlCodes[props.granularity]}Excluded`].id
        : messages.allTimeExcluded.id;
    return (React.createElement(FormattedMessage, { id: id }, (...children) => React.createElement("span", { className: "input-label-text" }, children)));
};
//# sourceMappingURL=ExcludeCurrentPeriodToggleLabel.js.map