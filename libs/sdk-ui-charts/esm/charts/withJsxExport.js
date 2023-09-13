import { __setFunctionName } from "tslib";
// (C) 2019-2022 GoodData Corporation
import React from "react";
import isFunction from "lodash/isFunction.js";
import isString from "lodash/isString.js";
import toPairs from "lodash/toPairs.js";
import hoistNonReactStatics from "hoist-non-react-statics";
import { factoryNotationFor } from "@gooddata/sdk-model";
const getDisplayName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || "Component";
/**
 * @internal
 */
export const withJsxExport = (Component) => {
    var _a;
    const result = (_a = class extends React.Component {
            constructor() {
                super(...arguments);
                this.toJsx = () => {
                    const stringifiedProps = toPairs(this.props)
                        // we ignore functions as there is no bullet-proof to serialize them
                        .filter(([_, value]) => !isFunction(value))
                        .map(([key, value]) => isString(value) ? `${key}="${value}"` : `${key}={${factoryNotationFor(value)}}`);
                    const paddedPropDeclarations = stringifiedProps.join("\n").replace(/^/gm, "    ");
                    return `<${getDisplayName(Component)}\n${paddedPropDeclarations}\n/>`;
                };
            }
            render() {
                return React.createElement(Component, Object.assign({}, this.props));
            }
        },
        __setFunctionName(_a, "result"),
        _a.displayName = `WithJsxExport(${getDisplayName(Component)})`,
        _a);
    hoistNonReactStatics(result, Component);
    return result;
};
//# sourceMappingURL=withJsxExport.js.map