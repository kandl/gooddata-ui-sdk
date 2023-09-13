// (C) 2020-2022 GoodData Corporation
import omit from "lodash/omit.js";
import { AttributeColorStrategy, ColorStrategy, isValidMappedColor, getColorFromMapping, } from "@gooddata/sdk-ui-vis-commons";
import { findGeoAttributesInDimension } from "../helpers/geoChart/data.js";
class GeoChartColorStrategy extends ColorStrategy {
    createColorAssignment(colorPalette, colorMapping, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    locationAttribute, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    segmentByAttribute, dv) {
        // color follows SegmentBy
        if (segmentByAttribute) {
            return {
                fullColorAssignment: this.getColorStrategyForSegmentBy(colorPalette, colorMapping, segmentByAttribute, dv),
            };
        }
        // color follows Location
        return {
            fullColorAssignment: [
                this.getColorStrategyForLocation(colorPalette, colorMapping, locationAttribute, dv),
            ],
        };
    }
    getColorStrategyForSegmentBy(colorPalette, colorMapping, segmentByAttribute, dv) {
        const colorStrategy = new AttributeColorStrategy(colorPalette, colorMapping, null, segmentByAttribute, dv);
        return colorStrategy.getColorAssignment();
    }
    getColorStrategyForLocation(colorPalette, colorMapping, locationAttribute, dv) {
        const mappedColor = getColorFromMapping(locationAttribute, colorMapping, dv);
        const color = mappedColor !== undefined && isValidMappedColor(mappedColor, colorPalette)
            ? mappedColor
            : {
                type: "guid",
                value: colorPalette[0].guid,
            };
        return {
            headerItem: locationAttribute,
            color,
        };
    }
}
export function getColorStrategy(colorPalette, colorMapping, geoData, dv) {
    const { locationAttribute, segmentByAttribute } = findGeoAttributesInDimension(dv, geoData);
    const locationAttributeHeader = {
        attributeHeader: omit(locationAttribute, "items"),
    };
    return new GeoChartColorStrategy(colorPalette, colorMapping, locationAttributeHeader, segmentByAttribute, dv);
}
//# sourceMappingURL=geoChart.js.map