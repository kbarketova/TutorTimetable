import React from 'react';
import {Platform, TextInput, TextStyle, ViewStyle} from 'react-native';

import {BlueThemeInput} from '../../constants';
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
  isEditable = null, // true
  margin = null,
  padding = null,
  multiline = null,
  size = null,
}: TProps) => {
  const isAndroid: boolean = Platform.OS === 'android';
  const isEditableFinal: boolean =
    typeof isEditable === 'object' ? true : isEditable;

  const numberOfLinesFinal = isAndroid && multiline ? 3 : undefined;
  const textAlignVerticalFinal = isAndroid && multiline ? 'top' : undefined;

  const style = React.useMemo<ViewStyle>(() => {
    const marginFinal: TSplitResult = margin ? splitProp(margin) : {};
    const paddingFinal: TSplitResult = padding ? splitProp(padding) : {};
    const mainStyle: ViewStyle = isEditableFinal ? activeStyle : disabledStyle;
    const sizeFinal: TInputSize = size ?? 'none';

    return {
      ...mainStyle,
      ...inputSizes[sizeFinal],
      flex: sizeFinal === 'none' ? 0 : 1,
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
  }, [isEditableFinal, margin, multiline, padding, size]);

  return (
    <TextInput
      style={style}
      onChangeText={onChangeText}
      value={value}
      editable={isEditable ?? undefined}
      multiline={multiline ?? undefined}
      textAlignVertical={textAlignVerticalFinal}
      numberOfLines={numberOfLinesFinal}
    />
  );
};

export const Input = React.memo(Input_);
