/// <reference types="react" />
export type AttributeFilterDropZonePlacement = "inside" | "outside";
export type AttributeFilterDropZoneHintPosition = "next" | "prev";
export type AttributeFilterDropZoneHintProps = {
    placement?: AttributeFilterDropZonePlacement;
    hintPosition: AttributeFilterDropZoneHintPosition;
    targetIndex: number;
    acceptPlaceholder?: boolean;
    onAddAttributePlaceholder?: (index: number) => void;
};
export declare function AttributeFilterDropZoneHint({ placement, hintPosition, targetIndex, acceptPlaceholder, onAddAttributePlaceholder, }: AttributeFilterDropZoneHintProps): JSX.Element;
