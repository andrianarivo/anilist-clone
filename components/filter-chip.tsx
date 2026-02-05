import FilterChipSingle, {
	type FilterChipSingleProps,
	type FilterChipItem,
} from "./filter-chip-single";
import FilterChipMulti, {
	type FilterChipMultiProps,
} from "./filter-chip-multi";

export type { FilterChipItem };

type FilterChipPropsBase<T> = {
	label: string;
	items: FilterChipItem<T>[];
	placeholder?: string;
	className?: string;
};

type SingleSelectProps<T> = FilterChipPropsBase<T> & {
	multiple?: false;
	value: T | null;
	onValueChange: (value: T | null) => void;
};

type MultiSelectProps<T> = FilterChipPropsBase<T> & {
	multiple: true;
	value: T[];
	onValueChange: (value: T[]) => void;
};

export type FilterChipProps<T> = SingleSelectProps<T> | MultiSelectProps<T>;

const FilterChip = <T extends string | number>(props: FilterChipProps<T>) => {
	if (props.multiple) {
		return (
			<FilterChipMulti
				label={props.label}
				items={props.items}
				value={props.value}
				onValueChange={props.onValueChange}
				placeholder={props.placeholder}
				className={props.className}
			/>
		);
	}

	return (
		<FilterChipSingle
			label={props.label}
			items={props.items}
			value={props.value}
			onValueChange={props.onValueChange}
			placeholder={props.placeholder}
			className={props.className}
		/>
	);
};

export default FilterChip;
