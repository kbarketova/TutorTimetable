import React from 'react';
import {Platform, TextInput, TextStyle, ViewStyle} from 'react-native';

import {BlueThemeInput} from '../../constants';
import {useFlag} from '../../hooks/use-flag';
import {TSize} from '../../types';
import {splitProp} from '../split-prop';
import {TSplitResult} from '../types';

type TInputSize = TSize | 'none';

type TInputSizeParams = Readonly<{
  width: number | undefined;
}>;

type TProps = Readonly<{
  value: string;
  onChangeText: (value: string) => void;
  isEditable?: boolean | null;
  margin?: number | string | null;
  padding?: number | string | null;
  multiline?: boolean | null;
  size?: TInputSize | null;
}>;

const inputSizes: Readonly<Record<TInputSize, TInputSizeParams>> = {
  none: {width: undefined},
  sm: {width: 40},
  md: {width: 120},
  lg: {width: 160},
};

const activeStyle: TextStyle = {
  height: 40,
  borderWidth: 2,
  borderRadius: 3,
  borderColor: BlueThemeInput.borderColorEnabled,
  color: BlueThemeInput.textColorEnabled,
};

const disabledStyle: TextStyle = {
  ...activeStyle,
  borderColor: BlueThemeInput.textColorDisabled,
  color: BlueThemeInput.textColorDisabled,
};

const Input_: React.FC<TProps> = ({
  value,
  onChangeText,
  isEditable = true,
  margin = null,
  padding = null,
  multiline = null,
  size = null,
}: TProps) => {
  const [isFocused, setFocused, setUnfocused] = useFlag();
  const isAndroid: boolean = Platform.OS === 'android';
  const numberOfLinesFinal = isAndroid && multiline ? 3 : undefined;
  const textAlignVerticalFinal = isAndroid && multiline ? 'top' : undefined;

  const style = React.useMemo<ViewStyle>(() => {
    const marginFinal: TSplitResult = margin ? splitProp(margin) : {};
    const paddingFinal: TSplitResult = padding ? splitProp(padding) : {};
    const mainStyle: ViewStyle = isEditable ? activeStyle : disabledStyle;
    const sizeFinal: TInputSize = size ?? 'none';

    return {
      ...mainStyle,
      ...inputSizes[sizeFinal],
      borderColor:
        isFocused && isEditable
          ? BlueThemeInput.focused
          : mainStyle.borderColor,
      height: multiline ? undefined : mainStyle.height,
      margin: marginFinal.all,
      marginLeft: marginFinal.left,
      marginRight: marginFinal.right,
      marginTop: marginFinal.top,
      marginBottom: marginFinal.bottom,
      marginVertical: marginFinal.vertical,
      marginHorizontal: marginFinal.horizontal,
      padding: paddingFinal.all,
      paddingLeft: paddingFinal.left,
      paddingRight: paddingFinal.right,
      paddingTop: paddingFinal.top,
      paddingBottom: paddingFinal.bottom,
      paddingVertical: paddingFinal.vertical,
      paddingHorizontal: paddingFinal.horizontal,
    };
  }, [isEditable, isFocused, margin, multiline, padding, size]);

  const focus = React.useCallback(() => setFocused(), [setFocused]);

  const blur = React.useCallback(() => setUnfocused(), [setUnfocused]);

  return (
    <TextInput
      style={style}
      onChangeText={onChangeText}
      value={value}
      editable={isEditable ?? undefined}
      multiline={multiline ?? undefined}
      textAlignVertical={textAlignVerticalFinal}
      numberOfLines={numberOfLinesFinal}
      onFocus={focus}
      onBlur={blur}
    />
  );
};

export const Input = React.memo(Input_);
