import { useCallback, useState } from "react";
import type { MediaFilters } from "types/filters";

export const useMediaFilters = (initialFilters: MediaFilters = {}) => {
	const [filters, setFilters] = useState<MediaFilters>(initialFilters);

	const updateFilter = useCallback(
		<K extends keyof MediaFilters>(key: K, value: MediaFilters[K]) => {
			setFilters((prev) => ({ ...prev, [key]: value }));
		},
		[],
	);

	const resetFilters = useCallback(() => {
		setFilters({});
	}, []);

	const hasActiveFilters = useCallback(() => {
		return Object.values(filters).some((value) => {
			if (Array.isArray(value)) return value.length > 0;
			return value !== undefined && value !== "";
		});
	}, [filters]);

	return {
		filters,
		setFilters,
		updateFilter,
		resetFilters,
		hasActiveFilters,
	};
};
