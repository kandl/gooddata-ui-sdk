// (C) 2019-2022 GoodData Corporation
import * as React from "react";
import { useIntl } from "react-intl";
import { Icon } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { isMobileView } from "../../utils/responsive.js";
export const AttachmentNoWidgets = (props) => {
    var _a, _b;
    const { className = "", fileName, label } = props;
    const intl = useIntl();
    const theme = useTheme();
    const classNames = `gd-input-component gd-attachment-component ${className}`;
    const nameOfAttachment = isMobileView() ? "PDF" : fileName;
    const textFilters = intl.formatMessage({ id: "dialogs.schedule.email.attachment.filter" });
    return (React.createElement("div", { className: classNames },
        React.createElement("label", { className: "gd-label" }, label),
        React.createElement("span", { className: "gd-icon-pdf" },
            React.createElement(Icon.Pdf, { width: 11, height: 14, color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c8 })),
        React.createElement("span", { className: "s-attachment-name" }, `${nameOfAttachment} ${textFilters}`)));
};
//# sourceMappingURL=AttachmentNoWidgets.js.map