import React from 'react';
import {Text, TextStyle, ViewStyle} from 'react-native';
import {Flex} from '../Flex';
import {Input} from '../Input';

type TProps = Readonly<{
  value: string;
  onChangeText: (value: string) => void;
  isEditable?: boolean | null;
  label?: string | null;
  inputMargin?: number | string | null;
  inputPadding?: number | string | null;
  labelSize?: number | null;
  labelWeight?: string | null;
}>;

const innerLabelStyle: TextStyle = {
  paddingVertical: 5,
  fontWeight: 'bold',
};

const Field_: React.FC<TProps> = ({
  value,
  onChangeText,
  label = null,
  isEditable = null,
  inputMargin = null,
  inputPadding = null,
  labelSize = null,
  labelWeight = null,
}: TProps) => {
  const labelStyle = React.useMemo<ViewStyle>(() => {
    return {...innerLabelStyle, fontSize: labelSize, fontWeight: labelWeight};
  }, [labelSize, labelWeight]);

  return (
    <Flex>
      {!!label && <Text style={labelStyle}>{label}</Text>}
      <Input
        onChangeText={onChangeText}
        value={value}
        isEditable={isEditable ?? undefined}
        margin={inputMargin}
        padding={inputPadding}
      />
    </Flex>
  );
};

export const Field = React.memo(Field_);
