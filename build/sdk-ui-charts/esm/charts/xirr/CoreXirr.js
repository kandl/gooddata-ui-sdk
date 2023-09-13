// (C) 2007-2022 GoodData Corporation
import React from "react";
import { newErrorMapping, IntlWrapper, ErrorCodes, withEntireDataView, } from "@gooddata/sdk-ui";
import XirrTransformation from "./internal/XirrTransformation.js";
import { defaultCoreChartProps } from "../_commons/defaultProps.js";
class XirrStateless extends React.Component {
    constructor(props) {
        super(props);
        this.errorMap = newErrorMapping(props.intl);
    }
    render() {
        const { dataView, error, isLoading } = this.props;
        const ErrorComponent = this.props.ErrorComponent;
        const LoadingComponent = this.props.LoadingComponent;
        if (error) {
            const errorProps = this.errorMap[Object.prototype.hasOwnProperty.call(this.errorMap, error)
                ? error
                : ErrorCodes.UNKNOWN_ERROR];
            return ErrorComponent ? React.createElement(ErrorComponent, Object.assign({ code: error }, errorProps)) : null;
        }
        // when in pageable mode (getPage present) never show loading (its handled by the component)
        if (isLoading || !dataView) {
            return LoadingComponent ? React.createElement(LoadingComponent, null) : null;
        }
        return this.renderVisualization();
    }
    renderVisualization() {
        const { afterRender, drillableItems, locale, dataView, onDrill, config } = this.props;
        return (React.createElement(IntlWrapper, { locale: locale },
            React.createElement(XirrTransformation, { dataView: dataView, onAfterRender: afterRender, onDrill: onDrill, drillableItems: drillableItems, config: config })));
    }
}
XirrStateless.defaultProps = defaultCoreChartProps;
export { XirrStateless };
/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disapppear.
 *
 * @internal
 */
export const CoreXirr = withEntireDataView(XirrStateless);
//# sourceMappingURL=CoreXirr.js.map