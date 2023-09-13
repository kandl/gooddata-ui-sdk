/// <reference types="react" />
export type AttributeFilterDropZoneProps = {
    targetIndex: number;
    onDrop: (targetIndex: number) => void;
};
export declare function AttributeFilterDropZone({ targetIndex, onDrop }: AttributeFilterDropZoneProps): JSX.Element | null;
