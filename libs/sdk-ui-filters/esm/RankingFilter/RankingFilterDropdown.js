// (C) 2020-2022 GoodData Corporation
import React, { useState } from "react";
import { IntlWrapper } from "@gooddata/sdk-ui";
import { Overlay } from "@gooddata/sdk-ui-kit";
import { RankingFilterDropdownBody } from "./RankingFilterDropdownBody.js";
import { injectIntl } from "react-intl";
import noop from "lodash/noop.js";
const alignPoints = ["bl tl", "tl bl", "br tr", "tr br"];
const DROPDOWN_ALIGNMENTS = alignPoints.map((align) => ({ align, offset: { x: 1, y: 0 } }));
export const prepareRankingFilterState = (filter) => {
    const { measure, attributes, operator, value } = filter.rankingFilter;
    const firstAttribute = attributes === null || attributes === void 0 ? void 0 : attributes[0];
    const attributesProp = firstAttribute ? { attributes: [firstAttribute] } : {};
    return {
        rankingFilter: Object.assign({ operator,
            value,
            measure }, attributesProp),
    };
};
const RankingFilterDropdownComponent = ({ measureItems, attributeItems, filter, onApply, onCancel, anchorEl, onDropDownItemMouseOver, onDropDownItemMouseOut, customGranularitySelection, enableRenamingMeasureToMetric, }) => {
    const [rankingFilter, setRankingFilter] = useState(prepareRankingFilterState(filter));
    const handleApply = (rankingFilter) => {
        setRankingFilter(rankingFilter);
        onApply(rankingFilter);
    };
    return (React.createElement(Overlay, { closeOnOutsideClick: true, closeOnParentScroll: true, closeOnMouseDrag: true, alignTo: anchorEl, alignPoints: DROPDOWN_ALIGNMENTS, onClose: onCancel, ignoreClicksOnByClass: [".gd-rf-inner-overlay-dropdown"] },
        React.createElement(RankingFilterDropdownBody, { measureItems: measureItems, attributeItems: attributeItems, filter: rankingFilter, onApply: handleApply, onCancel: onCancel, onDropDownItemMouseOver: onDropDownItemMouseOver, onDropDownItemMouseOut: onDropDownItemMouseOut, customGranularitySelection: customGranularitySelection, enableRenamingMeasureToMetric: enableRenamingMeasureToMetric })));
};
RankingFilterDropdownComponent.defaultProps = {
    onCancel: noop,
};
const RankingFilterDropdownWithIntl = injectIntl(RankingFilterDropdownComponent);
/**
 * @beta
 */
export const RankingFilterDropdown = (props) => (React.createElement(IntlWrapper, { locale: props.locale },
    React.createElement(RankingFilterDropdownWithIntl, Object.assign({}, props))));
//# sourceMappingURL=RankingFilterDropdown.js.map