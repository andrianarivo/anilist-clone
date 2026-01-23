import { Link, type LinkProps } from "expo-router";
import type { ReactNode } from "react";
import type { PressableProps } from "react-native";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { tv, type VariantProps } from "@/lib/tv";
import { cn } from "@/lib/utils";

const buttonStyles = tv({
	base: "items-center justify-center px-4",
	variants: {
		variant: {
			primary: "bg-primary",
			secondary: "bg-card-bg",
			outline: "bg-transparent border-2 border-primary",
			ghost: "bg-transparent",
			icon: "bg-transparent p-2 rounded-full",
			link: "bg-transparent",
		},
		isLink: {
			true: "",
			false: "rounded-lg py-4 flex-row",
		},
		isIcon: {
			true: "px-0 py-0",
			false: "",
		},
		disabled: {
			true: "opacity-50",
			false: "active:opacity-70",
		},
	},
	compoundVariants: [],
	defaultVariants: {
		variant: "primary",
		isLink: false,
		isIcon: false,
		disabled: false,
	},
});

const textStyles = tv({
	base: "text-base font-semibold",
	variants: {
		variant: {
			primary: "text-white",
			secondary: "text-global-text",
			outline: "text-primary",
			ghost: "text-global-text",
			icon: "text-global-text",
			link: "text-primary",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

type BaseButtonProps = Omit<PressableProps, "children"> &
	Omit<VariantProps<typeof buttonStyles>, "variant"> & {
		loading?: boolean;
	} & (
		| { href: LinkProps["href"]; onPress?: never }
		| { href?: never; onPress: NonNullable<PressableProps["onPress"]> }
	);

export type ButtonProps = BaseButtonProps &
	(
		| { variant: "icon"; icon: ReactNode; children?: never }
		| {
				variant?: Exclude<VariantProps<typeof buttonStyles>["variant"], "icon">;
				icon?: ReactNode;
				children: string;
		  }
	);

const Button = ({
	variant = "primary",
	children,
	loading = false,
	disabled,
	icon,
	href,
	onPress,
	className,
	...props
}: ButtonProps) => {
	const isDisabled = disabled || loading;
	const isStyleLink = variant === "link";
	const isIconVariant = variant === "icon";

	const indicatorColor = variant === "primary" ? "#fff" : "#3577ff";

	const content = (
		<>
			{loading ? (
				<>
					<ActivityIndicator color={indicatorColor} size="small" />
					{!isIconVariant && (
						<Text className={`${textStyles({ variant })} ml-2`}>
							Loading...
						</Text>
					)}
				</>
			) : (
				<View className="flex-row items-center gap-2">
					{icon && <View>{icon}</View>}
					{!isIconVariant && (
						<Text className={textStyles({ variant })}>{children}</Text>
					)}
				</View>
			)}
		</>
	);

	const containerClassName = cn(
		buttonStyles({
			variant,
			isLink: isStyleLink,
			isIcon: isIconVariant,
			disabled: isDisabled,
		}),
		className,
	);

	// If href is defined, use Link
	if (href) {
		return (
			<Link href={href} asChild disabled={isDisabled}>
				<Pressable
					className={containerClassName}
					disabled={isDisabled}
					{...props}
				>
					{content}
				</Pressable>
			</Link>
		);
	}

	// Otherwise use Pressable
	return (
		<Pressable
			className={containerClassName}
			disabled={isDisabled}
			onPress={onPress}
			{...props}
		>
			{content}
		</Pressable>
	);
};

export type ButtonVariant = VariantProps<typeof buttonStyles>["variant"];

export default Button;
