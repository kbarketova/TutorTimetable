import React from 'react';
import {Platform, TextInput, TextStyle, ViewStyle} from 'react-native';

import {
  GreenThemeTextColor,
  GreenThemeTextDisabledColor,
} from '../../constants';
import {splitProp} from '../split-prop';
import {TSplitResult} from '../types';

type TProps = Readonly<{
  value: string;
  onChangeText: (value: string) => void;
  isEditable?: boolean | null;
  margin?: number | string | null;
  padding?: number | string | null;
  multiline?: boolean | null;
}>;

const activeStyle: TextStyle = {
  flex: 1,
  height: 40,
  borderWidth: 2,
  borderRadius: 3,
  borderColor: GreenThemeTextColor,
  color: GreenThemeTextColor,
};

const disabledStyle: TextStyle = {
  ...activeStyle,
  borderColor: GreenThemeTextDisabledColor,
  color: GreenThemeTextDisabledColor,
};

const Input_: React.FC<TProps> = ({
  value,
  onChangeText,
  isEditable = null,
  margin = null,
  padding = null,
  multiline = null,
}: TProps) => {
  const isAndroid: boolean = Platform.OS === 'android';
  const numberOfLinesFinal = isAndroid && multiline ? 3 : undefined;
  const textAlignVerticalFinal = isAndroid && multiline ? 'top' : undefined;

  const style = React.useMemo<ViewStyle>(() => {
    const marginFinal: TSplitResult = margin ? splitProp(margin) : {};
    const paddingFinal: TSplitResult = padding ? splitProp(padding) : {};
    const mainStyle: ViewStyle = isEditable ? activeStyle : disabledStyle;

    return {
      ...mainStyle,
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
  }, [isEditable, margin, multiline, padding]);

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
