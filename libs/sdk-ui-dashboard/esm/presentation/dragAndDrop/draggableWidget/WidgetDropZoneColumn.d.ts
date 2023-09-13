/// <reference types="react" />
import { ScreenSize } from "@gooddata/sdk-model";
export type WidgetDropZoneColumnProps = {
    screen: ScreenSize;
    sectionIndex: number;
    itemIndex: number;
    isLastInSection?: boolean;
};
export declare const WidgetDropZoneColumn: (props: WidgetDropZoneColumnProps) => JSX.Element | null;
