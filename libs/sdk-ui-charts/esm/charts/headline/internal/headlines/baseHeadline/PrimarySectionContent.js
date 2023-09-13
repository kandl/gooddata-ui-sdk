// (C) 2023 GoodData Corporation
import React, { useMemo } from "react";
import cx from "classnames";
import { getDrillableClasses } from "../../utils/HeadlineDataItemUtils.js";
const PrimarySectionContent = ({ primaryItem, customStyle }) => {
    const BaseHeadlineDataItem = primaryItem.baseHeadlineDataItemComponent;
    const classNames = useMemo(() => {
        var _a;
        return cx([
            "gd-flex-item",
            "headline-primary-item",
            "s-headline-primary-item",
            ...getDrillableClasses((_a = primaryItem === null || primaryItem === void 0 ? void 0 : primaryItem.data) === null || _a === void 0 ? void 0 : _a.isDrillable),
        ]);
    }, [primaryItem]);
    return (React.createElement("div", { className: classNames, style: customStyle },
        React.createElement(BaseHeadlineDataItem, { dataItem: primaryItem.data, evaluationType: primaryItem.evaluationType, elementType: primaryItem.elementType, shouldHideTitle: true })));
};
export default PrimarySectionContent;
//# sourceMappingURL=PrimarySectionContent.js.map