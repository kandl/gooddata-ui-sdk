// (C) 2019-2022 GoodData Corporation
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Icon } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { getKpiAlertTranslationData } from "../utils/translationUtils.js";
export const KpiAlertDialogDateRange = ({ filter, dateFormat }) => {
    var _a, _b;
    const intl = useIntl();
    const theme = useTheme();
    const translationData = getKpiAlertTranslationData(filter, intl, dateFormat);
    if (!translationData) {
        return null;
    }
    const { intlIdRoot, rangeText } = translationData;
    return (React.createElement(FormattedMessage, { id: intlIdRoot, values: {
            calendarIcon: (React.createElement(Icon.Date, { className: "gd-icon-calendar-kpi", color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c6 })),
            range: React.createElement("strong", null, rangeText),
        } }));
};
//# sourceMappingURL=KpiAlertDialogDateRange.js.map