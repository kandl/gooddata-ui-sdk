// (C) 2007-2022 GoodData Corporation
import React from "react";
import { newErrorMapping, IntlWrapper, ErrorCodes, withEntireDataView, } from "@gooddata/sdk-ui";
import { defaultCoreChartProps } from "../_commons/defaultProps.js";
class HeadlineStateless extends React.Component {
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
        // when in pageble mode (getPage present) never show loading (its handled by the component)
        if (isLoading || !dataView) {
            return LoadingComponent ? React.createElement(LoadingComponent, null) : null;
        }
        return this.renderVisualization();
    }
    renderVisualization() {
        const { afterRender, drillableItems, locale, dataView, onDrill, config, headlineTransformation: HeadlineTransformation, } = this.props;
        return (React.createElement(IntlWrapper, { locale: locale },
            React.createElement(HeadlineTransformation, { dataView: dataView, onAfterRender: afterRender, onDrill: onDrill, drillableItems: drillableItems, config: config })));
    }
}
HeadlineStateless.defaultProps = Object.assign(Object.assign({}, defaultCoreChartProps), { config: {} });
export { HeadlineStateless };
/**
 * @internal
 */
const CoreHeadline = withEntireDataView(HeadlineStateless);
/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disapppear.
 */
export { CoreHeadline };
//# sourceMappingURL=CoreHeadline.js.map