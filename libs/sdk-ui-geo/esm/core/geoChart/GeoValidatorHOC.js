// (C) 2020-2023 GoodData Corporation
import React from "react";
import isEqual from "lodash/isEqual.js";
import { injectIntl } from "react-intl";
import { isLocationSet } from "./helpers/geoChart/common.js";
import { ErrorCodes, ErrorComponent as DefaultErrorComponent, GeoLocationMissingSdkError, GeoTokenMissingSdkError, IntlWrapper, isGeoTokenMissing, newErrorMapping, } from "@gooddata/sdk-ui";
export function geoValidatorHOC(InnerComponent) {
    class ValidatorHOCWrapped extends React.Component {
        errorMap;
        isLocationMissing = false;
        isMapboxTokenMissing = false;
        constructor(props) {
            super(props);
            this.errorMap = newErrorMapping(props.intl);
            this.state = {
                isMapboxTokenInvalid: false,
            };
        }
        render() {
            this.initError();
            if (this.state.isMapboxTokenInvalid || this.isMapboxTokenMissing) {
                return this.renderErrorComponent(ErrorCodes.GEO_MAPBOX_TOKEN_MISSING);
            }
            if (this.isLocationMissing) {
                return this.renderErrorComponent(ErrorCodes.GEO_LOCATION_MISSING);
            }
            return React.createElement(InnerComponent, { ...this.props, onError: this.onError });
        }
        shouldComponentUpdate(nextProps, nextState) {
            const { config, execution, drillableItems } = this.props;
            const { config: nextConfig, execution: nextExecution, drillableItems: nextDrillableItems, } = nextProps;
            // check if buckets, filters and config are changed
            const isSameConfig = this.isSameConfig(config, nextConfig);
            const isSameDataSource = this.isSameData(execution, nextExecution);
            const isSameDrillableItems = isEqual(drillableItems, nextDrillableItems);
            return (!isSameConfig ||
                !isSameDataSource ||
                !isSameDrillableItems ||
                this.state.isMapboxTokenInvalid !== nextState.isMapboxTokenInvalid);
        }
        componentDidUpdate(prevProps) {
            if (prevProps.config?.mapboxToken !== this.props.config?.mapboxToken) {
                this.setState({
                    isMapboxTokenInvalid: false,
                });
            }
            else {
                this.handleError();
            }
        }
        componentDidMount() {
            this.handleError();
        }
        initError() {
            const mapboxToken = this.props.config?.mapboxToken ?? "";
            const { execution } = this.props;
            this.isLocationMissing = !isLocationSet(execution.definition.buckets);
            this.isMapboxTokenMissing = !mapboxToken;
        }
        handleError() {
            const { onError } = this.props;
            if (this.isLocationMissing) {
                onError?.(new GeoLocationMissingSdkError());
            }
            if (this.state.isMapboxTokenInvalid || this.isMapboxTokenMissing) {
                onError?.(new GeoTokenMissingSdkError());
            }
        }
        handleInvalidMapboxToken() {
            this.setState({
                isMapboxTokenInvalid: true,
            });
        }
        onError = (e) => {
            if (isGeoTokenMissing(e)) {
                this.handleInvalidMapboxToken();
            }
            else {
                this.props.onError?.(e);
            }
        };
        renderErrorComponent(errorState) {
            const ErrorComponent = this.props.ErrorComponent ?? DefaultErrorComponent;
            // in this case, we show "Sorry, we can't display this insight"
            const errorProps = this.errorMap[errorState] || this.errorMap[ErrorCodes.UNKNOWN_ERROR];
            return React.createElement(ErrorComponent, { code: errorState, ...errorProps });
        }
        isSameConfig(config, nextConfig) {
            const colorMapping = (config?.colorMapping || []).map((currentColor) => currentColor.color);
            const nextColorMapping = (nextConfig?.colorMapping || []).map((newColor) => newColor.color);
            const configProps = {
                ...config,
                colorMapping,
            };
            const nextConfigProps = {
                ...nextConfig,
                colorMapping: nextColorMapping,
            };
            return isEqual(configProps, nextConfigProps);
        }
        isSameData(execution, nextExecution) {
            if (!execution || !nextExecution) {
                // one of data views is undefined. just test if the other one is also undefined, otherwise
                // data is definitely different
                return execution === nextExecution;
            }
            // we need equals here (not just fingerprint) for cases where measure is moved from one bucket to another
            return execution.equals(nextExecution);
        }
    }
    const IntlValidatorHOC = injectIntl(ValidatorHOCWrapped);
    return class ValidatorHOC extends React.Component {
        render() {
            return (React.createElement(IntlWrapper, { locale: this.props.locale },
                React.createElement(IntlValidatorHOC, { ...this.props })));
        }
    };
}
//# sourceMappingURL=GeoValidatorHOC.js.map