// (C) 2023 GoodData Corporation
import React, { useMemo } from "react";
import isEmpty from "lodash/isEmpty.js";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import { AttributeListItemTooltip } from "./attributeListItemTooltip/AttributeListItemTooltip.js";
import { ShortenedText } from "@gooddata/sdk-ui-kit";
const TOOLTIP_ALIGN_POINT = [
    { align: "cr cl", offset: { x: 10, y: 0 } },
    { align: "cl cr", offset: { x: -10, y: 0 } },
];
const AttributeListItem = ({ item, isLocationIconEnabled, onClick }) => {
    const classNames = useMemo(() => {
        const isDisplayLocationIcon = isLocationIconEnabled && !isEmpty(item === null || item === void 0 ? void 0 : item.geoPinDisplayForms);
        return cx(`s-${stringUtils.simplifyText(item.attribute.title)}`, "gd-attribute-list-item", {
            "gd-list-item": true,
            "gd-list-item-shortened": true,
            "type-attribute": !isDisplayLocationIcon,
            "type-geo_attribute": isDisplayLocationIcon,
        });
    }, [item, isLocationIconEnabled]);
    return (React.createElement("div", { key: item.attribute.id, className: classNames, onClick: onClick },
        React.createElement(ShortenedText, { tooltipAlignPoints: TOOLTIP_ALIGN_POINT }, item.attribute.title),
        React.createElement(AttributeListItemTooltip, { item: item })));
};
export default AttributeListItem;
//# sourceMappingURL=AttributeListItem.js.map