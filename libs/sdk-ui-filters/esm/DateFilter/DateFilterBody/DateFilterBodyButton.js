// (C) 2019 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { Button } from "@gooddata/sdk-ui-kit";
const DateFilterBodyButtonComponent = (props) => (React.createElement(Button, { type: "button", value: props.intl.formatMessage({ id: props.messageId }), className: props.className, disabled: props.disabled, onClick: props.onClick }));
export const DateFilterBodyButton = injectIntl(DateFilterBodyButtonComponent);
//# sourceMappingURL=DateFilterBodyButton.js.map