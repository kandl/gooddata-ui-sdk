// (C) 2019-2021 GoodData Corporation
import { IFluidLayoutRow, IFluidLayoutColumn, IFluidLayout } from "@gooddata/sdk-backend-spi";
import {
    IFluidLayoutColumnRenderer,
    IFluidLayoutContentRenderer,
    IFluidLayoutRowRenderer,
} from "../interfaces";
import { fluidLayoutMock, fluidLayoutRowMock } from "../mocks";

export type TextLayoutContent = string;
export type TextLayoutColumn = IFluidLayoutColumn<TextLayoutContent>;
export type TextLayoutRow = IFluidLayoutRow<TextLayoutContent, TextLayoutColumn>;
export type TextLayout = IFluidLayout<TextLayoutContent, TextLayoutColumn, TextLayoutRow>;

export type TextLayoutColumnRenderer = IFluidLayoutColumnRenderer<
    TextLayoutContent,
    TextLayoutColumn,
    TextLayoutRow
>;
export type TextLayoutContentRenderer = IFluidLayoutContentRenderer<
    TextLayoutContent,
    TextLayoutColumn,
    TextLayoutRow
>;
export type TextLayoutRowRenderer = IFluidLayoutRowRenderer<
    TextLayoutContent,
    TextLayoutColumn,
    TextLayoutRow
>;

export const createArrayWithSize = (size: number): any[] => Array.from(new Array(size));

export const fluidLayoutWithOneColumn = fluidLayoutMock([fluidLayoutRowMock([["Test"]])]);

export const createFluidLayoutMock = (columnsCountInRow: number[]): TextLayout =>
    fluidLayoutMock(
        columnsCountInRow.map((columnsCount) =>
            fluidLayoutRowMock(createArrayWithSize(columnsCount).map(() => ["Test"])),
        ),
    );
