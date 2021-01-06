// (C) 2007-2020 GoodData Corporation
import React from "react";
import {
    IFluidLayoutColumn,
    IFluidLayoutRow,
    ResponsiveScreenType,
    IFluidLayoutColumnMethods,
} from "@gooddata/sdk-backend-spi";
import { IFluidLayoutColumnRenderer, IFluidLayoutContentRenderer } from "./interfaces";
import { FluidLayoutColumnRenderer } from "./FluidLayoutColumnRenderer";

/**
 * @alpha
 */
export interface IFluidLayoutColumnProps<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> {
    column: IFluidLayoutColumnMethods<TContent, TColumn, TRow>;
    screen: ResponsiveScreenType;
    columnRenderer?: IFluidLayoutColumnRenderer<TContent, TColumn, TRow>;
    contentRenderer: IFluidLayoutContentRenderer<TContent, TColumn, TRow>;
}

export function FluidLayoutColumn<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
>(props: IFluidLayoutColumnProps<TContent, TColumn, TRow>): JSX.Element {
    const {
        column,
        columnRenderer: ColumnRenderer = FluidLayoutColumnRenderer,
        contentRenderer: ContentRenderer,
        screen,
    } = props;

    const renderProps = { column, screen };

    return (
        <ColumnRenderer {...renderProps} DefaultRenderer={FluidLayoutColumnRenderer}>
            <ContentRenderer {...renderProps} />
        </ColumnRenderer>
    );
}
