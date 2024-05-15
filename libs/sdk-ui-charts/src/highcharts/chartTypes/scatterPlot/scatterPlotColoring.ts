// (C) 2020-2024 GoodData Corporation
// import { PointsChartColorStrategy } from "../_chartColoring/pointsChart.js";
import { IColorPalette } from "@gooddata/sdk-model";
import { IColorMapping } from "../../../interfaces/index.js";
import { IColorAssignment, DataViewFacade } from "@gooddata/sdk-ui";
import { ICreateColorAssignmentReturnValue, getAttributeColorAssignment } from "@gooddata/sdk-ui-vis-commons";
import { MeasureColorStrategy } from "../_chartColoring/measure.js";

//
export class ScatterPlotColorStrategy extends MeasureColorStrategy {
    // protected createColorAssignment(
    //     colorPalette: IColorPalette,
    //     colorMapping: IColorMapping[],
    //     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    //     _viewByAttribute: any,
    //     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    //     _stackByAttribute: any,
    //     dv: DataViewFacade,
    // ): ICreateColorAssignmentReturnValue {
    //     const colorAssignment = this.singleMeasureColorMapping(colorPalette, colorMapping, dv);
    //     return {
    //         fullColorAssignment: colorAssignment,
    //     };
    // }

    protected createColorAssignment(
        colorPalette: IColorPalette,
        colorMapping: IColorMapping[],
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        viewByAttribute: any,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        stackByAttribute: any,
        dv: DataViewFacade,
    ): ICreateColorAssignmentReturnValue {
        console.log("scatter plot palette", {
            colorPalette,
            colorMapping,
            viewByAttribute,
            stackByAttribute,
            dv,
        });

        let colorAssignment: IColorAssignment[];
        if (stackByAttribute) {
            colorAssignment = getAttributeColorAssignment(stackByAttribute, colorPalette, colorMapping, dv);
            console.log("create color assignment", {
                colorAssignment,
                stackByAttribute,
                colorPalette,
                colorMapping,
                dv,
            });
        } else {
            const result = super.createColorAssignment(
                colorPalette,
                colorMapping,
                viewByAttribute,
                stackByAttribute,
                dv,
            );
            colorAssignment = result.outputColorAssignment.slice(0, 1);
        }

        return {
            fullColorAssignment: colorAssignment,
            outputColorAssignment: colorAssignment,
        };
    }

    // protected createPalette(
    //     colorPalette: IColorPalette,
    //     colorAssignment: IColorAssignment[],
    //     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    //     _viewByAttribute: any,
    //     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    //     stackByAttribute: any,
    // ): string[] {
    //     return super.createSingleColorPalette(colorPalette, colorAssignment, stackByAttribute);
    // }
}
