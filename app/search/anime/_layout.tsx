import { Tabs } from 'expo-router'
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs'
import { useColorScheme } from 'nativewind'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function TabLayout() {
  const { colorScheme } = useColorScheme()
  if (Platform.OS === 'ios') {
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

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3577ff',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#152232' : '#edf1f5',
          borderTopColor: colorScheme === 'dark' ? '#152232' : '#edf1f5',
        },
      }}
    >
      <Tabs.Screen
        name="top-100"
        options={{
          title: 'Top 100',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'trophy' : 'trophy-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="trending"
        options={{
          title: 'Trending',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'flame' : 'flame-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="this-season"
        options={{
          title: 'This Season',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'calendar' : 'calendar-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="next-season"
        options={{
          title: 'Next Season',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'calendar' : 'calendar-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="popular"
        options={{
          title: 'Popular',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
