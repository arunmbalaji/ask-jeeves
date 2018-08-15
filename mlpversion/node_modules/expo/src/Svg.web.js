// @flow

import * as SvgModules from 'react-native-svg-web';

const { Svg } = SvgModules;

for (const key in SvgModules) {
  if (key !== 'default' && key !== 'Svg') {
    Svg[key] = SvgModules[key];
  }
}

export default Svg;
