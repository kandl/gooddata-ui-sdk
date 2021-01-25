// (C) 2019-2020 GoodData Corporation
import * as React from "react";
import { IFluidLayoutColumnMethods } from "@gooddata/sdk-backend-spi";
import { DashboardLayoutColumnRenderer } from "./DashboardLayoutColumnRenderer";
import { DashboardLayoutRowHeader } from "./DashboardLayoutRowHeader";
import { IDashboardViewLayoutRowHeaderRenderProps } from "./interfaces/dashboardLayoutComponents";
import { FluidLayoutColumnRenderer } from "../FluidLayout/FluidLayoutColumnRenderer";

const emptyColumnFacadeWithFullSize: IFluidLayoutColumnMethods<any> = {
    index: () => 0,
    raw: () => null,
    content: () => null,
    row: () => undefined,
    style: () => undefined,
    size: () => ({ xl: { widthAsGridColumnsCount: 12 } }),
};

export function DashboardLayoutRowHeaderRenderer<TCustomContent>(
    props: IDashboardViewLayoutRowHeaderRenderProps<TCustomContent>,
): JSX.Element {
    const { row, screen } = props;
    const rowHeader = row.header();

    return rowHeader ? (
        <DashboardLayoutColumnRenderer
            DefaultRenderer={FluidLayoutColumnRenderer}
            column={emptyColumnFacadeWithFullSize}
            screen={screen}
        >
            <DashboardLayoutRowHeader title={rowHeader.title} description={rowHeader.description} />
        </DashboardLayoutColumnRenderer>
    ) : null;
}
