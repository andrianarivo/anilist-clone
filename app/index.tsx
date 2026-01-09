import { Redirect } from 'expo-router'
import { View, Text } from 'react-native'

export default function Index() {
  // return <Redirect href="/search/anime/top-100" />
  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      <Text className="text-white text-2xl font-bold">Tailwind Test</Text>
      <View className="bg-red-500 p-4 m-2 rounded-lg">
        <Text className="text-yellow-300">
          If this is styled, Tailwind is working!
        </Text>
      </View>
    </View>
  )
}
