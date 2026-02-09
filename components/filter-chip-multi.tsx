import { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Button from "./button";
import {
	BottomSheetModal,
	BottomSheetBackdrop,
	BottomSheetFlatList,
	BottomSheetFooter,
	type BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { useColorScheme } from "nativewind";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { chipStyles, labelStyles, valueStyles } from "./filter-chip-styles";

const THEME_COLORS = {
	light: {
		background: "#edf1f5",
		cardBg: "#fbfbfb",
		text: "#152232",
		secondaryText: "#564e4a",
		border: "#d1d5db",
		handleIndicator: "#9ca3af",
	},
	dark: {
		background: "#152232",
		cardBg: "#151f2e",
		text: "#ecf6fe",
		secondaryText: "#acd5f2",
		border: "#374151",
		handleIndicator: "#6b7280",
	},
};

export type FilterChipItem<T> = {
	label: string;
	value: T;
};

export type FilterChipMultiProps<T> = {
	label: string;
	items: FilterChipItem<T>[];
	value: T[];
	onValueChange: (value: T[]) => void;
	placeholder?: string;
	className?: string;
};

const FilterChipMulti = <T extends string | number>({
	label,
	items,
	value,
	onValueChange,
	placeholder = "Any",
	className,
}: FilterChipMultiProps<T>) => {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const [selectedValues, setSelectedValues] = useState<T[]>(value);
	const selectedValuesRef = useRef<T[]>(value);
	const { colorScheme } = useColorScheme();
	const { bottom: bottomInset } = useSafeAreaInsets();

	const snapPoints = useMemo(() => ["50%", "70%"], []);
	const colors = THEME_COLORS[colorScheme === "dark" ? "dark" : "light"];

	const isActive = value.length > 0;
	const status = isActive ? "active" : "inactive";

	const getDisplayValue = () => {
		if (value.length === 0) return placeholder;
		if (value.length === 1) {
			const item = items.find((i) => i.value === value[0]);
			return item?.label || placeholder;
		}
		return `${value.length} selected`;
	};

	const handleOpenSheet = () => {
		setSelectedValues(value);
		bottomSheetRef.current?.present();
	};

	const handleCloseSheet = () => {
		bottomSheetRef.current?.dismiss();
	};

	const handleToggleItem = (itemValue: T) => {
		setSelectedValues((prev) => {
			const next = prev.includes(itemValue)
				? prev.filter((v) => v !== itemValue)
				: [...prev, itemValue];
			selectedValuesRef.current = next;
			return next;
		});
	};

	const handleClear = () => {
		setSelectedValues([]);
		selectedValuesRef.current = [];
	};

	const handleDismiss = () => {
		onValueChange(selectedValuesRef.current);
	};

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				pressBehavior="close"
			/>
		),
		[colors]
	);

	const renderItem = useCallback(
		({ item }: { item: FilterChipItem<T> }) => {
			const isSelected = selectedValues.includes(item.value);
			return (
				<TouchableOpacity
					onPress={() => handleToggleItem(item.value)}
					className="flex-row items-center py-3 px-4"
					style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
					activeOpacity={0.7}
				>
					<View
						className={cn(
							"w-6 h-6 rounded border-2 mr-3 items-center justify-center",
							isSelected
								? "bg-primary border-primary"
								: "border-neutral-500"
						)}
					>
						{isSelected && (
							<Ionicons name="checkmark" size={16} color="#fff" />
						)}
					</View>
					<Text className="text-base text-global-text flex-1">
						{item.label}
					</Text>
				</TouchableOpacity>
			);
		},
		[selectedValues, colors]
	);

	const renderFooter = useCallback(
		(props: BottomSheetFooterProps) => (
			<BottomSheetFooter {...props} bottomInset={bottomInset}>
				<View
					className="flex-row items-center justify-between px-4 py-4 bg-card-bg"
					style={{ borderTopWidth: 1, borderTopColor: colors.border }}
				>
					<Button variant="secondary" onPress={handleClear}>
						Clear All
					</Button>
					<Button variant="primary" onPress={handleCloseSheet}>
						{`Apply${selectedValues.length > 0 ? ` (${selectedValues.length})` : ""}`}
					</Button>
				</View>
			</BottomSheetFooter>
		),
		[selectedValues, colors]
	);

	return (
		<View className={cn("m-1", className)}>
			<TouchableOpacity onPress={handleOpenSheet} activeOpacity={0.7}>
				<View className={chipStyles({ status })}>
					<Text className={labelStyles({ status })}>{label}:</Text>
					<Text className={valueStyles({ status })}>{getDisplayValue()}</Text>
					<Ionicons
						name="chevron-down"
						size={12}
						className={isActive ? "text-primary" : "text-secondary-text"}
						style={{ marginLeft: 4 }}
					/>
				</View>
			</TouchableOpacity>

			<BottomSheetModal
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				enablePanDownToClose
				backdropComponent={renderBackdrop}
				onDismiss={handleDismiss}
				backgroundStyle={{ backgroundColor: colors.background }}
				handleIndicatorStyle={{ backgroundColor: colors.handleIndicator }}
				footerComponent={renderFooter}
			>
				{/* Header */}
				<View
					className="flex-row items-center justify-between px-4 py-2"
					style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
				>
					<TouchableOpacity onPress={handleCloseSheet}>
						<Ionicons name="close" size={24} color={colors.secondaryText} />
					</TouchableOpacity>
					<Text className="text-lg font-bold text-global-text">{label}</Text>
					<View style={{ width: 24 }} />
				</View>

				{/* Options list */}
				<BottomSheetFlatList<FilterChipItem<T>>
					data={items}
					keyExtractor={(item: FilterChipItem<T>) => String(item.value)}
					renderItem={renderItem}
					extraData={selectedValues}
					contentContainerStyle={{ paddingBottom: 80 + bottomInset }}
				/>
			</BottomSheetModal>
		</View>
	);
};

export default FilterChipMulti;
