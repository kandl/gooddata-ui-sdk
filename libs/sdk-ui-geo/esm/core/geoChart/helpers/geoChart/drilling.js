// (C) 2020-2023 GoodData Corporation
import { getDrillIntersection, isSomeHeaderPredicateMatched, } from "@gooddata/sdk-ui";
import { findGeoAttributesInDimension, parseGeoProperties } from "./data.js";
import without from "lodash/without.js";
import omit from "lodash/omit.js";
function getDrillIntersectionForGeoChart(drillableItems, dv, geoData, locationIndex) {
    const measureGroupItems = dv.meta().measureDescriptors();
    const measureHeaders = measureGroupItems.slice(0, 2);
    const { locationAttribute, segmentByAttribute, tooltipTextAttribute } = findGeoAttributesInDimension(dv, geoData);
    const { attributeHeader: locationAttributeHeader, attributeHeaderItem: locationAttributeHeaderItem } = getAttributeHeader(locationAttribute, locationIndex);
    const { attributeHeader: segmentByAttributeHeader, attributeHeaderItem: segmentByAttributeHeaderItem } = getAttributeHeader(segmentByAttribute, locationIndex);
    const { attributeHeader: tooltipTextAttributeHeader, attributeHeaderItem: tooltipTextAttributeHeaderItem, } = getAttributeHeader(tooltipTextAttribute, locationIndex);
    // pin is drillable if a drillableItem matches:
    //   pin's measure,
    //   pin's location attribute,
    //   pin's location attribute item,
    //   pin's segmentBy attribute,
    //   pin's segmentBy attribute item,
    //   pin's tooltipText attribute,
    //   pin's tooltipText attribute item,
    const drillItems = without([
        ...measureHeaders,
        locationAttributeHeaderItem,
        locationAttributeHeader,
        segmentByAttributeHeaderItem,
        segmentByAttributeHeader,
        tooltipTextAttributeHeaderItem,
        tooltipTextAttributeHeader,
    ], undefined);
    const drilldown = drillItems.some((drillableHook) => isSomeHeaderPredicateMatched(drillableItems, drillableHook, dv));
    if (drilldown) {
        return getDrillIntersection(drillItems);
    }
    return undefined;
}
function getAttributeHeader(attribute, dataIndex) {
    if (attribute) {
        return {
            attributeHeader: { attributeHeader: omit(attribute, "items") },
            attributeHeaderItem: attribute.items[dataIndex],
        };
    }
    return {
        attributeHeader: undefined,
        attributeHeaderItem: undefined,
    };
}
export function handleGeoPushpinDrillEvent(drillableItems, drillConfig, dv, geoData, pinProperties, pinCoordinates, target) {
    const { locationIndex } = pinProperties || {};
    const drillIntersection = getDrillIntersectionForGeoChart(drillableItems, dv, geoData, locationIndex);
    if (!drillIntersection?.length) {
        return;
    }
    const { onDrill } = drillConfig;
    const [lng, lat] = pinCoordinates;
    const { locationName: { value: locationNameValue }, color: { value: colorValue }, segment: { value: segmentByValue }, size: { value: sizeValue }, } = parseGeoProperties(pinProperties) || {};
    const drillContext = {
        element: "pushpin",
        intersection: drillIntersection,
        type: "pushpin",
        color: colorValue,
        location: { lat, lng },
        locationName: locationNameValue,
        segmentBy: segmentByValue,
        size: sizeValue,
    };
    const drillEventExtended = {
        dataView: dv.dataView,
        drillContext,
    };
    if (onDrill) {
        const shouldFireEvent = onDrill(drillEventExtended);
        // if user-specified onDrill fn returns false, do not fire default DOM event
        if (shouldFireEvent !== false) {
            const event = new CustomEvent("drill", {
                detail: drillEventExtended,
                bubbles: true,
            });
            target.dispatchEvent(event);
        }
    }
}
//# sourceMappingURL=drilling.js.map