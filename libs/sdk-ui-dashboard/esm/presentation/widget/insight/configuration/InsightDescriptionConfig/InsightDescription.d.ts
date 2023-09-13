/// <reference types="react" />
interface IInsightDescriptionProps {
    description: string;
    readOnly?: boolean;
    setDescription: (newDescription: string) => void;
}
export declare function InsightDescription(props: IInsightDescriptionProps): JSX.Element;
export {};
