// (C) 2019-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import includes from "lodash/includes.js";
import isEmpty from "lodash/isEmpty.js";
import { BucketNames } from "@gooddata/sdk-ui";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import cx from "classnames";
import MinMaxControl from "../configurationControls/MinMaxControl.js";
import ConfigurationPanelContent from "./ConfigurationPanelContent.js";
import ConfigSection from "../configurationControls/ConfigSection.js";
import CheckboxControl from "../configurationControls/CheckboxControl.js";
import DataLabelsControl from "../configurationControls/DataLabelsControl.js";
import { SHOW_DELAY_DEFAULT, HIDE_DELAY_DEFAULT, BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y, } from "../../constants/bubble.js";
import LabelSubsection from "../configurationControls/axis/LabelSubsection.js";
import { AXIS, BASE_CHART_AXIS_CONFIG, DUAL_AXES_SUPPORTED_CHARTS } from "../../constants/axis.js";
import { bucketsById, bucketsIsEmpty, insightBuckets } from "@gooddata/sdk-model";
import { countItemsOnAxes } from "../pluggableVisualizations/baseChart/insightIntrospection.js";
import NameSubsection from "../configurationControls/axis/NameSubsection.js";
import { messages } from "../../../locales.js";
export default class BaseChartConfigurationPanel extends ConfigurationPanelContent {
    renderCanvasSection() {
        var _a, _b;
        const { gridEnabled } = this.getControlProperties();
        const { properties, propertiesMeta, pushData, featureFlags, insight } = this.props;
        const controlsDisabled = this.isControlDisabled();
        const { buckets } = insight.insight;
        const stackBy = bucketsById(buckets, BucketNames.STACK);
        const isNotStacked = isEmpty(stackBy);
        return (React.createElement(ConfigSection, { id: "canvas_section", title: messages.canvasTitle.id, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
            React.createElement(DataLabelsControl, { pushData: pushData, properties: properties, isDisabled: controlsDisabled, isTotalsDisabled: controlsDisabled ||
                    !!((_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.stackMeasuresToPercent) ||
                    (isNotStacked && !((_b = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _b === void 0 ? void 0 : _b.stackMeasures)), enableSeparateTotalLabels: !!featureFlags.enableSeparateTotalLabels }),
            React.createElement(CheckboxControl, { valuePath: "grid.enabled", labelText: messages.canvasGridLine.id, properties: properties, checked: gridEnabled, disabled: controlsDisabled, pushData: pushData })));
    }
    renderConfigurationPanel() {
        const { axes } = this.getControlProperties();
        return (React.createElement(BubbleHoverTrigger, { showDelay: SHOW_DELAY_DEFAULT, hideDelay: HIDE_DELAY_DEFAULT },
            React.createElement("div", null,
                this.renderColorSection(),
                this.getBaseChartAxisSection(axes),
                this.renderLegendSection(),
                this.renderCanvasSection()),
            React.createElement(Bubble, { className: this.getBubbleClassNames(), arrowOffsets: { "tc bc": [BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y] }, alignPoints: [{ align: "tc bc" }] },
                React.createElement(FormattedMessage, { id: "properties.config.not_applicable" }))));
    }
    getAxesConfiguration(type) {
        return BASE_CHART_AXIS_CONFIG[type];
    }
    getControlProperties() {
        var _a, _b, _c, _d, _e;
        const props = this.props;
        const gridEnabled = (_d = (_c = (_b = (_a = props.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b.grid) === null || _c === void 0 ? void 0 : _c.enabled) !== null && _d !== void 0 ? _d : true;
        const axisType = includes(DUAL_AXES_SUPPORTED_CHARTS, props.type)
            ? (_e = props.axis) !== null && _e !== void 0 ? _e : AXIS.PRIMARY
            : AXIS.PRIMARY;
        const configurations = this.getAxesConfiguration(axisType);
        const axes = configurations.map((axis) => {
            var _a, _b, _c, _d;
            return Object.assign(Object.assign({}, axis), { visible: (_d = (_c = (_b = (_a = props.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b[axis.name]) === null || _c === void 0 ? void 0 : _c.visible) !== null && _d !== void 0 ? _d : true });
        });
        return {
            gridEnabled,
            axes,
        };
    }
    getBubbleClassNames() {
        return cx("bubble-primary", {
            invisible: !this.isControlDisabled(),
        });
    }
    isViewedBy() {
        const { insight } = this.props;
        return !bucketsIsEmpty(insightBuckets(insight, BucketNames.VIEW, BucketNames.TREND));
    }
    getBaseChartAxisSection(axes) {
        const { featureFlags, type, properties, propertiesMeta, pushData, insight } = this.props;
        const controls = properties === null || properties === void 0 ? void 0 : properties.controls;
        const controlsDisabled = this.isControlDisabled();
        const isViewedBy = this.isViewedBy();
        const itemsOnAxes = countItemsOnAxes(type, controls, insight);
        const isNameSubsectionVisible = featureFlags.enableAxisNameConfiguration;
        const isAxisLabelsFormatEnabled = featureFlags.enableAxisLabelFormat;
        const isAxisNameViewByTwoAttributesEnabled = featureFlags.enableAxisNameViewByTwoAttributes;
        return axes.map((axis) => {
            const disabled = controlsDisabled || (!axis.primary && !isViewedBy);
            const nameSubsectionDisabled = (axis.primary || !isAxisNameViewByTwoAttributesEnabled) && itemsOnAxes[axis.name] > 1;
            const { name, title, subtitle, visible } = axis;
            const showFormat = axis.primary && isAxisLabelsFormatEnabled;
            return (React.createElement(ConfigSection, { key: name, id: `${name}_section`, title: title, subtitle: subtitle, valuePath: `${name}.visible`, canBeToggled: true, toggledOn: visible, toggleDisabled: controlsDisabled, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
                isNameSubsectionVisible ? (React.createElement(NameSubsection, { disabled: disabled || nameSubsectionDisabled, configPanelDisabled: controlsDisabled, axis: axis.name, properties: properties, pushData: pushData })) : null,
                React.createElement(LabelSubsection, { disabled: disabled, configPanelDisabled: controlsDisabled, axis: axis.name, properties: properties, pushData: pushData, showFormat: showFormat }),
                axis.primary ? this.renderMinMax(axis.name) : null));
        });
    }
    renderMinMax(basePath) {
        const { pushData, properties, propertiesMeta } = this.props;
        return (React.createElement(MinMaxControl, { isDisabled: this.isControlDisabled(), basePath: basePath, pushData: pushData, properties: properties, propertiesMeta: propertiesMeta }));
    }
}
//# sourceMappingURL=BaseChartConfigurationPanel.js.map