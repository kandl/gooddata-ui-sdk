import { ISelectItem, ISelectItemOption } from "./types.js";
export declare const itemToString: <V>(item: ISelectItem<V>) => string;
export declare const getSelectableItems: <V>(selectItems: ISelectItem<V>[]) => ISelectItemOption<V>[];
