/**
 * @internal
 */
export function isGeoPushpinChartProps(props) {
    return props.location !== undefined;
}
/**
 * @internal
 */
export function isGeoPushpinChartLatitudeLongitudeProps(props) {
    const latitudeLongitudeProps = props;
    return latitudeLongitudeProps.latitude !== undefined && latitudeLongitudeProps.longitude !== undefined;
}
//# sourceMappingURL=GeoChart.js.map