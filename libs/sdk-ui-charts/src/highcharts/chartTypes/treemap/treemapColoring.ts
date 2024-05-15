// (C) 2020-2024 GoodData Corporation
import { MeasureColorStrategy } from "../_chartColoring/measure.js";
import { IColorPalette } from "@gooddata/sdk-model";
import { IColorMapping } from "../../../interfaces/index.js";
import { IColorAssignment, DataViewFacade } from "@gooddata/sdk-ui";
import { getAttributeColorAssignment, ICreateColorAssignmentReturnValue } from "@gooddata/sdk-ui-vis-commons";

export class TreemapColorStrategy extends MeasureColorStrategy {
    protected createColorAssignment(
        colorPalette: IColorPalette,
        colorMapping: IColorMapping[],
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        viewByAttribute: any,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        stackByAttribute: any,
        dv: DataViewFacade,
    ): ICreateColorAssignmentReturnValue {
        console.log("treemap plot palette", {
            colorPalette,
            colorMapping,
            viewByAttribute,
            stackByAttribute,
            dv,
        });

        let colorAssignment: IColorAssignment[];
        if (viewByAttribute) {
            colorAssignment = getAttributeColorAssignment(viewByAttribute, colorPalette, colorMapping, dv);
        } else {
            const result = super.createColorAssignment(
                colorPalette,
                colorMapping,
                viewByAttribute,
                stackByAttribute,
                dv,
            );
            colorAssignment = result.outputColorAssignment;
        }

        return {
            fullColorAssignment: colorAssignment,
            outputColorAssignment: colorAssignment,
        };
    }
}
