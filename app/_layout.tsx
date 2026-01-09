import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import '../global.css'
import { useFonts } from '@expo-google-fonts/roboto'
import * as NavigationBar from 'expo-navigation-bar'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { customFontsToLoad } from 'theme/typography'

SplashScreen.preventAutoHideAsync()

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.EXPO_PUBLIC_ANILIST_API_URL,
  }),
  cache: new InMemoryCache(),
})

export default function RootLayout() {
  const [areFontsLoaded] = useFonts(customFontsToLoad)

  useEffect(() => {
    if (areFontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [areFontsLoaded])

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#18181b')
    }
  }, [])

  if (!areFontsLoaded) {
    return null
  }

  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'search/anime'} />
          </Stack>
          <StatusBar style={'dark'} />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ApolloProvider>
  )
}
