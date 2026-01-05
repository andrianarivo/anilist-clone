import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useFonts } from '@expo-google-fonts/roboto';
import { customFontsToLoad } from '@theme/typography';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { colors } from '@/theme/colors';

SplashScreen.preventAutoHideAsync();

const client = new ApolloClient({
    uri: 'https://graphql.anilist.co',
    cache: new InMemoryCache(),
});

export default function RootLayout() {
    const [areFontsLoaded] = useFonts(customFontsToLoad);

    useEffect(() => {
        if (areFontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [areFontsLoaded]);

    useEffect(() => {
        if (Platform.OS === 'android') {
            NavigationBar.setBackgroundColorAsync('#18181b');
        }
    }, []);

    if (!areFontsLoaded) {
        return null;
    }

    return (
        <ApolloProvider client={client}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" />
                    </Stack>
                    <StatusBar style={'light'} backgroundColor='#18181b' />
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </ApolloProvider>
    );
}
