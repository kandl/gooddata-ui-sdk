import React from "react";
import { IPlaceholder } from "./base.js";
/**
 * @internal
 */
export type PlaceholdersState = {
    placeholders: Record<string, IPlaceholder<any>>;
};
/**
 * @internal
 */
interface IPlaceholdersContextState {
    state: PlaceholdersState;
    updateState: (callback: (state: PlaceholdersState) => PlaceholdersState) => void;
}
/**
 * @internal
 */
export declare const usePlaceholdersContext: () => IPlaceholdersContextState;
/**
 * Props of the {@link PlaceholdersProvider} component.
 * @public
 */
export interface IPlaceholdersProviderProps {
    children: React.ReactNode;
    initialValues?: [IPlaceholder<any>, any][];
}
/**
 * Wraps component into a PlaceholdersContext consumer enabling the children of this to access the current
 * placeholders state.
 *
 * @public
 */
export declare function PlaceholdersProvider(props: IPlaceholdersProviderProps): JSX.Element;
export {};
//# sourceMappingURL=context.d.ts.map