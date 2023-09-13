// (C) 2019-2022 GoodData Corporation
import React from "react";
import { DefaultLocale } from "@gooddata/sdk-ui";
import ColorsSection from "../configurationControls/colors/ColorsSection.js";
import LegendSection from "../configurationControls/legend/LegendSection.js";
import { InternalIntlWrapper } from "../../utils/internalIntlProvider.js";
import { insightHasMeasures } from "@gooddata/sdk-model";
import { getMeasuresFromMdObject } from "../../utils/bucketHelper.js";
import noop from "lodash/noop.js";
class ConfigurationPanelContent extends React.PureComponent {
    render() {
        return (React.createElement("div", { key: `config-${this.props.type}` },
            React.createElement(InternalIntlWrapper, { locale: this.props.locale }, this.renderConfigurationPanel())));
    }
    isControlDisabled() {
        const { insight, isError, isLoading } = this.props;
        return !insight || !insightHasMeasures(insight) || isError || isLoading;
    }
    renderColorSection() {
        const { properties, propertiesMeta, pushData, colors, featureFlags, references, insight, isLoading } = this.props;
        const controlsDisabled = this.isControlDisabled();
        const hasMeasures = getMeasuresFromMdObject(insight).length > 0;
        return (React.createElement(ColorsSection, { properties: properties, propertiesMeta: propertiesMeta, references: references, colors: colors, controlsDisabled: controlsDisabled, pushData: pushData, hasMeasures: hasMeasures, showCustomPicker: featureFlags.enableCustomColorPicker, isLoading: isLoading }));
    }
    renderLegendSection() {
        const { properties, propertiesMeta, pushData } = this.props;
        const controlsDisabled = this.isControlDisabled();
        return (React.createElement(LegendSection, { properties: properties, propertiesMeta: propertiesMeta, controlsDisabled: controlsDisabled, pushData: pushData }));
    }
}
ConfigurationPanelContent.defaultProps = {
    properties: null,
    references: null,
    propertiesMeta: null,
    colors: null,
    locale: DefaultLocale,
    isError: false,
    isLoading: false,
    insight: null,
    pushData: noop,
    featureFlags: {},
    axis: null,
    panelConfig: {},
};
export default ConfigurationPanelContent;
//# sourceMappingURL=ConfigurationPanelContent.js.map