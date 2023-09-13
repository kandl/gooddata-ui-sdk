// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { Message } from "@gooddata/sdk-ui-kit";
import ConfigSubsection from "../configurationControls/ConfigSubsection";
import InputControl from "../configurationControls/InputControl";
import { minInputValidateAndPushData, maxInputValidateAndPushData } from "../../utils/controlsHelper";
import { messages } from "../../../locales";
const defaultMinMaxControlState = {
    minScale: {
        hasWarning: false,
        warningMessage: "",
        incorrectValue: "",
    },
    maxScale: {
        hasWarning: false,
        warningMessage: "",
        incorrectValue: "",
    },
};
class MinMaxControl extends React.Component {
    static getDerivedStateFromProps(props) {
        var _a;
        if ((_a = props.propertiesMeta) === null || _a === void 0 ? void 0 : _a.undoApplied) {
            return defaultMinMaxControlState;
        }
        return null;
    }
    constructor(props) {
        super(props);
        this.minInputValidateAndPushDataCallback = (data) => {
            minInputValidateAndPushData(data, this.state, this.props, this.setState.bind(this), defaultMinMaxControlState);
        };
        this.maxInputValidateAndPushDataCallback = (data) => {
            maxInputValidateAndPushData(data, this.state, this.props, this.setState.bind(this), defaultMinMaxControlState);
        };
        this.state = defaultMinMaxControlState;
    }
    render() {
        return this.renderMinMaxSection();
    }
    renderMinMaxSection() {
        var _a, _b, _c, _d, _e, _f;
        const { properties, basePath, isDisabled } = this.props;
        const basePathPropertiesControls = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a[basePath];
        const axisScaleMin = (_b = basePathPropertiesControls === null || basePathPropertiesControls === void 0 ? void 0 : basePathPropertiesControls.min) !== null && _b !== void 0 ? _b : "";
        const axisScaleMax = (_c = basePathPropertiesControls === null || basePathPropertiesControls === void 0 ? void 0 : basePathPropertiesControls.max) !== null && _c !== void 0 ? _c : "";
        const axisVisible = (_d = basePathPropertiesControls === null || basePathPropertiesControls === void 0 ? void 0 : basePathPropertiesControls.visible) !== null && _d !== void 0 ? _d : true;
        return (React.createElement(ConfigSubsection, { title: messages.axisScale.id },
            React.createElement(InputControl, { valuePath: `${basePath}.min`, labelText: messages.axisMin.id, placeholder: messages.autoPlaceholder.id, type: "number", hasWarning: this.minScaleHasWarning(), value: this.minScaleHasIncorrectValue() ? (_e = this.state.minScale) === null || _e === void 0 ? void 0 : _e.incorrectValue : axisScaleMin, disabled: isDisabled || !axisVisible, properties: properties, pushData: this.minInputValidateAndPushDataCallback }),
            this.renderMinErrorMessage(),
            React.createElement(InputControl, { valuePath: `${basePath}.max`, labelText: messages.axisMax.id, placeholder: messages.autoPlaceholder.id, type: "number", hasWarning: this.maxScaleHasWarning(), value: this.maxScaleHasIncorrectValue() ? (_f = this.state.maxScale) === null || _f === void 0 ? void 0 : _f.incorrectValue : axisScaleMax, disabled: isDisabled || !axisVisible, properties: properties, pushData: this.maxInputValidateAndPushDataCallback }),
            this.renderMaxErrorMessage()));
    }
    minScaleHasIncorrectValue() {
        var _a, _b;
        return ((_b = (_a = this.state.minScale) === null || _a === void 0 ? void 0 : _a.incorrectValue) !== null && _b !== void 0 ? _b : "") !== "";
    }
    maxScaleHasIncorrectValue() {
        var _a, _b;
        return ((_b = (_a = this.state.maxScale) === null || _a === void 0 ? void 0 : _a.incorrectValue) !== null && _b !== void 0 ? _b : "") !== "";
    }
    minScaleHasWarning() {
        var _a, _b;
        return (_b = (_a = this.state.minScale) === null || _a === void 0 ? void 0 : _a.hasWarning) !== null && _b !== void 0 ? _b : false;
    }
    maxScaleHasWarning() {
        var _a, _b;
        return (_b = (_a = this.state.maxScale) === null || _a === void 0 ? void 0 : _a.hasWarning) !== null && _b !== void 0 ? _b : false;
    }
    renderMinErrorMessage() {
        var _a, _b;
        const minScaleWarningMessage = (_b = (_a = this.state.minScale) === null || _a === void 0 ? void 0 : _a.warningMessage) !== null && _b !== void 0 ? _b : "";
        if (!this.minScaleHasWarning() || minScaleWarningMessage === "") {
            return false;
        }
        return (React.createElement(Message, { type: "warning", className: "adi-input-warning" }, minScaleWarningMessage));
    }
    renderMaxErrorMessage() {
        var _a, _b;
        const maxScaleWarningMessage = (_b = (_a = this.state.maxScale) === null || _a === void 0 ? void 0 : _a.warningMessage) !== null && _b !== void 0 ? _b : "";
        if (!this.maxScaleHasWarning() || maxScaleWarningMessage === "") {
            return false;
        }
        return (React.createElement(Message, { type: "warning", className: "adi-input-warning" }, maxScaleWarningMessage));
    }
}
export default injectIntl(MinMaxControl);
//# sourceMappingURL=MinMaxControl.js.map