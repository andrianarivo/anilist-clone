import { TabBg } from '@/svg/TabBg';
import React, { MouseEvent, ReactNode } from 'react';
import {
  GestureResponderEvent,
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';

interface ProfileBarProps {
  children?: ReactNode;
  onPress?:
    | ((e: GestureResponderEvent | MouseEvent<HTMLAnchorElement>) => void)
    | undefined;
}

const ProfileBarButton = ({ children, onPress }: ProfileBarProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View className='w-20 h-20 rounded-full -top-4'>
        <ImageBackground
          className='w-32 h-32 absolute -top-8 rounded-full'
          style={{
            right: Platform.OS === 'android' ? -23 : -24,
          }}
          resizeMode='cover'
          source={require('assets/images/profile_bg.png')}
        >
          {children}
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileBarButton;
