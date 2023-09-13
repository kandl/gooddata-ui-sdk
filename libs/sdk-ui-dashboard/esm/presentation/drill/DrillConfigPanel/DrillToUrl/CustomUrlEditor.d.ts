import React from "react";
import { IntlShape } from "react-intl";
import { UrlDrillTarget } from "../../types.js";
import { IAttributeWithDisplayForm } from "./types.js";
export interface IUrlInputProps {
    currentUrlValue: string;
    onChange: (value: string) => void;
    onCursor: (from: number, to: number) => void;
    syntaxHighlightingRules?: IFormattingRules;
    intl: IntlShape;
}
export declare const UrlInput: React.FC<IUrlInputProps>;
interface IFormattingRule {
    regex: RegExp;
    token: string;
}
interface IFormattingRules {
    start: IFormattingRule[];
}
export interface CustomUrlEditorProps {
    urlDrillTarget?: UrlDrillTarget;
    attributeDisplayForms?: IAttributeWithDisplayForm[];
    loadingAttributeDisplayForms?: boolean;
    invalidAttributeDisplayFormIdentifiers: string[];
    documentationLink?: string;
    enableClientIdParameter: boolean;
    enableDataProductIdParameter: boolean;
    enableWidgetIdParameter: boolean;
    onClose: () => void;
    onSelect: (customUrl: string) => void;
}
export declare const CustomUrlEditor: React.FC<CustomUrlEditorProps>;
export {};
