// (C) 2020-2024 GoodData Corporation
import { BucketNames, DataViewFacade, getMappingHeaderFormattedName } from "@gooddata/sdk-ui";
import { IColorStrategy, valueWithEmptyHandling } from "@gooddata/sdk-ui-vis-commons";
import { IPointData, ISeriesItemConfig } from "../../typings/unsafe.js";
import { parseValue } from "../_util/common.js";
// import isEqual from "lodash/isEqual.js";
import { IResultAttributeHeader } from "@gooddata/sdk-model";
import debounce from "lodash/debounce.js";

function handleOpacityOnMouseOver() {
    const segmentName = this.segmentName;
    const allDataPoints = this.series.data;
    const otherSegmentsDataPoints = allDataPoints.filter((dp) => dp.segmentName !== segmentName);
    otherSegmentsDataPoints.forEach((dp) => {
        dp.graphic?.attr({ opacity: 0.3 });
    });
}

const handleOpacityOnMouseOverDebounced = debounce(handleOpacityOnMouseOver, 50);

function handleOpacityOnMouseOut() {
    const segmentName = this.segmentName;
    const allDataPoints = this.series.data;
    const otherSegmentsDataPoints = allDataPoints.filter((dp) => dp.segmentName !== segmentName);
    otherSegmentsDataPoints.forEach((dp) => {
        dp.graphic?.attr({ opacity: 1 });
    });
}

const handleOpacityOnMouseOutDebounced = debounce(handleOpacityOnMouseOut, 50);

export function getScatterPlotSeries(
    dv: DataViewFacade,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    viewByAttribute: any,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    stackByAttribute: any,
    colorStrategy: IColorStrategy,
    emptyHeaderTitle: string,
): ISeriesItemConfig[] {
    const primaryMeasuresBucketEmpty = dv.def().isBucketEmpty(BucketNames.MEASURES);
    const secondaryMeasuresBucketEmpty = dv.def().isBucketEmpty(BucketNames.SECONDARY_MEASURES);
    const seriesArray = dv.data().series().toArray();
    const slicesArray = dv.data().slices().toArray();
    // const uniqStackByItems: IResultAttributeHeader[] = uniqBy<IResultAttributeHeader>(
    //     stackByAttribute.items,
    //     "attributeHeaderItem.uri",
    // );

    const colorAssignments = colorStrategy.getColorAssignment();

    console.log("getScatterPlotSeries - seriesArray / slicesArray", {
        seriesArray,
        slicesArray,
        viewByAttribute,
        stackByAttribute,
        colorAssignments,
    });

    const data = dv
        .rawData()
        .twoDimData()
        .map((seriesItem: string[], seriesIndex: number): IPointData => {
            const values = seriesItem.map((value: string) => {
                return parseValue(value);
            });

            // const stackByItem = stackByAttribute.items[seriesIndex];

            // console.log('getScatterPlotSeries map', { stackByItem, seriesItem, seriesIndex });
            const colorAssignment = stackByAttribute
                ? colorAssignments.find(
                      (a) =>
                          (stackByAttribute.items as IResultAttributeHeader[])[seriesIndex]
                              .attributeHeaderItem.uri ===
                          (a.headerItem as IResultAttributeHeader).attributeHeaderItem.uri,
                  )
                : colorAssignments[0];

            const colorAssignmentIndex = colorAssignments.indexOf(colorAssignment);

            const assignedColor = colorStrategy.getColorByIndex(colorAssignmentIndex);

            return {
                x: !primaryMeasuresBucketEmpty ? values[0] : 0,
                y: !secondaryMeasuresBucketEmpty ? (primaryMeasuresBucketEmpty ? values[0] : values[1]) : 0,
                // index: seriesIndex,
                name: viewByAttribute
                    ? valueWithEmptyHandling(
                          getMappingHeaderFormattedName(viewByAttribute.items[seriesIndex]),
                          emptyHeaderTitle,
                      )
                    : "",
                segmentName: stackByAttribute
                    ? valueWithEmptyHandling(
                          getMappingHeaderFormattedName(stackByAttribute.items[seriesIndex]),
                          emptyHeaderTitle,
                      )
                    : "",
                color: assignedColor,
                ...(stackByAttribute
                    ? {
                          events: {
                              mouseOver: handleOpacityOnMouseOverDebounced,
                              mouseOut: handleOpacityOnMouseOutDebounced,
                          },
                      }
                    : {}),
            };
        });

    console.log("get scatter plot series", { dv, data, viewByAttribute, stackByAttribute });

    return [
        {
            turboThreshold: 0,
            color: colorStrategy.getColorByIndex(0),
            legendIndex: 0,
            data,
            seriesIndex: 0,
        },
    ];
}
