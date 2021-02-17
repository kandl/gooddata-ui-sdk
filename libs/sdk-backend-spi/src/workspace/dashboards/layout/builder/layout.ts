// (C) 2019-2021 GoodData Corporation
import invariant from "ts-invariant";
import difference from "lodash/difference";
import isArray from "lodash/isArray";
import identity from "lodash/identity";
import { UnexpectedError } from "../../../../errors/index";
import { IFluidLayoutFacade } from "../facade/interfaces";
import { FluidLayoutFacade } from "../facade/layout";
import { IFluidLayout, IFluidLayoutRow, IFluidLayoutSize, isFluidLayout } from "../fluidLayout";
import {
    FluidLayoutModifications,
    FluidLayoutRowModifications,
    FluidLayoutRowsSelector,
    IFluidLayoutBuilder,
    IFluidLayoutRowBuilder,
    ValueOrUpdateCallback,
} from "./interfaces";
import { FluidLayoutRowBuilder } from "./row";
import { resolveValueOrUpdateCallback } from "./utils";

/**
 * @alpha
 */
export class FluidLayoutBuilder<TContent> implements IFluidLayoutBuilder<TContent> {
    protected constructor(
        protected layoutFacade: IFluidLayoutFacade<TContent>,
        protected layoutFacadeConstructor: (layout: IFluidLayout<TContent>) => IFluidLayoutFacade<TContent>,
        protected getRowBuilder: (rowIndex: number) => IFluidLayoutRowBuilder<TContent>,
    ) {}

    /**
     * Creates an instance of FluidLayoutBuilder for particular layout.
     *
     * @param layout - layout to modify
     */
    public static for<TContent>(layout: IFluidLayout<TContent>): IFluidLayoutBuilder<TContent> {
        invariant(isFluidLayout(layout), "Provided data must be IFluidLayout!");
        const fluidLayoutBuilder: IFluidLayoutBuilder<TContent> = new FluidLayoutBuilder(
            FluidLayoutFacade.for(layout),
            FluidLayoutFacade.for,
            getRowBuilder,
        );

        function getRowBuilder(rowIndex: number): IFluidLayoutRowBuilder<TContent> {
            return FluidLayoutRowBuilder.for(fluidLayoutBuilder, rowIndex);
        }

        return fluidLayoutBuilder;
    }

    /**
     * Creates an instance of FluidLayoutBuilder with empty layout.
     */
    public static forNewLayout<TContent>(): IFluidLayoutBuilder<TContent> {
        const emptyFluidLayout: IFluidLayout<TContent> = {
            type: "fluidLayout",
            rows: [],
        };
        return FluidLayoutBuilder.for(emptyFluidLayout);
    }

    public size(valueOrUpdateCallback: ValueOrUpdateCallback<IFluidLayoutSize | undefined>): this {
        return this.setLayout((layout) => ({
            ...layout,
            size: resolveValueOrUpdateCallback(valueOrUpdateCallback, this.facade().size()),
        }));
    }

    public addRow(
        create: FluidLayoutRowModifications<TContent> = identity,
        index: number = this.facade().rows().count(),
    ): this {
        const emptyFluidRow: IFluidLayoutRow<TContent> = {
            columns: [],
        };
        this.setLayout((layout) => {
            const updatedRows = [...layout.rows];
            updatedRows.splice(index, 0, emptyFluidRow);
            return {
                ...layout,
                rows: updatedRows,
            };
        });
        this.getRowBuilder(index).modify(create);
        return this;
    }

    public modifyRow(index: number, modify: FluidLayoutRowModifications<TContent>): this {
        const rowFacade = this.facade().rows().row(index);
        if (!rowFacade) {
            throw new UnexpectedError(`Cannot modify the row - row at index ${index} does not exist!`);
        }
        this.getRowBuilder(index).modify(modify);
        return this;
    }

    public removeRow(index: number): this {
        const rowFacade = this.facade().rows().row(index);
        if (!rowFacade) {
            throw new UnexpectedError(`Cannot remove the row - row at index ${index} does not exist!`);
        }
        return this.setLayout((layout) => {
            const updatedRows = [...layout.rows];
            updatedRows.splice(index, 1);
            return {
                ...layout,
                rows: updatedRows,
            };
        });
    }

    public moveRow(fromIndex: number, toIndex: number): this {
        const row = this.facade().rows().row(fromIndex)?.raw();
        if (!row) {
            throw new UnexpectedError(`Cannot move the row - row at index ${fromIndex} does not exist!`);
        }
        this.removeRow(fromIndex);
        this.addRow((r) => r.setRow(row), toIndex);
        return this;
    }

    public removeRows(selector: FluidLayoutRowsSelector<TContent> = (rows) => rows.all()): this {
        const rowsToRemove = selector(this.facade().rows());
        if (isArray(rowsToRemove)) {
            this.setLayout((layout) => {
                const updatedRows = difference(
                    layout.rows,
                    rowsToRemove.map((r) => r.raw()),
                );
                return {
                    ...layout,
                    rows: updatedRows,
                };
            });
        } else if (rowsToRemove) {
            this.removeRow(rowsToRemove.index());
        }
        return this;
    }

    public removeEmptyRows(): this {
        return this.removeRows((rows) => rows.filter((row) => row.isEmpty()));
    }

    public modifyRows(
        modify: FluidLayoutRowModifications<TContent>,
        selector: FluidLayoutRowsSelector<TContent> = (rows) => rows.all(),
    ): this {
        const rowsToModify = selector(this.facade().rows());
        if (isArray(rowsToModify)) {
            rowsToModify.forEach((row) => {
                this.modifyRow(row.index(), modify);
            });
        } else if (rowsToModify) {
            this.modifyRow(rowsToModify.index(), modify);
        }
        return this;
    }

    public setLayout = (valueOrUpdateCallback: ValueOrUpdateCallback<IFluidLayout<TContent>>): this => {
        const updatedLayout = resolveValueOrUpdateCallback(valueOrUpdateCallback, this.build());
        this.layoutFacade = this.layoutFacadeConstructor(updatedLayout);
        return this;
    };

    public facade(): IFluidLayoutFacade<TContent> {
        return this.layoutFacade;
    }

    public modify(modifications: FluidLayoutModifications<TContent>): this {
        modifications(this, this.facade());
        return this;
    }

    public build(): IFluidLayout<TContent> {
        return this.layoutFacade.raw();
    }
}
