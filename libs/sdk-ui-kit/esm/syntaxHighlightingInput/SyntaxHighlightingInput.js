// (C) 2020-2023 GoodData Corporation
import React, { useRef, useEffect } from "react";
import cx from "classnames";
import CodeMirror from "codemirror";
// eslint-disable-next-line import/no-unassigned-import
import "codemirror/addon/mode/simple.js";
// eslint-disable-next-line import/no-unassigned-import
import "codemirror/addon/edit/matchbrackets.js";
// eslint-disable-next-line import/no-unassigned-import
import "codemirror/addon/display/placeholder.js";
const CODE_MIRROR_EOL = "\n";
const defaultOptions = {
    autofocus: false,
    lineWrapping: true,
    matchBrackets: true,
};
const findCursorIndexAcrossMultipleLines = (text, cursorLineIndex, cursorLineCharacterIndex) => {
    const getLineLengthToCursor = (line, lineIndex) => {
        if (lineIndex > cursorLineIndex) {
            return 0;
        }
        return lineIndex < cursorLineIndex ? line.length + CODE_MIRROR_EOL.length : cursorLineCharacterIndex;
    };
    return text
        .split(CODE_MIRROR_EOL)
        .map(getLineLengthToCursor)
        .reduce((sum, lineLength) => sum + lineLength, 0);
};
/**
 * @internal
 */
export const SyntaxHighlightingInput = (props) => {
    const { value, onChange, onCursor, customOptions, className, formatting } = props;
    const ref = useRef();
    const view = useRef();
    const reportCursorPosition = (editor) => {
        if (onCursor) {
            const from = editor.getCursor("from");
            const to = editor.getCursor("to");
            const currentValue = editor.getValue();
            onCursor(findCursorIndexAcrossMultipleLines(currentValue, from.line, from.ch), findCursorIndexAcrossMultipleLines(currentValue, to.line, to.ch));
        }
    };
    const handleOnChange = () => {
        onChange(view.current.getValue());
    };
    useEffect(() => {
        CodeMirror.defineSimpleMode("syntaxHighlight", formatting);
        view.current = CodeMirror(ref.current, Object.assign(Object.assign(Object.assign({}, customOptions), defaultOptions), { mode: "syntaxHighlight", value }));
        view.current.on("change", handleOnChange);
        view.current.on("cursorActivity", reportCursorPosition);
        return () => {
            view.current.off("change", handleOnChange);
            view.current.off("cursorActivity", reportCursorPosition);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const cursor = view.current.getCursor();
        view.current.setValue(value);
        view.current.setCursor(cursor);
    }, [value]);
    return React.createElement("div", { className: cx(className, "gd-input-syntax-highlighting-input"), ref: ref });
};
//# sourceMappingURL=SyntaxHighlightingInput.js.map