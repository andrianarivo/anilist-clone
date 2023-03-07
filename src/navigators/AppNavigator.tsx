import useTabBarStyle from '@/hooks/useTabBarStyle';
import ProfileBarButton from '@components/ProfileTabButton';
import '@expo/match-media';
import HomeNavigator from '@navigators/HomeNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DefaultTheme,
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import Downloads from '@screens/Downloads';
import Library from '@screens/Library';
import Profile from '@screens/Profile';
import Videos from '@screens/Videos';
import { colors } from '@theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Platform, View } from 'react-native';
import { useMediaQuery } from 'react-responsive';

const renderTabBarIcon = (route: RouteProp<ParamListBase, string>) => {
  let icon;

  switch (route.name) {
    case 'HomeNavigator':
      icon = require('assets/icons/home.png');
      break;
    case 'Videos':
      icon = require('assets/icons/videos.png');
      break;
    case 'Profile':
      icon = require('assets/images/profile_bg.png');
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
    background: colors.background,
  },
};

const Tab = createBottomTabNavigator();

interface NavigatorProps {
  onLayoutRootView: () => Promise<void>;
}

const AppNavigator = (props: NavigatorProps) => {
  const tabBarStyle = useTabBarStyle();
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
          tabBarStyle: tabBarStyle,
          tabBarBackground: () => {
            return <View className='grow bg-deep-dark' />;
          },
        })}
      >
        <Tab.Screen name='HomeNavigator' component={HomeNavigator} />
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
            tabBarButton: (props) => {
              return <ProfileBarButton {...props} />;
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
