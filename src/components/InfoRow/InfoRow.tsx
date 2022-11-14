import React from 'react';

import {Field} from '../Field';
import {Flex} from '../Flex';

type TProps = Readonly<{
  isEditable: boolean;
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  labelAdditional?: string | null;
  valueAdditional?: string | null;
  onChangeTextAdditional?: ((value: string) => void) | null;
}>;

const InfoRow_: React.FC<TProps> = ({
  isEditable,
  label,
  value,
  onChangeText,
  labelAdditional = null,
  valueAdditional = null,
  onChangeTextAdditional = null,
}: TProps) => {
  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Field
        label={label}
        value={value}
        onChangeText={onChangeText}
        isEditable={isEditable}
        inputMargin="0 15 0 0"
      />
      {onChangeTextAdditional && typeof valueAdditional === 'string' && (
        <Field
          label={labelAdditional}
          value={valueAdditional}
          onChangeText={onChangeTextAdditional}
          isEditable={isEditable}
        />
      )}
    </Flex>
  );
};

export const InfoRow = React.memo(InfoRow_);
