// (C) 2023 GoodData Corporation
import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { ComparisonPositionValues } from "@gooddata/sdk-ui-charts";
import DropdownControl from "../../DropdownControl.js";
import { comparisonMessages } from "../../../../../locales.js";
import { COMPARISON_POSITION_VALUE_PATH } from "../ComparisonValuePath.js";
import { comparisonPositionDropdownItems } from "../../../../constants/dropdowns.js";
import { getTranslatedDropdownItems } from "../../../../utils/translations.js";
const ComparisonPositionControl = ({ disabled, showDisabledMessage, properties, pushData, }) => {
    var _a, _b;
    const intl = useIntl();
    const position = ((_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.comparison) === null || _b === void 0 ? void 0 : _b.position) || ComparisonPositionValues.AUTO;
    const items = useMemo(() => getTranslatedDropdownItems(comparisonPositionDropdownItems, intl), [intl]);
    return (React.createElement("div", { className: "comparion-postion-control s-comparison-position-control" },
        React.createElement(DropdownControl, { value: position, valuePath: COMPARISON_POSITION_VALUE_PATH, labelText: comparisonMessages.positionTitle.id, disabled: disabled, showDisabledMessage: showDisabledMessage, items: items, properties: properties, pushData: pushData })));
};
export default ComparisonPositionControl;
//# sourceMappingURL=ComparisonPositionControl.js.map