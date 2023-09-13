export type ResizerStatus = "active" | "muted" | "error";
export interface ResizerProps {
    status: ResizerStatus;
}
