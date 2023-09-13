import { RelativeIndex } from "../types/layoutTypes.js";
import { Draft } from "@reduxjs/toolkit";
export declare function addArrayElements<T>(arr: Draft<T[]>, index: RelativeIndex, items: Draft<T[]>): void;
export declare function removeArrayElement<T>(arr: Draft<T[]>, index: RelativeIndex): Draft<T> | undefined;
export declare function moveArrayElement<T>(arr: Draft<T[]>, fromIndex: number, toIndex: RelativeIndex): void;
/**
 * Given array and a relative index, this function will return the absolute index of that item.
 */
export declare function resolveRelativeIndex<T>(arr: T[], index: RelativeIndex): number;
/**
 * Given array and a relative index of a new array item to place, this function will return the absolute index
 * where the new item _will be_ placed.
 */
export declare function resolveIndexOfNewItem<T>(arr: T[], index: RelativeIndex): number;
