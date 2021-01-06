// (C) 2007-2021 GoodData Corporation
import { IFluidLayoutSizeByScreen, IWidget } from "@gooddata/sdk-backend-spi";
import {
    IDashboardViewLayout,
    IDashboardViewLayoutColumn,
    IDashboardViewLayoutContent,
} from "./interfaces/dashboardLayout";
import { DashboardViewLayoutWidgetClass } from "./interfaces/dashboardLayoutSizing";

export type DashboardLayoutRowMock<TCustomContent> = {
    title?: string;
    description?: string;
    columns: Array<[IDashboardViewLayoutContent<TCustomContent>, IFluidLayoutSizeByScreen?]>;
};

export const dashboardWidgetMock = (
    id: string,
    widgetClass: DashboardViewLayoutWidgetClass = "bar",
): IWidget => {
    return {
        description: "",
        drills: [],
        ignoreDashboardFilters: [],
        identifier: id,
        ref: {
            identifier: id,
        },
        title: `${widgetClass} ${id}`,
        type: widgetClass === "kpi" ? "kpi" : "insight",
        uri: id,
    };
};

export const dashboardRowMock = <TCustomContent>(
    columns: Array<[IDashboardViewLayoutContent<TCustomContent>, IFluidLayoutSizeByScreen?]>,
    title?: string,
    description?: string,
): DashboardLayoutRowMock<TCustomContent> => {
    return {
        columns,
        title,
        description,
    };
};

export const dashboardLayoutMock = <TCustomContent>(
    rowMocks: DashboardLayoutRowMock<TCustomContent>[],
): IDashboardViewLayout<TCustomContent> => {
    const emptyLayout: IDashboardViewLayout<TCustomContent> = {
        type: "fluidLayout",
        rows: [],
    };

    return rowMocks.reduce((acc: IDashboardViewLayout<TCustomContent>, rowMock, rowIndex) => {
        if (!acc.rows[rowIndex]) {
            acc.rows[rowIndex] = {
                columns: [],
                ...(rowMock.title || rowMock.description
                    ? {
                          header: {
                              title: rowMock.title,
                              description: rowMock.description,
                          },
                      }
                    : {}),
            };
        }

        return rowMock.columns.reduce(
            (
                acc2: IDashboardViewLayout<TCustomContent>,
                [content, size = { xl: { widthAsGridColumnsCount: 12 } }],
                columnIndex,
            ) => {
                const column: IDashboardViewLayoutColumn<TCustomContent> = {
                    size,
                    content,
                };
                acc2.rows[rowIndex].columns[columnIndex] = column;
                return acc2;
            },
            acc,
        );
    }, emptyLayout);
};

export const allWidgetClasses: DashboardViewLayoutWidgetClass[] = [
    "alluvial",
    "area",
    "bar",
    "bubble",
    "bullet",
    "column",
    "combo",
    "combo2",
    "donut",
    "funnel",
    "geo",
    "headline",
    "heatmap",
    "histogram",
    "line",
    "pareto",
    "pushpin",
    "pie",
    "scatter",
    "table",
    "treemap",
    "waterfall",
    "xirr",
    "kpi",
];
