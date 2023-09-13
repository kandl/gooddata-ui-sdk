// (C) 2023 GoodData Corporation
import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { comparisonMessages } from "../../../../../locales.js";
import { calculationDropdownItems } from "../../../../constants/dropdowns.js";
import DropdownControl from "../../DropdownControl.js";
import CalculationListItem from "./CalculationListItem.js";
import { COMPARISON_CALCULATION_TYPE_VALUE_PATH } from "../ComparisonValuePath.js";
const CALCULATION_DROPDOWN_WIDTH = 194;
const DISABLED_MESSAGE_ALIGN_POINTS = [{ align: "cr cl", offset: { x: 0, y: 7 } }];
const CalculationControl = ({ disabled, defaultCalculationType, properties, showDisabledMessage, pushData, }) => {
    var _a, _b;
    const { formatMessage } = useIntl();
    const calculationType = ((_b = (_a = properties.controls) === null || _a === void 0 ? void 0 : _a.comparison) === null || _b === void 0 ? void 0 : _b.calculationType) || defaultCalculationType;
    const items = useMemo(() => calculationDropdownItems.map((item) => (Object.assign(Object.assign({}, item), { title: formatMessage({ id: item.title }) }))), [formatMessage]);
    return (React.createElement("div", { className: "calculation-control s-calculation-control" },
        React.createElement(DropdownControl, { value: calculationType, valuePath: COMPARISON_CALCULATION_TYPE_VALUE_PATH, labelText: comparisonMessages.calculationTypeTitle.id, disabled: disabled, showDisabledMessage: showDisabledMessage, disabledMessageAlignPoints: DISABLED_MESSAGE_ALIGN_POINTS, width: CALCULATION_DROPDOWN_WIDTH, items: items, customListItem: CalculationListItem, properties: properties, pushData: pushData })));
};
export default CalculationControl;
//# sourceMappingURL=CalculationControl.js.map