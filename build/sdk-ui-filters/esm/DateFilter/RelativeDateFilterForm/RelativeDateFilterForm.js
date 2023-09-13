// (C) 2007-2022 GoodData Corporation
import React from "react";
import { GranularityTabs } from "./GranularityTabs.js";
import { RelativeRangePicker } from "../RelativeRangePicker/RelativeRangePicker.js";
/**
 * @internal
 */
export const RelativeDateFilterForm = ({ selectedFilterOption, availableGranularities, onSelectedFilterOptionChange, isMobile, }) => (React.createElement(React.Fragment, null,
    React.createElement(GranularityTabs, { availableGranularities: availableGranularities, selectedGranularity: selectedFilterOption.granularity, onSelectedGranularityChange: (granularity) => onSelectedFilterOptionChange(Object.assign(Object.assign(Object.assign({}, selectedFilterOption), (selectedFilterOption.granularity !== granularity && {
            from: undefined,
            to: undefined,
        })), { granularity })) }),
    React.createElement(RelativeRangePicker, { selectedFilterOption: selectedFilterOption, onSelectedFilterOptionChange: onSelectedFilterOptionChange, 
        // Do not reuse components across different tabs, caused problems with focus/blur handling.
        key: selectedFilterOption.granularity, isMobile: isMobile })));
//# sourceMappingURL=RelativeDateFilterForm.js.map