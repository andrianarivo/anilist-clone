import AppNavigator from '@navigators/AppNavigator';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './theme/colors';

if (Platform.OS === 'android') {
  NavigationBar.setBackgroundColorAsync('#18181b');
}

interface AppProps {
  onLayoutRootView: () => Promise<void>;
}

export default function App(props: AppProps) {
  return (
    <SafeAreaProvider>
      <AppNavigator onLayoutRootView={props.onLayoutRootView} />
      <StatusBar style={'light'} backgroundColor='#18181b' />
    </SafeAreaProvider>
  );
}
