import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { chipStyles, labelStyles, valueStyles } from "./filter-chip-styles";

export type FilterChipItem<T> = {
	label: string;
	value: T;
};

export type FilterChipSingleProps<T> = {
	label: string;
	items: FilterChipItem<T>[];
	value: T | null;
	onValueChange: (value: T | null) => void;
	placeholder?: string;
	className?: string;
};

const FilterChipSingle = <T extends string | number>({
	label,
	items,
	value,
	onValueChange,
	placeholder = "Any",
	className,
}: FilterChipSingleProps<T>) => {
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

export default FilterChipSingle;
