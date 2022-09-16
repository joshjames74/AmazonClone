import { CheckboxFilterType } from "../../views/components/sidebar/types/CheckboxFilterType";
import { RangeFilterType } from "../../views/components/sidebar/types/RangeFilterType";

export enum FilterName {
    checkbox = 'checkbox',
    range = 'range',
    minMax = 'minMax',
}

export type FilterType = {
        name: FilterName.checkbox,
        props: CheckboxFilterType
    } | {
        name: FilterName.minMax,
        props: any
    } | {
        name: FilterName.range,
        props: RangeFilterType
    }
;