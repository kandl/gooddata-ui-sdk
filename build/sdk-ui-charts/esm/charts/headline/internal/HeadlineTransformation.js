import React from "react";
import { injectIntl } from "react-intl";
import { convertDrillableItemsToPredicates, fireDrillEvent, } from "@gooddata/sdk-ui";
import Headline from "./Headline.js";
import { applyDrillableItems, buildDrillEventData, getHeadlineData, } from "./utils/HeadlineTransformationUtils.js";
import noop from "lodash/noop.js";
/**
 * The React component that handles the transformation of the execution objects into the data accepted by the {@link Headline}
 * React component that this components wraps. It also handles the propagation of the drillable items to the component
 * and drill events out of it.
 */
class HeadlineTransformation extends React.Component {
    constructor(props) {
        super(props);
        this.handleFiredDrillEvent = this.handleFiredDrillEvent.bind(this);
    }
    render() {
        const { intl, drillableItems, dataView, config, onAfterRender } = this.props;
        const data = getHeadlineData(dataView, intl);
        const drillablePredicates = convertDrillableItemsToPredicates(drillableItems);
        const dataWithUpdatedDrilling = applyDrillableItems(data, drillablePredicates, dataView);
        const disableDrillUnderline = this.getDisableDrillUnderlineFromConfig();
        return (React.createElement(Headline, { data: dataWithUpdatedDrilling, config: config, onDrill: this.handleFiredDrillEvent, onAfterRender: onAfterRender, disableDrillUnderline: disableDrillUnderline }));
    }
    getDisableDrillUnderlineFromConfig() {
        if (this.props.config) {
            return this.props.config.disableDrillUnderline;
        }
    }
    handleFiredDrillEvent(item, target) {
        const { onDrill, dataView } = this.props;
        const drillEventData = buildDrillEventData(item, dataView);
        fireDrillEvent(onDrill, drillEventData, target);
    }
}
HeadlineTransformation.defaultProps = {
    drillableItems: [],
    onDrill: () => true,
    onAfterRender: noop,
};
export default injectIntl(HeadlineTransformation);
//# sourceMappingURL=HeadlineTransformation.js.map