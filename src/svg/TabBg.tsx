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
    <Svg width={104} height={75} viewBox='0 0 104 75' fill='none' {...props}>
      <G filter='url(#filter0_d_1_419)'>
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M52 48.66c18.778 0 34-14.575 34-32.554C86 10.247 84.383 4.75 81.553 0H100v75H4V0h18.447A31.346 31.346 0 0018 16.106C18 34.085 33.222 48.66 52 48.66z'
          fill='#18181B'
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
};
