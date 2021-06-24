// (C) 2021 GoodData Corporation
import { PluggableVisualizationFactory } from "../../../interfaces/VisualizationDescriptor";
import { PluggableTreemap } from "./PluggableTreemap";
import { BigChartDescriptor } from "../BigChartDescriptor";
import { IInsight } from "@gooddata/sdk-model";
import { IDrillEvent } from "@gooddata/sdk-ui";
import { IDrillDownDefinition } from "../../../dashboardEmbedding";
import {
    addIntersectionFiltersToInsight,
    modifyBucketsAttributesForDrillDown,
    reverseAndTrimIntersection,
} from "../drillDownUtil";
import { IDrillDownContext } from "../../../interfaces/Visualization";

export class TreemapDescriptor extends BigChartDescriptor {
    public getFactory(): PluggableVisualizationFactory {
        return (params) => new PluggableTreemap(params);
    }

    private addFilters(source: IInsight, drillConfig: IDrillDownDefinition, event: IDrillEvent) {
        const cutIntersection = reverseAndTrimIntersection(drillConfig, event.drillContext.intersection);
        return addIntersectionFiltersToInsight(source, cutIntersection);
    }

    public applyDrillDown(source: IInsight, drillDownContext: IDrillDownContext): IInsight {
        const withFilters = this.addFilters(source, drillDownContext.drillDefinition, drillDownContext.event);
        return modifyBucketsAttributesForDrillDown(withFilters, drillDownContext.drillDefinition);
    }
}
