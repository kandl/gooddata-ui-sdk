// (C) 2007-2020 GoodData Corporation
import React from "react";
import cx from "classnames";
import { IDashboardViewLayoutRowRenderProps } from "./interfaces/dashboardLayoutComponents";

export function DashboardLayoutRowRenderer<TCustomContent>(
    props: IDashboardViewLayoutRowRenderProps<TCustomContent>,
): JSX.Element {
    const { debug, className, children, DefaultRenderer } = props;
    return (
        <DefaultRenderer
            {...props}
            className={cx(["gd-fluidlayout-row", "s-fluid-layout-row", className], {
                "gd-fluidlayout-row-debug": debug,
            })}
        >
            {children}
        </DefaultRenderer>
    );
}
