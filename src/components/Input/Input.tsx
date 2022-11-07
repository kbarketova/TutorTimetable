import React from 'react';
import {TextInput, TextStyle, ViewStyle} from 'react-native';
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
}: TProps) => {
  const style = React.useMemo<ViewStyle>(() => {
    const marginFinal: TSplitResult = margin ? splitProp(margin) : {};
    const paddingFinal: TSplitResult = padding ? splitProp(padding) : {};
    const mainStyle: ViewStyle = isEditable ? activeStyle : disabledStyle;

    return {
      ...mainStyle,
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
  }, [isEditable, margin, padding]);

  return (
    <TextInput
      style={style}
      onChangeText={onChangeText}
      value={value}
      editable={isEditable ?? undefined}
    />
  );
};

export const Input = React.memo(Input_);
