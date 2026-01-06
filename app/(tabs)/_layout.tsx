import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { ROUTES } from "@/constants/routes";

export default function TabLayout() {
	return (
		<NativeTabs>
			<NativeTabs.Trigger name={ROUTES.TABS.HOME.name}>
				<Label>Home</Label>
				<Icon sf="house.fill" />
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name={ROUTES.TABS.SEARCH.name}>
				<Label>Search</Label>
				<Icon sf="magnifyingglass" />
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name={ROUTES.TABS.SOCIAL.name}>
				<Label>Social</Label>
				<Icon sf="person.2.fill" />
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name={ROUTES.TABS.LIBRARY.name}>
				<Label>Library</Label>
				<Icon sf="play.square.stack.fill" />
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name={ROUTES.TABS.PROFILE.name}>
				<Label>Profile</Label>
				<Icon sf="person.fill" />
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
