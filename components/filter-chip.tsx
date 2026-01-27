import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { tv } from "@/lib/tv";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";

const chipStyles = tv({
	base: "flex-row items-center px-3 py-1.5 rounded-full border",
	variants: {
		status: {
			active: "bg-primary/10 border-primary",
			inactive: "bg-card-bg border-neutral-700",
		},
	},
	defaultVariants: {
		status: "inactive",
	},
});

const labelStyles = tv({
	base: "text-xs font-medium mr-1",
	variants: {
		status: {
			active: "text-primary",
			inactive: "text-secondary-text",
		},
	},
	defaultVariants: {
		status: "inactive",
	},
});

const valueStyles = tv({
	base: "text-xs font-bold",
	variants: {
		status: {
			active: "text-primary",
			inactive: "text-global-text",
		},
	},
	defaultVariants: {
		status: "inactive",
	},
});

export type FilterChipItem<T> = {
	label: string;
	value: T;
};

export type FilterChipProps<T> = {
	label: string;
	items: FilterChipItem<T>[];
	value: T | null;
	onValueChange: (value: T | null) => void;
	placeholder?: string;
	className?: string;
};

const FilterChip = <T extends string | number>({
	label,
	items,
	value,
	onValueChange,
	placeholder = "Any",
	className,
}: FilterChipProps<T>) => {
	const isActive = value !== null && value !== undefined && value !== "";
	const status = isActive ? "active" : "inactive";

	const selectedItem = items.find((item) => item.value === value);
	const displayValue = selectedItem ? selectedItem.label : placeholder;

	return (
		<View className={cn("m-1", className)}>
			<RNPickerSelect
				onValueChange={onValueChange}
				items={items}
				value={value}
				placeholder={{ label: placeholder, value: null }}
				useNativeAndroidPickerStyle={false}
				style={{
					inputIOS: { display: "none" },
					inputAndroid: { display: "none" },
					viewContainer: {
						flexDirection: "row",
						alignItems: "center",
					},
				}}
			>
				<View className={chipStyles({ status })}>
					<Text className={labelStyles({ status })}>{label}:</Text>
					<Text className={valueStyles({ status })}>{displayValue}</Text>
					<Ionicons
						name="chevron-down"
						size={12}
						className={isActive ? "text-primary" : "text-secondary-text"}
						style={{ marginLeft: 4 }}
					/>
				</View>
			</RNPickerSelect>
		</View>
	);
};

export default FilterChip;
