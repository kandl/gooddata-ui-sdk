// (C) 2007-2022 GoodData Corporation
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Typography, Checkbox } from "@gooddata/sdk-ui-kit";
export function InsightTitleConfig(props) {
    const { hideTitle, widget, setVisualPropsConfigurationTitle, isHidingOfWidgetTitleEnabled } = props;
    const intl = useIntl();
    const [widgetTitleState, setWidgetTitleState] = useState(hideTitle);
    const handleHideTitleChange = (isChecked) => {
        setWidgetTitleState(isChecked);
        setVisualPropsConfigurationTitle(widget, isChecked);
    };
    return (React.createElement(React.Fragment, null, isHidingOfWidgetTitleEnabled ? (React.createElement("div", { className: "configuration-category s-hide-title-configuration" },
        React.createElement(Typography, { tagName: "h3", className: "s-viz-title-headline" },
            React.createElement(FormattedMessage, { id: "configurationPanel.visualprops.sectionTitle" })),
        React.createElement(Checkbox, { onChange: handleHideTitleChange, value: widgetTitleState, text: intl.formatMessage({ id: "configurationPanel.visualprops.hideTitle" }), labelSize: "small" }))) : null));
}
//# sourceMappingURL=InsightTitleConfig.js.map