import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { Image, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProfileBarButton from './components/ProfileTabButton';
import Downloads from './screens/Downloads';
import { Home } from './screens/Home';
import Library from './screens/Library';
import Profile from './screens/Profile';
import Videos from './screens/Videos';

const Tab = createBottomTabNavigator();
NavigationBar.setBackgroundColorAsync('#1a1a1b');

type AppProps = {
  onLayoutRootView: () => Promise<void>;
};

const renderTabBarIcon = (route: RouteProp<ParamListBase, string>) => {
  let icon;

  switch (route.name) {
    case 'Home':
      icon = require('../assets/icons/home.png');
      break;
    case 'Videos':
      icon = require('../assets/icons/videos.png');
      break;
    case 'Profile':
      icon = require('../assets/icons/profile_bg.png');
      break;
    case 'Library':
      icon = require('../assets/icons/library.png');
      break;
    case 'Downloads':
      icon = require('../assets/icons/downloads.png');
      break;
    default:
      break;
  }
  return <Image className='w-9 h-9' source={icon} fadeDuration={0} />;
};

export default function App(props: AppProps) {
  return (
    <SafeAreaProvider>
      <NavigationContainer onReady={props.onLayoutRootView}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            headerTransparent: true,
            tabBarIcon: () => {
              return renderTabBarIcon(route);
            },
            tabBarStyle: { height: 75 },
            tabBarBackground: () => <View className='grow bg-deep-dark' />,
          })}
        >
          <Tab.Screen name='Home' component={Home} />
          <Tab.Screen name='Videos' component={Videos} />
          <Tab.Screen
            name='Profile'
            component={Profile}
            options={{
              tabBarIcon: ({}) => {
                return (
                  <LinearGradient
                    className='w-16 h-16 rounded-full'
                    colors={['#19A1BE', '#7D4192']}
                  >
                    <Image
                      className='w-[60] h-[60] top-[2] left-[2] rounded-full'
                      source={require('../assets/images/movie1.png')}
                      resizeMode='contain'
                    />
                  </LinearGradient>
                );
              },
              tabBarButton: (props) => {
                return <ProfileBarButton {...props} />;
              },
            }}
          />
          <Tab.Screen name='Library' component={Library} />
          <Tab.Screen name='Downloads' component={Downloads} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style={'light'} backgroundColor='#1a1a1b' />
    </SafeAreaProvider>
  );
}
