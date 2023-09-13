// (C) 2019-2022 GoodData Corporation
import React from "react";
import { Button } from "@gooddata/sdk-ui-kit";
import { injectIntl } from "react-intl";
import { getTranslation } from "../../../../utils/translations.js";
import { messages } from "../../../../../locales.js";
class CustomColorButton extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            this.props.onClick();
        };
    }
    render() {
        return (React.createElement("div", { className: "gd-color-drop-down-custom-section" },
            React.createElement(Button, { value: getTranslation(messages.customColor.id, this.props.intl), className: "gd-button-link gd-color-drop-down-custom-section-button s-custom-section-button", onClick: this.onClick })));
    }
}
export default injectIntl(CustomColorButton);
//# sourceMappingURL=CustomColorButton.js.map