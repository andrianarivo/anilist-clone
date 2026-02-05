import { tv } from "@/lib/tv";

export const chipStyles = tv({
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

export const labelStyles = tv({
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

export const valueStyles = tv({
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
