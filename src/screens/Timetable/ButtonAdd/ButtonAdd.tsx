import React from 'react';
import {ViewStyle, TouchableOpacity} from 'react-native';

import {Txt} from '../../../components/Txt';

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
}>;

const ButtonAdd_: React.FC<TProps> = ({onPress}: TProps) => {
  return (
    <TouchableOpacity style={buttonStyle} activeOpacity={0.6} onPress={onPress}>
      <Txt color="white" size="lg">
        +
      </Txt>
    </TouchableOpacity>
  );
};

export const ButtonAdd = React.memo(ButtonAdd_);
