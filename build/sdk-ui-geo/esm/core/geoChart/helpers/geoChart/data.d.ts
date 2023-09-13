import { IAvailableLegends, IGeoData, IGeoLngLat } from "../../../../GeoChart.js";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { IAttributeDescriptor, IResultHeader } from "@gooddata/sdk-model";
import { IPushpinCategoryLegendItem } from "@gooddata/sdk-ui-vis-commons";
export declare function getLocation(latlng: string | null): IGeoLngLat | null;
export declare function parseCoordinate(coordinate: string | null): number | null;
export declare function getGeoData(dv: DataViewFacade, emptyHeaderString: string, nullHeaderString: string): IGeoData;
export declare function getAvailableLegends(categoryItems: IPushpinCategoryLegendItem[], geoData: IGeoData): IAvailableLegends;
export declare function parseGeoProperties(properties: GeoJSON.GeoJsonProperties): GeoJSON.GeoJsonProperties;
export type AttributeInfo = IAttributeDescriptor["attributeHeader"] & {
    items: IResultHeader[];
};
export interface IGeoAttributesInDimension {
    locationAttribute: AttributeInfo;
    segmentByAttribute: AttributeInfo | undefined;
    tooltipTextAttribute: AttributeInfo | undefined;
}
export declare function findGeoAttributesInDimension(dv: DataViewFacade, geoData: IGeoData): IGeoAttributesInDimension;
//# sourceMappingURL=data.d.ts.map