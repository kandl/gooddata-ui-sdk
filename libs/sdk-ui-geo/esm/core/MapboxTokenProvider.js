// (C) 2021-2022 GoodData Corporation
import React, { useContext } from "react";
import { invariant } from "ts-invariant";
/**
 * @alpha
 */
export const MapboxTokenContext = React.createContext({
    mapboxToken: undefined,
});
/**
 * @alpha
 */
export const MapboxTokenProvider = ({ token, children, }) => {
    return (React.createElement(MapboxTokenContext.Provider, { value: { mapboxToken: token } }, children));
};
/**
 * @internal
 */
export function withMapboxToken(InnerComponent) {
    return class MapboxTokenHOC extends React.Component {
        static contextType = MapboxTokenContext;
        render() {
            const { mapboxToken } = this.context;
            const props = this.props;
            return (React.createElement(React.Fragment, null,
                React.createElement(InnerComponent, { ...props, config: enrichMapboxToken(props.config, mapboxToken) })));
        }
    };
}
/**
 * @internal
 */
export function enrichMapboxToken(config, mapboxToken) {
    return mapboxToken
        ? {
            ...(config || {}),
            mapboxToken: config?.mapboxToken || mapboxToken,
        }
        : config;
}
/**
 * @alpha
 */
export function useMapboxTokenStrict(mapboxToken) {
    const context = useContext(MapboxTokenContext);
    const token = mapboxToken ?? context.mapboxToken;
    invariant(token, "Mapbox token was not provided. Use <MapboxTokenProvider /> to provide token.");
    return token;
}
/**
 * @alpha
 */
export function useMapboxToken(mapboxToken) {
    const context = useContext(MapboxTokenContext);
    return mapboxToken ?? context.mapboxToken;
}
//# sourceMappingURL=MapboxTokenProvider.js.map