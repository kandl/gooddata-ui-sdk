/// <reference types="react" />
interface IMeasureValueButtonProps {
    isActive: boolean;
    buttonTitle: string;
    onClick: () => void;
}
declare const DropdownButton: ({ isActive, buttonTitle, onClick }: IMeasureValueButtonProps) => JSX.Element;
export default DropdownButton;
