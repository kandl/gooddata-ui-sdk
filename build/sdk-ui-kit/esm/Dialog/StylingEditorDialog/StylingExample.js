// (C) 2022-2023 GoodData Corporation
import { ColorPreview } from "./ColorPreview.js";
import React from "react";
import { useIntl } from "react-intl";
/**
 * @internal
 */
export const StylingExample = (props) => {
    const { name, colors, onClick } = props;
    const intl = useIntl();
    return (React.createElement("div", { className: "gd-styling-example" },
        React.createElement("div", { className: "gd-styling-example-label" },
            React.createElement("div", { className: "gd-styling-example-label-name" }, name),
            React.createElement("div", { "aria-label": "Styling example action", className: "gd-styling-example-label-action s-gd-styling-example-label-action", onClick: onClick }, intl.formatMessage({ id: "stylingEditor.dialog.example.paste" }))),
        React.createElement(ColorPreview, { className: "color-preview-small", colors: colors })));
};
//# sourceMappingURL=StylingExample.js.map