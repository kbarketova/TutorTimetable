import React from 'react';
import {ViewStyle, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {Txt} from '../Txt';

const buttonStyle: ViewStyle = {
  position: 'absolute',
  backgroundColor: 'deepskyblue',
  width: 50,
  height: 50,
  borderRadius: 50 / 2,
  bottom: 50,
  right: 20,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
};

type TProps = Readonly<{
  onPress: () => void;
  label?: string | null;
  iconName?: string | null;
}>;

const ButtonAdd_: React.FC<TProps> = ({
  onPress,
  label = null,
  iconName = null,
}: TProps) => {
  return (
    <TouchableOpacity style={buttonStyle} activeOpacity={0.6} onPress={onPress}>
      {!!label && (
        <Txt color="white" size="lg">
          {label}
        </Txt>
      )}
      {!!iconName && <Icon name={iconName} size={25} color="white" />}
    </TouchableOpacity>
  );
};

export const ButtonAdd = React.memo(ButtonAdd_);
