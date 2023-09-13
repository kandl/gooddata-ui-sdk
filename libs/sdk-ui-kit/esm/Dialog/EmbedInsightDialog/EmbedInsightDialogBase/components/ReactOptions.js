// (C) 2023 GoodData Corporation
import React, { useCallback } from "react";
import { CodeLanguageSelect } from "./CodeLanguageSelect.js";
import { CodeOptions } from "./CodeOptions.js";
import { ComponentTypeSelect } from "./ComponentTypeSelect.js";
export const ReactOptions = (props) => {
    const { option, onChange } = props;
    const onComponentTypeChanged = useCallback((componentType) => {
        const opt = Object.assign(Object.assign({}, option), { componentType });
        onChange(opt);
    }, [option, onChange]);
    const onLanguageChanged = useCallback((codeType) => {
        const opt = Object.assign(Object.assign({}, option), { codeType });
        onChange(opt);
    }, [option, onChange]);
    return (React.createElement(React.Fragment, null,
        React.createElement(ComponentTypeSelect, { selectedComponentType: option.componentType, onComponentTypeChanged: onComponentTypeChanged }),
        React.createElement(CodeLanguageSelect, { selectedLanguage: option.codeType, onLanguageChanged: onLanguageChanged }),
        React.createElement(CodeOptions, { option: option, onChange: onChange })));
};
//# sourceMappingURL=ReactOptions.js.map