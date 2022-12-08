import React from 'react';

import {TKeyboard} from '../../types';
import {Flex} from '../Flex';
import {ModalInput} from '../ModalInput';

type TProps = Readonly<{
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  labelAdditional: string;
  valueAdditional: string;
  onChangeTextAdditional: (value: string) => void;
  flexAdditional?: number | null;
  keyboardTypeAdditional?: TKeyboard | null;
}>;

const InfoRow_: React.FC<TProps> = ({
  label,
  value,
  onChangeText,
  labelAdditional,
  valueAdditional,
  onChangeTextAdditional,
  flexAdditional = null,
  keyboardTypeAdditional = null,
}: TProps) => {
  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <ModalInput
        onChangeText={onChangeText}
        value={value}
        placeholder={label}
        flex={1}
        margin="0 10 0 0"
      />
      <ModalInput
        onChangeText={onChangeTextAdditional}
        value={valueAdditional}
        placeholder={labelAdditional}
        flex={flexAdditional ?? 1}
        keyboardType={keyboardTypeAdditional}
      />
    </Flex>
  );
};

export const InfoRow = React.memo(InfoRow_);
