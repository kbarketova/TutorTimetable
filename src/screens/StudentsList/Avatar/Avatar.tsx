import React from 'react';
import {View, ViewStyle} from 'react-native';

import {Txt} from '../../../components/Txt';
import {getInitials} from './get-initials';

type TProps = Readonly<{
  name: string;
  color: string;
  lastName?: string;
}>;

const Avatar_: React.FC<TProps> = ({name, color, lastName}: TProps) => {
  const initials = React.useMemo<string>(
    () => getInitials(name, lastName),
    [lastName, name],
  );

  const style = React.useMemo<ViewStyle>(() => {
    return {
      backgroundColor: color,
      width: 45,
      height: 45,
      borderRadius: 45 / 2,
      alignItems: 'center',
      justifyContent: 'center',
    };
  }, [color]);

  if (!initials) {
    return null;
  }
  return (
    <View style={style}>
      <Txt color="white">{`${initials}`}</Txt>
    </View>
  );
};

export const Avatar = React.memo(Avatar_);
