import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs'

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name={'top-100'}>
        <Label>Top 100</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name={'trending'}>
        <Label>Trending</Label>
        <Icon sf="magnifyingglass" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name={'this-season'}>
        <Label>This Season</Label>
        <Icon sf="person.2.fill" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name={'next-season'}>
        <Label>Next Season</Label>
        <Icon sf="play.square.stack.fill" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name={'popular'}>
        <Label>Popular</Label>
        <Icon sf="person.fill" />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
