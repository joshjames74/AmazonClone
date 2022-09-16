export type RangeFilterType = {
    min: number;
    max: number;
    step: number;
    unit?: string;
    title: string;
    onChange: (value: [number, number]) => void;
}