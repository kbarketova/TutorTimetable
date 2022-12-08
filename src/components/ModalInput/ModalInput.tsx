import React from 'react';

import {TKeyboard} from '../../types';
import {Input} from '../Input';

type TProps = Readonly<{
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean | null;
  flex?: number | null;
  margin?: number | string | null;
  keyboardType?: TKeyboard | null;
}>;

const ModalInput_: React.FC<TProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = null,
  flex = null,
  margin = null,
  keyboardType = null,
}: TProps) => {
  return (
    <Input
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      backgroundColor="gainsboro"
      borderRadius={10}
      padding="0 10"
      margin={margin ?? '0 0 10 0'}
      secureTextEntry={secureTextEntry}
      flex={flex}
      keyboardType={keyboardType}
    />
  );
};

export const ModalInput = React.memo(ModalInput_);
