import React from 'react';
import {View, ViewStyle} from 'react-native';

import {Txt} from '../../components/Txt';

type TProps = Readonly<{
  fullName: string;
  color: string;
}>;

const Avatar_: React.FC<TProps> = ({fullName, color}: TProps) => {
  const splitted = fullName.split(' ');
  const name = splitted[0];
  const lastName = splitted[1];

  const style = React.useMemo<ViewStyle>(() => {
    return {
      backgroundColor: color,
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      alignItems: 'center',
      justifyContent: 'center',
    };
  }, [color]);

  return (
    <View style={style}>
      <Txt color="white">{`${lastName[0]} ${name[0]}`}</Txt>
    </View>
  );
};

export const Avatar = React.memo(Avatar_);
