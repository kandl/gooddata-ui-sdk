// (C) 2020-2022 GoodData Corporation
import React, { PureComponent } from "react";
import cx from "classnames";
import { Button } from "../Button/index.js";
import { ENUM_KEY_CODE } from "../typings/utilities.js";
import noop from "lodash/noop.js";
const checkKeyHandler = (event, keyCode, handler) => {
    if (event.keyCode === keyCode && handler) {
        event.preventDefault();
        event.stopPropagation();
        handler();
    }
};
const shouldSubmitOnEnterPress = ({ target }) => {
    const { tagName, type } = target;
    const tagNameInLowercase = tagName.toLowerCase();
    const typeInLowercase = type ? type.toLowerCase() : "";
    return (tagNameInLowercase === "textarea" ||
        (tagNameInLowercase === "input" && (typeInLowercase === "text" || typeInLowercase === "number")));
};
/**
 * @internal
 */
class DialogBase extends PureComponent {
    constructor() {
        super(...arguments);
        this.onKeyDown = (event) => {
            const { submitOnEnterKey, onCancel, onSubmit } = this.props;
            // don't call onSubmit when pressing enter key on input fields
            const isEnterKeyDownOnInputField = event.keyCode === ENUM_KEY_CODE.KEY_CODE_ENTER && shouldSubmitOnEnterPress(event);
            if (submitOnEnterKey === false && isEnterKeyDownOnInputField) {
                return;
            }
            checkKeyHandler(event, ENUM_KEY_CODE.KEY_CODE_ENTER, onSubmit);
            checkKeyHandler(event, ENUM_KEY_CODE.KEY_CODE_ESCAPE, onCancel);
        };
    }
    getDialogClasses(additionalClassName) {
        return cx("overlay", "gd-dialog", additionalClassName, this.props.className);
    }
    renderCloseButton() {
        return (React.createElement("div", { className: "gd-dialog-close" },
            React.createElement(Button, { className: "gd-button-link gd-button-icon-only gd-icon-cross s-dialog-close-button", value: "", onClick: this.props.onClose || this.props.onCancel })));
    }
    render() {
        const dialogClasses = this.getDialogClasses();
        return (React.createElement("div", { tabIndex: 0, onKeyDown: this.onKeyDown },
            React.createElement("div", { className: dialogClasses },
                this.props.displayCloseButton ? this.renderCloseButton() : null,
                this.props.children)));
    }
}
DialogBase.defaultProps = {
    children: false,
    className: "",
    displayCloseButton: false,
    submitOnEnterKey: true,
    onCancel: noop,
    onSubmit: noop,
};
export { DialogBase };
//# sourceMappingURL=DialogBase.js.map