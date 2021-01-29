// (C) 2007-2020 GoodData Corporation
import React from "react";
import { ResponsiveScreenType, IFluidLayoutRowMethods } from "@gooddata/sdk-backend-spi";
import {
    IFluidLayoutColumnKeyGetter,
    IFluidLayoutColumnRenderer,
    IFluidLayoutContentRenderer,
    IFluidLayoutRowKeyGetter,
    IFluidLayoutRowRenderer,
    IFluidLayoutRowHeaderRenderer,
} from "./interfaces";
import { Row } from "react-grid-system";

/**
 * @alpha
 */
export interface IFluidLayoutRowProps<TContent> {
    row: IFluidLayoutRowMethods<TContent>;
    rowKeyGetter?: IFluidLayoutRowKeyGetter<TContent>;
    rowRenderer?: IFluidLayoutRowRenderer<TContent>;
    rowHeaderRenderer?: IFluidLayoutRowHeaderRenderer<TContent>;
    columnKeyGetter?: IFluidLayoutColumnKeyGetter<TContent>;
    columnRenderer?: IFluidLayoutColumnRenderer<TContent>;
    contentRenderer?: IFluidLayoutContentRenderer<TContent>;
    screen: ResponsiveScreenType;
}

export const FluidLayoutRowRenderer: IFluidLayoutRowRenderer<any> = (props) => {
    const { children, className } = props;
    return <Row className={className}>{children}</Row>;
};
