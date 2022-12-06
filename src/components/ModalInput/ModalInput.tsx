import React from 'react';

import {Input} from '../Input';

type TProps = Readonly<{
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}>;

const ModalInput_: React.FC<TProps> = ({
  placeholder,
  value,
  onChangeText,
}: TProps) => {
  return (
    <Input
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      backgroundColor="gainsboro"
      borderRadius={10}
      padding="0 10"
      margin="0 0 10 0"
    />
  );
};

export const ModalInput = React.memo(ModalInput_);
