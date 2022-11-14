import React from 'react';
import {Text, TextStyle, ViewStyle} from 'react-native';
import {BlueThemeInput} from '../../constants';
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
  isMultiline?: boolean | null;
}>;

const innerLabelStyle: TextStyle = {
  paddingVertical: 10,
  fontWeight: '400',
  color: BlueThemeInput.textColorEnabled,
  fontSize: 15,
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
  isMultiline = null,
}: TProps) => {
  const labelStyle = React.useMemo<ViewStyle>(() => {
    return {
      ...innerLabelStyle,
      fontSize: labelSize ?? innerLabelStyle.fontSize,
      fontWeight: labelWeight ?? innerLabelStyle.fontWeight,
    };
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
        multiline={isMultiline}
      />
    </Flex>
  );
};

export const Field = React.memo(Field_);
