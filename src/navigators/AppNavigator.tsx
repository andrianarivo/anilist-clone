import ProfileBarButton from '@components/ProfileTabButton';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  DefaultTheme,
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import Downloads from '@screens/Downloads';
import Home from '@screens/Home';
import Library from '@screens/Library';
import Profile from '@screens/Profile';
import Videos from '@screens/Videos';
import { colors } from '@theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const renderTabBarIcon = (route: RouteProp<ParamListBase, string>) => {
  let icon;

  switch (route.name) {
    case 'Home':
      icon = require('assets/icons/home.png');
      break;
    case 'Videos':
      icon = require('assets/icons/videos.png');
      break;
    case 'Profile':
      icon = require('assets/icons/profile_bg.png');
      break;
    case 'Library':
      icon = require('assets/icons/library.png');
      break;
    case 'Downloads':
      icon = require('assets/icons/downloads.png');
      break;
    default:
      break;
  }
  return <Image className='w-9 h-9' source={icon} fadeDuration={0} />;
};

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: colors.background,
  },
};

const Tab = createMaterialBottomTabNavigator();

interface NavigatorProps {
  onLayoutRootView: () => Promise<void>;
}

const AppNavigator = (props: NavigatorProps) => {
  const insets = useSafeAreaInsets();
  let bottomOffset = 0;
  if (Platform.OS == 'ios') {
    bottomOffset = insets.bottom;
  }
  return (
    <NavigationContainer
      theme={NavigationTheme}
      onReady={props.onLayoutRootView}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          headerTransparent: true,
          tabBarIcon: () => {
            return renderTabBarIcon(route);
          },
          tabBarStyle: {
            borderTopColor: colors.palette.neutral900,
            height: '9.5%',
          },
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
                    source={require('assets/images/movie1.png')}
                  />
                </LinearGradient>
              );
            },
          }}
        />
        <Tab.Screen name='Library' component={Library} />
        <Tab.Screen name='Downloads' component={Downloads} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
