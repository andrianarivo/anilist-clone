import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function TabLayout() {
  return (
    <SafeAreaView className="flex-1 bg-global-bg" edges={['top']}>
      <NativeTabs>
        <NativeTabs.Trigger name={'top-100'}>
          <Label>Top 100</Label>
          <Icon sf="trophy.fill" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name={'trending'}>
          <Label>Trending</Label>
          <Icon sf="flame.fill" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name={'this-season'}>
          <Label>This Season</Label>
          <Icon sf="calendar" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name={'next-season'}>
          <Label>Next Season</Label>
          <Icon sf="calendar.badge.plus" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name={'popular'}>
          <Label>Popular</Label>
          <Icon sf="heart.fill" />
        </NativeTabs.Trigger>
      </NativeTabs>
    </SafeAreaView>
  )
}
