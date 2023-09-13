/// <reference types="react" />
import { InputProps, GroupHeadingProps, OptionProps, MenuListProps, NoticeProps } from "react-select";
import { ISelectErrorOption, ISelectOption } from "./types.js";
export declare const EmptyRenderer: () => JSX.Element;
export declare const LoadingMessageRenderer: () => JSX.Element;
export declare const NoOptionsMessageRenderer: (props: NoticeProps) => JSX.Element;
export declare const MenuListRendered: (props: MenuListProps<ISelectOption, false>) => JSX.Element;
export declare const InputRendered: (props: InputProps) => JSX.Element;
export declare const ErrorOptionRenderer: (errorOption: ISelectErrorOption) => JSX.Element;
export declare const OptionRenderer: (props: OptionProps<ISelectOption, false>) => JSX.Element;
export declare const GroupHeadingRenderer: (props: GroupHeadingProps) => JSX.Element;
//# sourceMappingURL=AsyncSelectComponents.d.ts.map