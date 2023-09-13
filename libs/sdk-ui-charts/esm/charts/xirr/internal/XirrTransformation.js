// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import noop from "lodash/noop.js";
import { convertDrillableItemsToPredicates, fireDrillEvent, } from "@gooddata/sdk-ui";
import { getHeadlineData, applyDrillableItems, buildDrillEventData, } from "./utils/XirrTransformationUtils.js";
import LegacyHeadline from "../../headline/internal/headlines/LegacyHeadline.js";
/**
 * The React component that handles the transformation of the execution objects into the data accepted by the {@link LegacyHeadline}
 * React component that this components wraps. It also handles the propagation of the drillable items to the component
 * and drill events out of it.
 */
class XirrTransformation extends React.Component {
    constructor() {
        super(...arguments);
        this.getDisableDrillUnderlineFromConfig = () => this.props.config ? this.props.config.disableDrillUnderline : false;
        this.handleFiredDrillEvent = (item, target) => {
            const { onDrill, dataView } = this.props;
            const drillEventData = buildDrillEventData(item, dataView);
            fireDrillEvent(onDrill, drillEventData, target);
        };
    }
    render() {
        const { drillableItems, config, onAfterRender, dataView } = this.props;
        const drillablePredicates = convertDrillableItemsToPredicates(drillableItems);
        const data = getHeadlineData(dataView);
        const dataWithUpdatedDrilling = applyDrillableItems(data, drillablePredicates, dataView);
        const disableDrillUnderline = this.getDisableDrillUnderlineFromConfig();
        return (React.createElement(LegacyHeadline, { data: dataWithUpdatedDrilling, config: config, onDrill: this.handleFiredDrillEvent, onAfterRender: onAfterRender, disableDrillUnderline: disableDrillUnderline }));
    }
}
XirrTransformation.defaultProps = {
    config: {},
    drillableItems: [],
    onDrill: () => true,
    onAfterRender: noop,
};
export default injectIntl(XirrTransformation);
//# sourceMappingURL=XirrTransformation.js.map