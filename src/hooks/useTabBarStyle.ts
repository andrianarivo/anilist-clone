import { Platform } from 'react-native';
import { useMediaQuery } from 'react-responsive';

const useTabBarStyle = () => {
  const isMediumScreen = useMediaQuery({
    minDeviceHeight: 830,
  });
  return {
    borderTopWidth: 0,
    height: isMediumScreen && Platform.OS === 'ios' ? 75 : 55,
  };
};

export default useTabBarStyle;
