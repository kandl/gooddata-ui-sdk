// (C) 2019-2021 GoodData Corporation
import invariant from "ts-invariant";
import { IFluidLayoutColumnFacade } from "../facade/interfaces";
import {
    IFluidLayoutColumn,
    IFluidLayoutRow,
    IFluidLayoutSizeByScreen,
    isFluidLayoutColumn,
} from "../fluidLayout";
import {
    FluidLayoutColumnModifications,
    IFluidLayoutColumnBuilder,
    IFluidLayoutRowBuilder,
    ValueOrUpdateCallback,
} from "./interfaces";
import { resolveValueOrUpdateCallback } from "./utils";

/**
 * @alpha
 */
export class FluidLayoutColumnBuilder<TContent> implements IFluidLayoutColumnBuilder<TContent> {
    protected constructor(
        protected setRow: (valueOrUpdateCallback: ValueOrUpdateCallback<IFluidLayoutRow<TContent>>) => void,
        protected getColumnFacade: () => IFluidLayoutColumnFacade<TContent>,
        protected columnIndex: number,
    ) {}

    /**
     * Creates an instance of FluidLayoutColumnBuilder for particular layout column.
     *
     * @param column - column to modify
     */
    public static for<TContent>(
        rowBuilder: IFluidLayoutRowBuilder<TContent>,
        columnIndex: number,
    ): IFluidLayoutColumnBuilder<TContent> {
        invariant(
            isFluidLayoutColumn(rowBuilder.facade().columns().column(columnIndex)?.raw()),
            "Provided data must be IFluidLayoutColumn!",
        );
        return new FluidLayoutColumnBuilder(
            rowBuilder.setRow,
            () => rowBuilder.facade().columns().column(columnIndex)!,
            columnIndex,
        );
    }

    public size(valueOrUpdateCallback: ValueOrUpdateCallback<IFluidLayoutSizeByScreen>): this {
        this.setColumn((column) => ({
            ...column,
            size: resolveValueOrUpdateCallback(valueOrUpdateCallback, column.size),
        }));
        return this;
    }

    public content(valueOrUpdateCallback: ValueOrUpdateCallback<TContent | undefined>): this {
        this.setColumn((column) => ({
            ...column,
            content: resolveValueOrUpdateCallback(valueOrUpdateCallback, column.content),
        }));
        return this;
    }

    public setColumn = (valueOrUpdateCallback: ValueOrUpdateCallback<IFluidLayoutColumn<TContent>>): this => {
        this.setRow((row) => {
            const updatedColumns = [...row.columns];
            updatedColumns[this.columnIndex] = resolveValueOrUpdateCallback(
                valueOrUpdateCallback,
                this.build(),
            );
            return {
                ...row,
                columns: updatedColumns,
            };
        });
        return this;
    };

    public modify(modifications: FluidLayoutColumnModifications<TContent>): this {
        modifications(this, this.facade());
        return this;
    }

    public build(): IFluidLayoutColumn<TContent> {
        return this.facade().raw();
    }

    public facade(): IFluidLayoutColumnFacade<TContent> {
        return this.getColumnFacade();
    }
}
