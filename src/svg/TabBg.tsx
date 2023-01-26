import React from 'react';
import Svg, {
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from 'react-native-svg';

type Props = SvgProps & {
  color?: string;
};

export const TabBg: React.FC<Props> = ({ color = '#FFFFFF', ...props }) => {
  return (
    <Svg
      width={390}
      height={65}
      viewBox='0 0 390 75'
      fill='none'
      {...props}
    >
      <G filter='url(#filter0_d_32_220)'>
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M195 51c18.778 0 34-15.222 34-34 0-6.193-1.656-12-4.549-17H390v40c0 27.614-22.386 50-50 50H50C22.386 90 0 67.614 0 40V0h165.549A33.843 33.843 0 00161 17c0 18.778 15.222 34 34 34z'
          fill='url(#paint0_linear_32_220)'
          fillOpacity={0.27}
        />
      </G>
      <Defs>
        <LinearGradient
          id='paint0_linear_32_220'
          x1={195}
          y1={0}
          x2={195}
          y2={90}
          gradientUnits='userSpaceOnUse'
        >
          <Stop stopColor='#fff' />
          <Stop offset={1} stopColor='#fff' stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
