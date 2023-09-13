// (C) 2023 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { getTranslatedDropdownItems } from "../../utils/translations.js";
import { messages } from "../../../locales.js";
import { orientationDropdownItems } from "../../constants/dropdowns.js";
import DropdownControl from "./DropdownControl.js";
export function convertXYNamePosition(namePosition) {
    if (!(namePosition === null || namePosition === void 0 ? void 0 : namePosition.position)) {
        return undefined;
    }
    const xAxisPosition = ["left", "center", "right"];
    const yAxisPosition = ["top", "middle", "bottom"];
    let currentPosition = xAxisPosition.indexOf(namePosition.position);
    if (currentPosition >= 0) {
        return { position: yAxisPosition[currentPosition] };
    }
    currentPosition = yAxisPosition.indexOf(namePosition.position);
    return { position: xAxisPosition[currentPosition] };
}
export function getAxesByChartOrientation(properties) {
    const { xaxis, yaxis } = (properties === null || properties === void 0 ? void 0 : properties.controls) || {};
    if (!xaxis && !yaxis) {
        return { xaxis, yaxis };
    }
    const resetProperties = {
        rotation: undefined,
        min: undefined,
        max: undefined,
        format: undefined,
    };
    const newXAxisName = convertXYNamePosition(yaxis === null || yaxis === void 0 ? void 0 : yaxis.name);
    const newYAxisName = convertXYNamePosition(xaxis === null || xaxis === void 0 ? void 0 : xaxis.name);
    return {
        xaxis: Object.assign(Object.assign(Object.assign({}, resetProperties), yaxis), { name: newXAxisName }),
        yaxis: Object.assign(Object.assign(Object.assign({}, resetProperties), xaxis), { name: newYAxisName }),
    };
}
class OrientationDropdownControl extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleOrientationChanged = this.handleOrientationChanged.bind(this);
    }
    handleOrientationChanged(data) {
        var _a, _b, _c, _d, _e;
        const { properties } = data;
        const isChanged = ((_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.orientation) === null || _b === void 0 ? void 0 : _b.position) !==
            ((_e = (_d = (_c = this.props.properties) === null || _c === void 0 ? void 0 : _c.controls) === null || _d === void 0 ? void 0 : _d.orientation) === null || _e === void 0 ? void 0 : _e.position);
        if (isChanged) {
            const { xaxis, yaxis } = getAxesByChartOrientation(properties);
            const cloneProperties = Object.assign(Object.assign({}, properties), { controls: Object.assign(Object.assign(Object.assign({}, properties.controls), (xaxis ? { xaxis } : {})), (yaxis ? { yaxis } : {})) });
            this.props.pushData(Object.assign(Object.assign({}, data), { properties: cloneProperties }));
        }
        else {
            this.props.pushData(data);
        }
    }
    render() {
        return (React.createElement(DropdownControl, { value: this.props.value, valuePath: "orientation.position", labelText: messages.orientationTitle.id, disabled: this.props.disabled, properties: this.props.properties, pushData: this.handleOrientationChanged, items: this.generateDropdownItems(), showDisabledMessage: this.props.showDisabledMessage }));
    }
    generateDropdownItems() {
        return getTranslatedDropdownItems(orientationDropdownItems, this.props.intl);
    }
}
export default injectIntl(OrientationDropdownControl);
//# sourceMappingURL=OrientationDropdownControl.js.map