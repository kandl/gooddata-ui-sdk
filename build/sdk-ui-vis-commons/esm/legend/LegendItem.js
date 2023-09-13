// (C) 2007-2023 GoodData Corporation
import React from "react";
import unescape from "lodash/unescape.js";
import { withTheme } from "@gooddata/sdk-ui-theme-provider";
const DEFAULT_DISABLED_COLOR = "#CCCCCC";
class LegendItem extends React.Component {
    render() {
        const { item, width, enableBorderRadius = false, theme } = this.props;
        const disabledColor = theme?.palette?.complementary?.c5 ?? DEFAULT_DISABLED_COLOR;
        const iconStyle = {
            borderRadius: enableBorderRadius ? "50%" : "0",
            backgroundColor: item.isVisible ? item.color : disabledColor,
        };
        // normal state styled by css
        const nameStyle = item.isVisible
            ? {}
            : {
                color: disabledColor,
            };
        const style = width ? { width: `${width}px` } : {};
        const onItemClick = () => {
            return this.props.onItemClick(item);
        };
        return (React.createElement("div", { style: style, className: "series-item", onClick: onItemClick, "aria-label": "Legend item" },
            React.createElement("div", { className: "series-icon", style: iconStyle }),
            React.createElement("div", { className: "series-name", style: nameStyle, title: unescape(item.name) }, item.name)));
    }
}
export default withTheme(LegendItem);
//# sourceMappingURL=LegendItem.js.map