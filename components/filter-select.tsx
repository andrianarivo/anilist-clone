import { useState } from "react";
import {
	Pressable,
	ScrollView,
	Text,
	View,
	type ViewStyle,
} from "react-native";

type FilterSelectProps<T extends string | number> = {
	label: string;
	options: readonly T[] | T[];
	value: T | undefined;
	onChange: (value: T | undefined) => void;
	renderOption?: (option: T) => string;
	placeholder?: string;
	style?: ViewStyle;
};

export function FilterSelect<T extends string | number>({
	label,
	options,
	value,
	onChange,
	renderOption = (opt) => String(opt),
	placeholder = "Any",
	style,
}: FilterSelectProps<T>) {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleSelect = (option: T | undefined) => {
		onChange(option);
		setIsExpanded(false);
	};

	return (
		<View style={style} className="mb-4">
			<Text className="text-secondary-text text-sm mb-2">{label}</Text>
			<Pressable
				onPress={() => setIsExpanded(!isExpanded)}
				className="bg-card-bg border border-card-border rounded-lg px-4 py-3 flex-row justify-between items-center"
			>
				<Text
					className={
						value !== undefined ? "text-global-text" : "text-secondary-text"
					}
				>
					{value !== undefined ? renderOption(value) : placeholder}
				</Text>
				<Text className="text-secondary-text">{isExpanded ? "▲" : "▼"}</Text>
			</Pressable>

			{isExpanded && (
				<View className="bg-card-bg border border-card-border rounded-lg mt-1 max-h-48 overflow-hidden">
					<ScrollView nestedScrollEnabled>
						<Pressable
							onPress={() => handleSelect(undefined)}
							className="px-4 py-3 border-b border-card-border"
						>
							<Text className="text-secondary-text">{placeholder}</Text>
						</Pressable>
						{options.map((option) => (
							<Pressable
								key={String(option)}
								onPress={() => handleSelect(option)}
								className={`px-4 py-3 border-b border-card-border ${
									value === option ? "bg-primary/20" : ""
								}`}
							>
								<Text
									className={
										value === option ? "text-primary" : "text-global-text"
									}
								>
									{renderOption(option)}
								</Text>
							</Pressable>
						))}
					</ScrollView>
				</View>
			)}
		</View>
	);
}

type FilterMultiSelectProps = {
	label: string;
	options: readonly string[];
	value: string[] | undefined;
	onChange: (value: string[] | undefined) => void;
	placeholder?: string;
	style?: ViewStyle;
};

export function FilterMultiSelect({
	label,
	options,
	value = [],
	onChange,
	placeholder = "Any",
	style,
}: FilterMultiSelectProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleOption = (option: string) => {
		const currentValue = value || [];
		if (currentValue.includes(option)) {
			const newValue = currentValue.filter((v) => v !== option);
			onChange(newValue.length > 0 ? newValue : undefined);
		} else {
			onChange([...currentValue, option]);
		}
	};

	return (
		<View style={style} className="mb-4">
			<Text className="text-secondary-text text-sm mb-2">{label}</Text>
			<Pressable
				onPress={() => setIsExpanded(!isExpanded)}
				className="bg-card-bg border border-card-border rounded-lg px-4 py-3 flex-row justify-between items-center"
			>
				<Text
					className={
						value && value.length > 0
							? "text-global-text"
							: "text-secondary-text"
					}
					numberOfLines={1}
				>
					{value && value.length > 0 ? value.join(", ") : placeholder}
				</Text>
				<Text className="text-secondary-text">{isExpanded ? "▲" : "▼"}</Text>
			</Pressable>

			{isExpanded && (
				<View className="bg-card-bg border border-card-border rounded-lg mt-1 max-h-48 overflow-hidden">
					<ScrollView nestedScrollEnabled>
						{options.map((option) => {
							const isSelected = value?.includes(option);
							return (
								<Pressable
									key={option}
									onPress={() => toggleOption(option)}
									className={`px-4 py-3 border-b border-card-border flex-row items-center ${
										isSelected ? "bg-primary/20" : ""
									}`}
								>
									<View
										className={`w-5 h-5 rounded border mr-3 items-center justify-center ${
											isSelected
												? "bg-primary border-primary"
												: "border-card-border"
										}`}
									>
										{isSelected && (
											<Text className="text-white text-xs">✓</Text>
										)}
									</View>
									<Text
										className={isSelected ? "text-primary" : "text-global-text"}
									>
										{option}
									</Text>
								</Pressable>
							);
						})}
					</ScrollView>
				</View>
			)}
		</View>
	);
}
