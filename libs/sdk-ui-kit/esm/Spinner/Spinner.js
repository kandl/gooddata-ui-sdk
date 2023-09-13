// (C) 2007-2020 GoodData Corporation
import React, { PureComponent } from "react";
import cx from "classnames";
/**
 * @internal
 */
class Spinner extends PureComponent {
    generateSpinnerTicks() {
        const items = [];
        for (let i = 1; i <= 8; i += 1) {
            const className = `gd-dot-spinner-${i}`;
            items.push(React.createElement("div", { className: className, key: className }));
        }
        return items;
    }
    render() {
        const { className } = this.props;
        const spinnerClasses = cx({
            "gd-dot-spinner": true,
            [className]: !!className,
        });
        return React.createElement("div", { className: spinnerClasses }, this.generateSpinnerTicks());
    }
}
Spinner.defaultProps = {
    className: "",
};
export { Spinner };
//# sourceMappingURL=Spinner.js.map