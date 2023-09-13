// (C) 2007-2022 GoodData Corporation
import { isAllTimeDateFilterOption, } from "@gooddata/sdk-model";
import { applyExcludeCurrentPeriod } from "./PeriodExclusion.js";
import { isAbsoluteDateFilterOption, isRelativeDateFilterOption, } from "../interfaces/index.js";
export const mapAbsoluteFilterToAfm = (value, dataSet) => ({
    absoluteDateFilter: {
        dataSet,
        from: value.from,
        to: value.to,
    },
});
export const mapRelativeFilterToAfm = (value, dataSet) => ({
    relativeDateFilter: {
        dataSet,
        from: value.from,
        to: value.to,
        granularity: value.granularity,
    },
});
export const mapOptionToAfm = (value, dateDataSet, excludeCurrentPeriod) => {
    const excludeApplied = applyExcludeCurrentPeriod(value, excludeCurrentPeriod);
    if (isAllTimeDateFilterOption(excludeApplied)) {
        return null;
    }
    if (isAbsoluteDateFilterOption(excludeApplied)) {
        return mapAbsoluteFilterToAfm(excludeApplied, dateDataSet);
    }
    if (isRelativeDateFilterOption(excludeApplied)) {
        return mapRelativeFilterToAfm(excludeApplied, dateDataSet);
    }
    throw new Error("Unknown date filter value provided");
};
//# sourceMappingURL=AFMConversions.js.map