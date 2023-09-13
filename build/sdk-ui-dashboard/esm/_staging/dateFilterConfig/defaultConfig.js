// (C) 2021-2023 GoodData Corporation
import { idRef, } from "@gooddata/sdk-model";
import { DateFilterHelpers } from "@gooddata/sdk-ui-filters";
/**
 * Default implementation of the date filter config. This should be used in case the workspace
 * does not have
 */
export const defaultDateFilterConfig = {
    ref: idRef("defaultDateFilterProjectConfig"),
    selectedOption: "THIS_MONTH",
    allTime: DateFilterHelpers.defaultDateFilterOptions.allTime,
    absoluteForm: DateFilterHelpers.defaultDateFilterOptions.absoluteForm,
    relativeForm: {
        type: "relativeForm",
        // month has to be the first as it should be the default selected option
        availableGranularities: ["GDC.time.month", "GDC.time.date", "GDC.time.quarter", "GDC.time.year"],
        localIdentifier: DateFilterHelpers.defaultDateFilterOptions.relativeForm.localIdentifier,
        name: DateFilterHelpers.defaultDateFilterOptions.relativeForm.name,
        visible: true,
    },
    relativePresets: Object.keys(DateFilterHelpers.defaultDateFilterOptions.relativePreset).reduce((presets, granularityKey) => {
        const granularityPresets = DateFilterHelpers.defaultDateFilterOptions.relativePreset[granularityKey];
        presets.push(...granularityPresets);
        return presets;
    }, []),
    absolutePresets: [],
};
//# sourceMappingURL=defaultConfig.js.map