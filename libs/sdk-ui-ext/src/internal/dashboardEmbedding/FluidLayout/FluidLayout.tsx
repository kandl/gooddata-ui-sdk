// (C) 2007-2020 GoodData Corporation
import React, { useMemo } from "react";
import { Container, ScreenClassProvider, ScreenClassRender } from "react-grid-system";
import {
    IFluidLayoutColumn,
    IFluidLayoutRow,
    ResponsiveScreenType,
    FluidLayoutFacade,
} from "@gooddata/sdk-backend-spi";
import { FluidLayoutRow } from "./FluidLayoutRow";
import { IFluidLayoutRenderer } from "./interfaces";

/**
 * @alpha
 */
export type IFluidLayoutProps<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
> = IFluidLayoutRenderer<TContent, TColumn, TRow>;

/**
 * FluidLayout component takes fluid layout with any content,
 * and renders it on top of react-grid-system.
 * You can modify/extend rendering for any part of the layout (row/column/content)
 * by passing custom renderers.
 *
 * @alpha
 */
export function FluidLayout<
    TContent,
    TColumn extends IFluidLayoutColumn<TContent>,
    TRow extends IFluidLayoutRow<TContent, TColumn>
>(props: IFluidLayoutProps<TContent, TColumn, TRow>): JSX.Element {
    const {
        layout,
        rowKeyGetter = ({ row }) => row.index(),
        rowRenderer,
        rowHeaderRenderer,
        columnKeyGetter,
        columnRenderer,
        contentRenderer,
        className,
        containerClassName,
        onMouseLeave,
    } = props;

    const layoutFacade = useMemo(() => FluidLayoutFacade.for(layout), [layout]);

    return (
        <div className={className} onMouseLeave={onMouseLeave}>
            <ScreenClassProvider useOwnWidth={false}>
                <ScreenClassRender
                    render={(screen: ResponsiveScreenType) =>
                        screen ? (
                            <Container fluid={true} className={containerClassName}>
                                {layoutFacade.rows().map((rowFacade) => {
                                    return (
                                        <FluidLayoutRow
                                            key={rowKeyGetter({
                                                row: rowFacade,
                                                screen,
                                            })}
                                            row={rowFacade}
                                            rowRenderer={rowRenderer}
                                            rowHeaderRenderer={rowHeaderRenderer}
                                            columnKeyGetter={columnKeyGetter}
                                            columnRenderer={columnRenderer}
                                            contentRenderer={contentRenderer}
                                            screen={screen}
                                        />
                                    );
                                })}
                            </Container>
                        ) : null
                    }
                />
            </ScreenClassProvider>
        </div>
    );
}
