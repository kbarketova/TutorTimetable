import React from 'react';

import {TFontWeight, TPropsTxt, TSize} from '../../types';
import {Flex} from '../Flex';
import {Input} from '../Input';
import {Txt} from '../Txt';

type TProps = Readonly<{
  value: string;
  onChangeText: (value: string) => void;
  isEditable?: boolean | null;
  label?: string | null;
  inputMargin?: number | string | null;
  inputPadding?: number | string | null;
  labelSize?: TSize | null;
  labelWeight?: TFontWeight | null;
  isMultiline?: boolean | null;
  color?: string | null;
  flex?: number | null;
}>;

const Field_: React.FC<TProps> = ({
  value,
  onChangeText,
  label = null,
  isEditable = null,
  inputMargin = null,
  inputPadding = null,
  labelSize = null,
  labelWeight = null,
  isMultiline = null,
  color = null,
  flex = null,
}: TProps) => {
  const labelStyle = React.useMemo<TPropsTxt>(() => {
    return {
      padding: '10 0',
      size: labelSize ?? 'md',
      fontWeight: labelWeight ?? undefined,
    };
  }, [labelSize, labelWeight]);

  return (
    <Flex flex={flex} color={color}>
      {!!label && <Txt {...labelStyle}>{label}</Txt>}
      <Input
        onChangeText={onChangeText}
        value={value}
        isEditable={isEditable ?? undefined}
        margin={inputMargin}
        padding={inputPadding}
        multiline={isMultiline}
      />
    </Flex>
  );
};

export const Field = React.memo(Field_);
