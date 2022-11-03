import {TSplitResult} from './Input/types';

export const splitProp = (prop: number | string): TSplitResult => {
  if (typeof prop === 'number') {
    return {all: prop};
  }
  const splitted = prop.split(' ').map(x => +x);
  if (splitted.length === 1) {
    return {all: splitted[0]};
  }
  if (splitted.length === 2) {
    // padding: 25px 50px;
    // top and bottom paddings are 25px
    // right and left paddings are 50px
    return {vertical: splitted[0], horizontal: splitted[1]};
  }
  if (splitted.length === 3) {
    // padding: 25px 50px 75px;
    // top padding is 25px
    // right and left paddings are 50px
    // bottom padding is 75px
    return {top: splitted[0], horizontal: splitted[1], bottom: splitted[2]};
  }

  if (splitted.length === 4) {
    // padding: 25px 50px 75px 100px;
    // top padding is 25px
    // right padding is 50px
    // bottom padding is 75px
    // left padding is 100px
    return {
      top: splitted[0],
      right: splitted[1],
      bottom: splitted[2],
      left: splitted[3],
    };
  }
  return {};
};
