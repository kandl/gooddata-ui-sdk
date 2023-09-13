import React from "react";
import ConfigurationPanelContent, { IConfigurationPanelContentProps } from "./ConfigurationPanelContent.js";
import { IHeadlinePanelConfig } from "../../interfaces/ConfigurationPanel.js";
declare class HeadlineConfigurationPanel extends ConfigurationPanelContent<IConfigurationPanelContentProps<IHeadlinePanelConfig>> {
    protected renderConfigurationPanel(): React.ReactNode;
}
export default HeadlineConfigurationPanel;
//# sourceMappingURL=HeadlineConfigurationPanel.d.ts.map