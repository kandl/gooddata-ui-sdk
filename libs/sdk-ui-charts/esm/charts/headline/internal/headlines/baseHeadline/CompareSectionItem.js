// (C) 2023 GoodData Corporation
import React, { useMemo } from "react";
import cx from "classnames";
import { getDrillableClasses } from "../../utils/HeadlineDataItemUtils.js";
const CompareSectionItem = ({ dataItem, titleRef }) => {
    const BaseHeadlineDataItem = dataItem.baseHeadlineDataItemComponent;
    const classNames = useMemo(() => {
        var _a;
        return cx([
            "gd-flex-item",
            "headline-compare-section-item",
            "headline-compare-item",
            "s-headline-compare-item",
            ...getDrillableClasses((_a = dataItem === null || dataItem === void 0 ? void 0 : dataItem.data) === null || _a === void 0 ? void 0 : _a.isDrillable),
        ]);
    }, [dataItem]);
    return (React.createElement("div", { className: classNames },
        React.createElement(BaseHeadlineDataItem, { dataItem: dataItem.data, evaluationType: dataItem.evaluationType, elementType: dataItem.elementType, titleRef: titleRef })));
};
export default CompareSectionItem;
//# sourceMappingURL=CompareSectionItem.js.map