import React from 'react';

import {TKeyboard} from '../../types';
import {Flex} from '../Flex';
import {ModalInput} from '../ModalInput';

type TProps = Readonly<{
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  labelAdditional: string;
  valueAdditional?: string | null;
  onChangeTextAdditional?: ((value: string) => void) | null;
  flexAdditional?: number | null;
  keyboardType?: TKeyboard | null;
  keyboardTypeAdditional?: TKeyboard | null;
}>;

const InfoRow_: React.FC<TProps> = ({
  label,
  value,
  onChangeText,
  labelAdditional,
  valueAdditional = null,
  onChangeTextAdditional = null,
  flexAdditional = null,
  keyboardType = null,
  keyboardTypeAdditional = null,
}: TProps) => {
  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <ModalInput
        onChangeText={onChangeText}
        value={value}
        placeholder={label}
        flex={1}
        margin={onChangeTextAdditional ? '0 10 0 0' : undefined}
        keyboardType={keyboardType}
      />
      {onChangeTextAdditional && valueAdditional !== null && (
        <ModalInput
          onChangeText={onChangeTextAdditional}
          value={valueAdditional}
          placeholder={labelAdditional}
          flex={flexAdditional ?? 1}
          keyboardType={keyboardTypeAdditional}
        />
      )}
    </Flex>
  );
};

export const InfoRow = React.memo(InfoRow_);
