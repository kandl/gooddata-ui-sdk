// (C) 2020-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { bucketIsEmpty, insightBucket, insightHasMeasures } from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";
import { Bubble, BubbleHoverTrigger } from "@gooddata/sdk-ui-kit";
import { SHOW_DELAY_DEFAULT, HIDE_DELAY_DEFAULT, BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y, } from "../../constants/bubble.js";
import ConfigurationPanelContent from "./ConfigurationPanelContent.js";
import CheckboxControl from "../configurationControls/CheckboxControl.js";
import ConfigSection from "../configurationControls/ConfigSection.js";
import PushpinSizeControl from "../configurationControls/PushpinSizeControl.js";
import PushpinViewportControl from "../configurationControls/PushpinViewportControl.js";
import LegendSection from "../configurationControls/legend/LegendSection.js";
import ColorsSection from "../configurationControls/colors/ColorsSection.js";
import { messages } from "../../../locales.js";
export default class GeoPushpinConfigurationPanel extends ConfigurationPanelContent {
    getControlProperties() {
        var _a, _b, _c, _d;
        const groupNearbyPoints = (_d = (_c = (_b = (_a = this.props.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b.points) === null || _c === void 0 ? void 0 : _c.groupNearbyPoints) !== null && _d !== void 0 ? _d : true;
        return {
            groupNearbyPoints,
        };
    }
    renderLegendSection() {
        const { insight, properties, propertiesMeta, pushData } = this.props;
        const isLegendVisible = hasSegmentAttribute(insight) || hasColorMeasure(insight) || hasSizeMeasure(insight);
        const controlsDisabled = this.isControlDisabled() || !isLegendVisible;
        return (React.createElement(LegendSection, { properties: properties, propertiesMeta: propertiesMeta, controlsDisabled: controlsDisabled, pushData: pushData }));
    }
    renderViewportSection() {
        const { properties, propertiesMeta, pushData } = this.props;
        return (React.createElement(ConfigSection, { id: "map_section", title: messages.pointsMapTitle.id, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
            React.createElement(PushpinViewportControl, { properties: properties, disabled: this.isControlDisabled(), pushData: pushData })));
    }
    renderPointsSection() {
        const { groupNearbyPoints } = this.getControlProperties();
        const { properties, propertiesMeta, pushData, insight } = this.props;
        const isControlDisabled = this.isControlDisabled();
        const isClusteringDisabled = isControlDisabled || insightHasMeasures(insight) || hasSegmentAttribute(insight);
        const isPushpinSizeControlDisabled = isControlDisabled || !hasSizeMeasure(insight);
        return (React.createElement(ConfigSection, { id: "points_section", title: messages.pointsTitle.id, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData },
            React.createElement(CheckboxControl, { valuePath: "points.groupNearbyPoints", labelText: messages.pointsGroupNearbyPoints.id, properties: properties, checked: groupNearbyPoints, disabled: isClusteringDisabled, showDisabledMessage: isClusteringDisabled, pushData: pushData }),
            React.createElement(PushpinSizeControl, { properties: properties, disabled: isPushpinSizeControlDisabled, pushData: pushData })));
    }
    isControlDisabled() {
        const { insight, isError, isLoading } = this.props;
        return !hasLocationAttribute(insight) || isError || isLoading;
    }
    getBubbleClassNames() {
        return cx("bubble-primary", {
            invisible: !this.isControlDisabled(),
        });
    }
    renderConfigurationPanel() {
        return (React.createElement(BubbleHoverTrigger, { showDelay: SHOW_DELAY_DEFAULT, hideDelay: HIDE_DELAY_DEFAULT },
            React.createElement("div", null,
                this.renderColorSection(),
                this.renderLegendSection(),
                this.renderViewportSection(),
                this.renderPointsSection()),
            React.createElement(Bubble, { className: this.getBubbleClassNames(), arrowOffsets: { "tc bc": [BUBBLE_ARROW_OFFSET_X, BUBBLE_ARROW_OFFSET_Y] }, alignPoints: [{ align: "tc bc" }] },
                React.createElement(FormattedMessage, { id: "properties.config.not_applicable" }))));
    }
    renderColorSection() {
        const { properties, propertiesMeta, pushData, colors, featureFlags, references, isLoading } = this.props;
        const controlsDisabled = this.isControlDisabled();
        return (React.createElement(ColorsSection, { properties: properties, propertiesMeta: propertiesMeta, references: references, colors: colors, controlsDisabled: controlsDisabled, pushData: pushData, hasMeasures: true, showCustomPicker: featureFlags.enableCustomColorPicker, isLoading: isLoading }));
    }
}
function hasColorMeasure(insight) {
    const bucket = insightBucket(insight, BucketNames.COLOR);
    return bucket !== undefined && !bucketIsEmpty(bucket);
}
function hasSizeMeasure(insight) {
    const bucket = insightBucket(insight, BucketNames.SIZE);
    return bucket !== undefined && !bucketIsEmpty(bucket);
}
function hasLocationAttribute(insight) {
    const bucket = insightBucket(insight, BucketNames.LOCATION);
    return bucket !== undefined && !bucketIsEmpty(bucket);
}
function hasSegmentAttribute(insight) {
    const bucket = insightBucket(insight, BucketNames.SEGMENT);
    return bucket !== undefined && !bucketIsEmpty(bucket);
}
//# sourceMappingURL=GeoPushpinConfigurationPanel.js.map