export declare const DEBUG_SHOW_DROP_ZONES = false;
export declare function getDropZoneDebugStyle({ isOver }: {
    isOver?: boolean | undefined;
}): {
    backgroundColor?: undefined;
} | {
    backgroundColor: string;
};
