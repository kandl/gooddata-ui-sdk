// (C) 2023 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { getTranslation } from "../../utils/translations.js";
import { messages } from "../../../locales.js";
class ContinuousLineControl extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChanged = this.onValueChanged.bind(this);
    }
    render() {
        const { checked, disabled, intl, valuePath } = this.props;
        return (React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
            React.createElement("label", { className: "input-checkbox-label" },
                React.createElement("input", { "aria-label": valuePath, checked: checked, disabled: disabled, type: "checkbox", className: "input-checkbox s-continuous-line", onChange: this.onValueChanged }),
                React.createElement("span", { className: "input-label-text" }, getTranslation(messages.canvasContinuousLineLabel.id, intl))),
            !disabled && (React.createElement(Bubble, { className: "bubble-primary continuous-line-tooltip", alignPoints: [{ align: "cr cl" }], arrowOffsets: { "cr cl": [-75, 0] } }, getTranslation(messages.canvasContinuousLineTooltip.id, intl)))));
    }
    onValueChanged(event) {
        const { valuePath, properties, pushData } = this.props;
        const clonedProperties = cloneDeep(properties);
        set(clonedProperties, `controls.${valuePath}`, event.target.checked);
        pushData({ properties: clonedProperties });
    }
}
ContinuousLineControl.defaultProps = {
    valuePath: "continuousLine.enabled",
    checked: false,
    disabled: false,
};
export default injectIntl(ContinuousLineControl);
//# sourceMappingURL=ContinuousLineControl.js.map