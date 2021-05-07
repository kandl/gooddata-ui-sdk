// (C) 2007-2021 GoodData Corporation
import React from "react";
import { Overlay, useMediaQuery } from "@gooddata/sdk-ui-kit";
import { legendDialogAlignPoints, legendMobileDialogAlignPoints } from "./alignPoints";

const LegendDialogWrapper: React.FC<{ children: (isMobile: boolean) => JSX.Element }> = ({ children }) => {
    const isMobile = useMediaQuery("<sm");
    return children(isMobile);
};

interface ILegendDialogContent {
    title: string;
    onCloseDialog: () => void;
}

const LegendDialogContent: React.FC<ILegendDialogContent> = (props) => {
    const { title, onCloseDialog, children } = props;

    return (
        <div className="legend-popup-dialog legend-popup-dialog-content">
            <div className="legend-header">
                <div className="legend-header-title">{title}</div>
                <div
                    className="s-legend-close legend-close gd-button-link gd-button-icon-only icon-cross"
                    onClick={onCloseDialog}
                />
            </div>
            <div className="legend-content">{children}</div>
        </div>
    );
};

export interface ILegendDialogProps {
    name: string;
    isOpen: boolean;
    alignTo: string;
    onCloseDialog: () => void;
}

export const LegendDialog: React.FC<ILegendDialogProps> = (props) => {
    const { name, children, isOpen, alignTo, onCloseDialog } = props;

    if (!isOpen) {
        return null;
    }

    return (
        <LegendDialogWrapper>
            {(isMobile) => {
                return (
                    <Overlay
                        alignTo={alignTo}
                        alignPoints={isMobile ? legendMobileDialogAlignPoints : legendDialogAlignPoints}
                        closeOnOutsideClick={!isMobile}
                        onClose={onCloseDialog}
                        className="kpi-alert-dialog-overlay"
                    >
                        <LegendDialogContent title={name} onCloseDialog={onCloseDialog}>
                            {children}
                        </LegendDialogContent>
                    </Overlay>
                );
            }}
        </LegendDialogWrapper>
    );
};
