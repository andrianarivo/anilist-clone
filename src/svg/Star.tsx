import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const defaults: SvgProps = {
  width: 14,
  height: 13,
};
const Star = (props: SvgProps = defaults) => {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox='0 0 14 13'
      fill='none'
      {...props}
    >
      <Path
        d='M13.19 4.517l-3.968-.576L7.448.345a.502.502 0 00-.897 0L4.779 3.941l-3.967.576a.5.5 0 00-.277.853l2.87 2.799-.677 3.951a.5.5 0 00.725.527L7 10.78l3.549 1.866a.5.5 0 00.725-.527l-.679-3.951 2.87-2.799a.5.5 0 00-.276-.853z'
        fill='#E7C825'
      />
    </Svg>
  );
};

export default Star;
