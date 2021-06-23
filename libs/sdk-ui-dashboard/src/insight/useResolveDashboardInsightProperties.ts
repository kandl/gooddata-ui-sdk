// (C) 2020-2021 GoodData Corporation
import { useMemo } from "react";
import { IInsightWidget } from "@gooddata/sdk-backend-spi";
import { IInsight, insightProperties, insightSetProperties } from "@gooddata/sdk-model";
import { selectSettings, useDashboardSelector } from "../model";
import merge from "lodash/merge";

/**
 * @internal
 */
export interface UseResolveDashboardInsightFiltersProps {
    insight: IInsight;
    insightWidget: IInsightWidget;
}

/**
 * @internal
 */
export const useResolveDashboardInsightProperties = (
    props: UseResolveDashboardInsightFiltersProps,
): IInsight => {
    const { insightWidget, insight } = props;
    const settings = useDashboardSelector(selectSettings);

    const insightWithAddedWidgetProperties = useMemo(() => {
        if (!insight) {
            return insight;
        }

        const fromWidget = insightWidget.properties;
        if (!fromWidget) {
            return insight;
        }

        const fromWidgetWithZoomingHandled = {
            ...fromWidget,
            controls: {
                ...fromWidget?.controls,
                // we need to take the relevant feature flag into account as well
                zoomInsight: !!(settings.enableKDZooming && fromWidget?.controls?.zoomInsight),
            },
        };

        const fromInsight = insightProperties(insight);
        const merged = merge({}, fromInsight, fromWidgetWithZoomingHandled);

        return insightSetProperties(insight, merged);
    }, [insight, insightWidget.properties, settings]);

    return insightWithAddedWidgetProperties;
};
