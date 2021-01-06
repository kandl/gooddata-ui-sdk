// (C) 2007-2020 GoodData Corporation
import React from "react";
import {
    IFluidLayoutColumn,
    IFluidLayoutRow,
    ResponsiveScreenType,
    IFluidLayoutRowMethods,
} from "@gooddata/sdk-backend-spi";
import {
    IFluidLayoutColumnKeyGetter,
    IFluidLayoutColumnRenderer,
    IFluidLayoutContentRenderer,
    IFluidLayoutRowKeyGetter,
    IFluidLayoutRowRenderer,
    IFluidLayoutRowHeaderRenderer,
} from "./interfaces";
import { FluidLayoutColumn } from "./FluidLayoutColumn";
import { FluidLayoutRowRenderer } from "./FluidLayoutRowRenderer";

/**
 * @alpha
 */
export interface IFluidLayoutRowProps<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> {
    row: IFluidLayoutRowMethods<TContent, TColumn, TRow>;
    rowKeyGetter?: IFluidLayoutRowKeyGetter<TContent, TColumn, TRow>;
    rowRenderer?: IFluidLayoutRowRenderer<TContent, TColumn, TRow>;
    rowHeaderRenderer?: IFluidLayoutRowHeaderRenderer<TContent, TColumn, TRow>;
    columnKeyGetter?: IFluidLayoutColumnKeyGetter<TContent, TColumn, TRow>;
    columnRenderer?: IFluidLayoutColumnRenderer<TContent, TColumn, TRow>;
    contentRenderer?: IFluidLayoutContentRenderer<TContent, TColumn, TRow>;
    screen: ResponsiveScreenType;
}

export function FluidLayoutRow<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
>(props: IFluidLayoutRowProps<TContent, TColumn, TRow>): JSX.Element {
    const {
        row,
        rowRenderer: RowRenderer = FluidLayoutRowRenderer,
        rowHeaderRenderer: RowHeaderRenderer,
        columnKeyGetter = ({ column }) => column.index(),
        columnRenderer,
        contentRenderer,
        screen,
    } = props;
    const renderProps = { row, screen };

    const columns = row.columns().map((column) => {
        return (
            <FluidLayoutColumn
                key={columnKeyGetter({ column, screen })}
                column={column}
                columnRenderer={columnRenderer}
                contentRenderer={contentRenderer}
                screen={screen}
            />
        );
    });

    return (
        <RowRenderer {...renderProps} DefaultRenderer={FluidLayoutRowRenderer}>
            {RowHeaderRenderer && <RowHeaderRenderer row={row} screen={screen} />}
            {columns}
        </RowRenderer>
    );
}
