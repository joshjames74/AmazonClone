export type OptionType = {
    value: string;
    isChecked: boolean;
};

export type CheckboxFilterType = {
    options: OptionType[];
    onChange: (event: any) => void;
};