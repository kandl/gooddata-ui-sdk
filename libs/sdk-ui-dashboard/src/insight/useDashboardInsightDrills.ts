// (C) 2020-2021 GoodData Corporation
import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import flatMap from "lodash/flatMap";
import isEqual from "lodash/isEqual";
import { IInsightWidget } from "@gooddata/sdk-backend-spi";
import { IInsight } from "@gooddata/sdk-model";
import {
    IAvailableDrillTargetAttribute,
    IPushData,
    IDrillEvent,
    isSomeHeaderPredicateMatched,
    DataViewFacade,
    IDrillableItem,
    IHeaderPredicate,
} from "@gooddata/sdk-ui";
import { IDashboardDrillEvent } from "@gooddata/sdk-ui-ext";
import { useDashboardSelector, selectAttributesWithDrillDown } from "../model";
import { getImplicitDrillsWithPredicates } from "../model/_staging/drills/drillingUtils";
import { useDrill } from "../drill/useDrill";
import { IDrillDownContext } from "@gooddata/sdk-ui-ext/esm/internal";
import { OnDashboardDrill } from "../drill/Types";
/**
 * @internal
 */
export interface UseDashboardInsightDrillsProps {
    disableWidgetImplicitDrills?: boolean;
    insightWidget: IInsightWidget;
    insight: IInsight;
    drillableItems?: Array<IDrillableItem | IHeaderPredicate>;
    onDrill?: OnDashboardDrill;
}

/**
 * @internal
 */
export const useDashboardInsightDrills = (props: UseDashboardInsightDrillsProps) => {
    const { insightWidget, insight, drillableItems, disableWidgetImplicitDrills, onDrill } = props;

    const { run: performDrill } = useDrill();

    const attributesWithDrillDown = useDashboardSelector(selectAttributesWithDrillDown);
    const [possibleDrills, setPossibleDrills] = useState<IAvailableDrillTargetAttribute[]>([]);

    const handlePushData = useCallback((data: IPushData): void => {
        if (data.availableDrillTargets?.attributes) {
            setPossibleDrills((prevValue) => {
                // only set possible drills if really different to prevent other hooks firing unnecessarily
                if (!isEqual(prevValue, data.availableDrillTargets?.attributes)) {
                    return data.availableDrillTargets!.attributes!;
                }

                // returning prevValue effectively skips the setState
                return prevValue;
            });
        }
    }, []);

    const implicitDrillDefinitions = useMemo(() => {
        return getImplicitDrillsWithPredicates(
            insightWidget.drills,
            possibleDrills,
            attributesWithDrillDown,
            disableWidgetImplicitDrills,
        );
    }, [insightWidget.drills, possibleDrills, attributesWithDrillDown]);

    const implicitDrills = useMemo(() => {
        return flatMap(implicitDrillDefinitions, (info) => info.predicates);
    }, [implicitDrillDefinitions]);

    // since InsightRendererImpl only sets onDrill on the first render (this is a PlugVis API, there is no way to update onDrill there)
    // we have to sync the implicitDrillDefinitions into a ref so that the handleDrill can access the most recent value (thanks to the .current)
    // without this, handleDrill just closes over the first implicitDrillDefinitions which will never contain drillDown drills
    // as they are added *after* the first render of the PlugVis.
    const cachedImplicitDrillDefinitions = useRef(implicitDrillDefinitions);
    useEffect(() => {
        cachedImplicitDrillDefinitions.current = implicitDrillDefinitions;
    }, [implicitDrillDefinitions]);

    /*
     * if there are drillable items from the user, use them and only them
     *
     * also pass any drillable items only if there is an onDrill specified, otherwise pass undefined
     * so that the items are not shown as active since nothing can happen on click without the onDrill provided
     */
    const drillableItemsToUse = props.onDrill ? drillableItems ?? implicitDrills : undefined;

    const handleDrill = onDrill
        ? (
              event: IDrillEvent,
              exposedVisualizationCallbacks: {
                  getInsightWithDrillDownApplied(
                      sourceVisualization: IInsight,
                      drillDownContext: IDrillDownContext,
                  ): IInsight;
              },
              handleDrillSelect: OnDashboardDrill,
          ) => {
              let enrichedEvent: IDashboardDrillEvent = {
                  ...event,
                  widgetRef: insightWidget.ref,
              };

              console.log("handle drill", {
                  enrichedEvent,
                  event,
                  drillableItems,
                  onDrill,
                  handleDrillSelect,
              });

              // if there are drillable items, we do not want to return any drillDefinitions as the implicit drills are not even used
              if (drillableItems && typeof onDrill === "function") {
                  performDrill(enrichedEvent);
                  handleDrillSelect(enrichedEvent, {
                      ...exposedVisualizationCallbacks,
                      insight,
                      widget: insightWidget,
                  });
                  return onDrill(enrichedEvent, {
                      ...exposedVisualizationCallbacks,
                      insight,
                      widget: insightWidget,
                  });
              }

              const facade = DataViewFacade.for(event.dataView);

              const definitions = cachedImplicitDrillDefinitions.current;

              const matchingImplicitDrillDefinitions = definitions.filter((info) => {
                  return event.drillContext.intersection?.some((intersection) =>
                      isSomeHeaderPredicateMatched(info.predicates, intersection.header, facade),
                  );
              });

              enrichedEvent = {
                  ...enrichedEvent,
                  drillDefinitions: matchingImplicitDrillDefinitions.map((info) => info.drillDefinition),
              };
              performDrill(enrichedEvent);
              handleDrillSelect(enrichedEvent, {
                  ...exposedVisualizationCallbacks,
                  insight,
                  widget: insightWidget,
              });
              return (
                  typeof onDrill === "function" &&
                  onDrill(enrichedEvent, {
                      ...exposedVisualizationCallbacks,
                      insight,
                      widget: insightWidget,
                  })
              );
          }
        : undefined;

    return {
        handleDrill,
        handlePushData,
        drillableItems: drillableItemsToUse,
    };
};