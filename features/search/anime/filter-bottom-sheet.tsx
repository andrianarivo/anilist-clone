import BottomSheet, {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useMemo } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import type { MediaFilters } from "types/filters";
import {
	AVAILABLE_GENRES,
	FORMAT_OPTIONS,
	SEASON_OPTIONS,
	STATUS_OPTIONS,
	YEAR_OPTIONS,
} from "types/filters";
import {
	FilterMultiSelect,
	FilterSelect,
} from "../../../components/filter-select";

type FilterBottomSheetProps = {
	filters: MediaFilters;
	onFiltersChange: (filters: MediaFilters) => void;
	onApply: () => void;
	onReset: () => void;
};

const formatEnumLabel = (value: string): string => {
	return value
		.replace(/_/g, " ")
		.toLowerCase()
		.replace(/\b\w/g, (c) => c.toUpperCase());
};


const FilterBottomSheet = forwardRef<BottomSheet, FilterBottomSheetProps>(
	({ filters, onFiltersChange, onApply, onReset }, ref) => {
		const snapPoints = useMemo(() => ["75%", "90%"], []);

		const renderBackdrop = useCallback(
			(props: BottomSheetBackdropProps) => (
				<BottomSheetBackdrop
					{...props}
					disappearsOnIndex={-1}
					appearsOnIndex={0}
					opacity={0.5}
				/>
			),
			[],
		);

		const updateFilter = <K extends keyof MediaFilters>(
			key: K,
			value: MediaFilters[K],
		) => {
			onFiltersChange({ ...filters, [key]: value });
		};

		return (
			<BottomSheet
				ref={ref}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose
				backdropComponent={renderBackdrop}
				backgroundStyle={{ backgroundColor: "#1a2d42" }}
				handleIndicatorStyle={{ backgroundColor: "#acd5f2" }}
			>
				<View className="flex-1 px-4">
					<Text className="text-2xl font-bold text-global-text mb-4">
						Filters
					</Text>

					<BottomSheetScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingBottom: 100 }}
					>
						{/* Search */}
						<View className="mb-4">
							<Text className="text-secondary-text text-sm mb-2">Search</Text>
							<TextInput
								value={filters.search || ""}
								onChangeText={(text) =>
									updateFilter("search", text || undefined)
								}
								placeholder="Search anime..."
								placeholderTextColor="#6b8a9e"
								className="bg-card-bg border border-card-border rounded-lg px-4 py-3 text-global-text"
							/>
						</View>

						{/* Genres */}
						<FilterMultiSelect
							label="Genres"
							options={AVAILABLE_GENRES}
							value={filters.genres}
							onChange={(value) => updateFilter("genres", value)}
						/>

						{/* Year */}
						<FilterSelect
							label="Year"
							options={YEAR_OPTIONS}
							value={filters.year}
							onChange={(value) => updateFilter("year", value)}
						/>

						{/* Season */}
						<FilterSelect
							label="Season"
							options={SEASON_OPTIONS}
							value={filters.season}
							onChange={(value) => updateFilter("season", value)}
							renderOption={formatEnumLabel}
						/>

						{/* Format */}
						<FilterSelect
							label="Format"
							options={FORMAT_OPTIONS}
							value={filters.format}
							onChange={(value) => updateFilter("format", value)}
							renderOption={formatEnumLabel}
						/>

						{/* Airing Status */}
						<FilterSelect
							label="Airing Status"
							options={STATUS_OPTIONS}
							value={filters.status}
							onChange={(value) => updateFilter("status", value)}
							renderOption={formatEnumLabel}
						/>
					</BottomSheetScrollView>

					{/* Action Buttons */}
					<View className="absolute bottom-0 left-0 right-0 flex-row gap-3 px-4 pb-8 pt-4 bg-global-bg">
						<Pressable
							onPress={onReset}
							className="flex-1 bg-card-bg border border-card-border rounded-lg py-3 items-center"
						>
							<Text className="text-global-text font-semibold">Reset</Text>
						</Pressable>
						<Pressable
							onPress={onApply}
							className="flex-1 bg-primary rounded-lg py-3 items-center"
						>
							<Text className="text-white font-semibold">Apply</Text>
						</Pressable>
					</View>
				</View>
			</BottomSheet>
		);
	},
);

FilterBottomSheet.displayName = "FilterBottomSheet";

export default FilterBottomSheet;
