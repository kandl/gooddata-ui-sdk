// (C) 2020-2022 GoodData Corporation
import React, { useCallback, useEffect, useState } from "react";
import cx from "classnames";
import isEmpty from "lodash/isEmpty.js";
import { FormattedMessage } from "react-intl";
import { Bubble } from "../../../../Bubble/index.js";
import { v4 } from "uuid";
const VALID_INPUT = "^[0-9]+[.,]?[0-9]*$";
const bubbleAlignPoints = [{ align: "bl tl" }];
const bubbleArrowOffsets = { "bl tl": [0, 10] };
const validHeight = (height) => {
    return parseFloat(height) === 0 || height.endsWith(".") ? false : true;
};
/**
 * @internal
 */
export const NumericInput = (props) => {
    const { value, onValueChanged } = props;
    const [validPressedButton, setValidPressedButton] = useState(true);
    const [anchorId] = useState(`numeric-input-id-${v4()}`);
    useEffect(() => {
        if (!validPressedButton) {
            setTimeout(() => setValidPressedButton(true), 2000);
        }
    }, [validPressedButton]);
    const handleHeightInputChange = useCallback((e) => {
        const val = e.target.value.replace(/,/, ".");
        if (val.match(VALID_INPUT)) {
            onValueChanged(val);
        }
        else if (isEmpty(val)) {
            onValueChanged("");
        }
    }, [onValueChanged]);
    const correctKeyPressed = useCallback((e) => {
        const value = e.target.value.replace(/,/, ".");
        setValidPressedButton((value.match(VALID_INPUT) || isEmpty(value)) && value.split(".").length <= 2 ? true : false);
    }, []);
    const onChanged = useCallback((e) => {
        correctKeyPressed(e);
        handleHeightInputChange(e);
    }, [handleHeightInputChange, correctKeyPressed]);
    return (React.createElement("label", { className: "gd-input" },
        React.createElement("div", { className: cx("gd-input-wrapper", anchorId) },
            React.createElement("input", { className: cx("gd-input-field s-embed-dialog-custom-height", {
                    "gd-embed-input-numeric-invalid": !validHeight(value),
                }), type: "text", value: value, onChange: onChanged })),
        !validHeight(value) && (React.createElement(Bubble, { alignTo: `.${anchorId}`, alignPoints: bubbleAlignPoints, arrowOffsets: bubbleArrowOffsets, className: "bubble-negative" },
            React.createElement(FormattedMessage, { id: "embed.dialog.numeric.input.validation" }))),
        !validPressedButton && (React.createElement(Bubble, { alignTo: `.${anchorId}`, alignPoints: bubbleAlignPoints, arrowOffsets: bubbleArrowOffsets, className: "bubble-warning" },
            React.createElement(FormattedMessage, { id: "embed.dialog.numeric.input.warning" })))));
};
//# sourceMappingURL=NumericInput.js.map