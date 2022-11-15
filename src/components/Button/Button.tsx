import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {
  TAlignContent,
  TAlignItems,
  TFlexWrap,
  TJustifyContent,
  TSize,
} from '../../types';
import {splitProp} from '../split-prop';
import {Txt} from '../Txt';
import {TSplitResult} from '../types';

type TProps = Readonly<{
  onPress: () => void;
  label?: string | null;
  flex?: number | null;
  justifyContent?: TJustifyContent | null;
  alignContent?: TAlignContent | null;
  alignItems?: TAlignItems | null;
  margin?: number | string | null;
  padding?: number | string | null;
  flexWrap?: TFlexWrap | null;
  color?: string | null;
  borderRadius?: number | null;
  borderColor?: string | null;
  borderWidth?: number | null;
  opacity?: number | null;
  size?: TSize | null;
  iconName?: string | null;
}>;

const buttonHeightSizes: Readonly<Record<TSize, number>> = {
  sm: 40,
  md: 45,
  lg: 60,
};

const innerContainerStyle: ViewStyle = {
  flex: 1,
};

const Button_: React.FC<TProps> = ({
  onPress,
  label = null,
  flex = null,
  justifyContent = null,
  alignContent = null,
  alignItems = null,
  margin = null,
  padding = null,
  color = null,
  borderRadius = null,
  borderColor = null,
  borderWidth = null,
  opacity = null,
  size = null,
  iconName = null,
}: TProps) => {
  const style = React.useMemo<ViewStyle>(() => {
    const marginFinal: TSplitResult = margin ? splitProp(margin) : {};
    const paddingFinal: TSplitResult = padding ? splitProp(padding) : {};

    return {
      flex: flex ?? innerContainerStyle.flex,
      justifyContent: justifyContent ?? 'center',
      alignContent: alignContent ?? 'center',
      alignItems: alignItems ?? 'center',
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
      backgroundColor: color ?? undefined,
      borderRadius: borderRadius ?? undefined,
      borderColor: borderColor ?? undefined,
      borderWidth: borderWidth ?? undefined,
      height: buttonHeightSizes[size ?? 'md'],
    };
  }, [
    alignContent,
    alignItems,
    borderColor,
    borderRadius,
    borderWidth,
    color,
    flex,
    justifyContent,
    margin,
    padding,
    size,
  ]);

  if (!label && !iconName) {
    return (
      <TouchableOpacity
        style={style}
        activeOpacity={opacity ?? 0.6}
        onPress={onPress}
      />
    );
  }

  return (
    <TouchableOpacity
      style={style}
      activeOpacity={opacity ?? 0.6}
      onPress={onPress}>
      {!!iconName && <Icon name={iconName} size={30} />}
      {!!label && (
        <Txt size="md" color="white">
          {label}
        </Txt>
      )}
    </TouchableOpacity>
  );
};

export const Button = React.memo(Button_);