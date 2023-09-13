// (C) 2019-2023 GoodData Corporation
import React from "react";
import ConfigSection from "../ConfigSection.js";
import LegendPositionControl from "./LegendPositionControl.js";
import { messages } from "../../../../locales.js";
import noop from "lodash/noop.js";
class LegendSection extends React.PureComponent {
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const { controlsDisabled, properties, pushData, defaultLegendEnabled } = this.props;
        const legendEnabled = (_d = (_c = (_b = (_a = this.props.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b.legend) === null || _c === void 0 ? void 0 : _c.enabled) !== null && _d !== void 0 ? _d : defaultLegendEnabled;
        const legendPosition = (_h = (_g = (_f = (_e = this.props.properties) === null || _e === void 0 ? void 0 : _e.controls) === null || _f === void 0 ? void 0 : _f.legend) === null || _g === void 0 ? void 0 : _g.position) !== null && _h !== void 0 ? _h : "auto";
        const legendToggleDisabledByVisualization = !((_k = (_j = this.props.propertiesMeta) === null || _j === void 0 ? void 0 : _j.legend_enabled) !== null && _k !== void 0 ? _k : true);
        const toggleDisabled = controlsDisabled || legendToggleDisabledByVisualization;
        const legendPositionControlDisabled = !legendEnabled || toggleDisabled;
        const showDisabledMessage = controlsDisabled || legendToggleDisabledByVisualization;
        return (React.createElement(ConfigSection, { id: "legend_section", valuePath: "legend.enabled", title: messages.title.id, propertiesMeta: this.props.propertiesMeta, properties: properties, canBeToggled: true, toggleDisabled: toggleDisabled, toggledOn: legendEnabled, pushData: pushData, showDisabledMessage: showDisabledMessage },
            React.createElement(LegendPositionControl, { disabled: legendPositionControlDisabled, value: legendPosition, showDisabledMessage: showDisabledMessage, properties: properties, pushData: pushData })));
    }
}
LegendSection.defaultProps = {
    controlsDisabled: false,
    properties: {},
    propertiesMeta: {},
    defaultLegendEnabled: true,
    pushData: noop,
};
export default LegendSection;
//# sourceMappingURL=LegendSection.js.map