// (C) 2019-2022 GoodData Corporation
import React, { useCallback, useState } from "react";
import { Bubble, EditableLabel } from "@gooddata/sdk-ui-kit";
import { useIntl } from "react-intl";
const BUBBLE_ALIGN_POINTS = [{ align: "bl tl" }];
const ARROW_OFFSETS = { "bl tl": [0, 7] };
const BUBBLE_STYLE = "bubble-primary";
export function EditableLabelWithBubble({ onEditingStart, maxLength, value, warningLimit, onCancel, alignTo, className, maxRows, placeholderMessage, children, onSubmit, }) {
    const intl = useIntl();
    const [currentValue, setCurrentValue] = useState(value);
    const [editing, setEditing] = useState(false);
    const charactersCountLeft = maxLength - currentValue.length;
    const maximumCharactersCount = maxLength;
    const bubbleMessage = intl.formatMessage({ id: "layout.header.characters.left" }, { currentCharactersCount: charactersCountLeft, maximumCharactersCount });
    const currentValueLength = currentValue.length;
    const isBubbleVisible = editing && maxLength - currentValueLength <= warningLimit;
    const onStart = useCallback(() => {
        setEditing(true);
        onEditingStart === null || onEditingStart === void 0 ? void 0 : onEditingStart();
    }, [onEditingStart]);
    const onCancelCallback = useCallback(() => {
        setEditing(false);
        setCurrentValue(value);
        onCancel === null || onCancel === void 0 ? void 0 : onCancel();
    }, [onCancel, value]);
    const onSubmitCallback = useCallback((newValue) => {
        setEditing(false);
        setCurrentValue(newValue);
        onSubmit(newValue);
    }, [onSubmit]);
    const onChange = useCallback((newValue) => {
        setCurrentValue(newValue);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(EditableLabel, { className: className, maxRows: maxRows, value: value, maxLength: maxLength, placeholder: placeholderMessage, onEditingStart: onStart, onCancel: onCancelCallback, onChange: onChange, onSubmit: onSubmitCallback }, children),
        isBubbleVisible ? (React.createElement(Bubble, { alignTo: alignTo, className: BUBBLE_STYLE, alignPoints: BUBBLE_ALIGN_POINTS, arrowOffsets: ARROW_OFFSETS }, bubbleMessage)) : null));
}
//# sourceMappingURL=EditableLabelWithBubble.js.map