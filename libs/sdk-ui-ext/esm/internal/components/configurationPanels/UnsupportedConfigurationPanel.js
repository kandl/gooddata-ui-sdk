// (C) 2019 GoodData Corporation
import React from "react";
import omit from "lodash/omit.js";
import ConfigurationPanelContent from "./ConfigurationPanelContent.js";
import UnsupportedProperties from "../configurationControls/UnsupportedProperties.js";
export default class UnsupportedConfigurationPanel extends ConfigurationPanelContent {
    componentDidMount() {
        this.props.pushData({
            properties: omit(this.props.properties, "controls"),
            references: null,
            ignoreUndoRedo: true,
        });
    }
    isControlDisabled() {
        return true;
    }
    renderConfigurationPanel() {
        return React.createElement(UnsupportedProperties, null);
    }
}
//# sourceMappingURL=UnsupportedConfigurationPanel.js.map