// (C) 2020-2022 GoodData Corporation
import { useMemo } from "react";
import isArray from "lodash/isArray.js";
import mergeWith from "lodash/mergeWith.js";
import { insightProperties, insightSetProperties } from "@gooddata/sdk-model";
import { selectSettings, useDashboardSelector } from "../../../../model/index.js";
/**
 * @internal
 */
export const useResolveDashboardInsightProperties = (props) => {
    const { widget, insight } = props;
    const settings = useDashboardSelector(selectSettings);
    return useMemo(() => {
        var _a;
        if (!insight) {
            return insight;
        }
        const fromWidget = widget.properties;
        if (!fromWidget) {
            return insight;
        }
        const fromWidgetWithZoomingHandled = Object.assign(Object.assign({}, fromWidget), { controls: Object.assign(Object.assign({}, fromWidget === null || fromWidget === void 0 ? void 0 : fromWidget.controls), { 
                // we need to take the relevant feature flag into account as well
                zoomInsight: !!(settings.enableKDZooming && ((_a = fromWidget === null || fromWidget === void 0 ? void 0 : fromWidget.controls) === null || _a === void 0 ? void 0 : _a.zoomInsight)) }) });
        const fromInsight = insightProperties(insight);
        const merged = mergeWith({}, fromInsight, fromWidgetWithZoomingHandled, (currentValue, incomingValue) => {
            /**
             * Replace arrays instead of merging them. This is important for column sizing for example,
             * where widget might provide an empty array to override the custom column sizes defined on the insight level.
             */
            if (isArray(currentValue)) {
                return incomingValue;
            }
            // for other types fall back to the default merging strategy by returning nothing
        });
        return insightSetProperties(insight, merged);
    }, [insight, widget.properties, settings]);
};
//# sourceMappingURL=useResolveDashboardInsightProperties.js.map