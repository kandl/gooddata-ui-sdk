// (C) 2020-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import { FormattedPreview } from "../customFormatDialog/shared/FormattedPreview.js";
class PresetsDropdownItem extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleOnClick = (e) => {
            const { preset, onClick } = this.props;
            onClick(preset);
            e.preventDefault();
        };
    }
    render() {
        const { preset, separators, isSelected } = this.props;
        const { localIdentifier, name, previewNumber, format } = preset;
        const className = cx("gd-list-item", "gd-format-preset", `s-format-preset-${localIdentifier}`, `s-format-preset-name-${stringUtils.simplifyText(name)}`, {
            "is-selected": isSelected,
        });
        return (React.createElement("div", { className: className, onClick: this.handleOnClick },
            React.createElement("span", { title: name, className: "gd-format-preset-name gd-list-item-shortened" }, name),
            previewNumber !== null && format !== null && (React.createElement(FormattedPreview, { previewNumber: previewNumber, format: format, separators: separators, colors: false, className: "gd-format-preset-preview" }))));
    }
}
PresetsDropdownItem.defaultProps = {
    isSelected: false,
};
export { PresetsDropdownItem };
//# sourceMappingURL=PresetsDropdownItem.js.map