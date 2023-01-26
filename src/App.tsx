import AppNavigator from '@navigators/AppNavigator';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

if (Platform.OS === 'android') {
  NavigationBar.setBackgroundColorAsync('#1a1a1b');
}

interface AppProps {
  onLayoutRootView: () => Promise<void>;
}

export default function App(props: AppProps) {
  return (
    <SafeAreaProvider>
      <AppNavigator onLayoutRootView={props.onLayoutRootView} />
      <StatusBar style={'light'} backgroundColor='#1a1a1b' />
    </SafeAreaProvider>
  );
}
