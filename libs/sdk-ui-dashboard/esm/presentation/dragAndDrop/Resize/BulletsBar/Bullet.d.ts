/// <reference types="react" />
export interface BulletProps {
    index: number;
    isInitial: boolean;
    isCurrent: boolean;
}
export declare function Bullet({ isCurrent, isInitial, index }: BulletProps): JSX.Element;
