import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../../constants';
import {
  TAlignContent,
  TAlignItems,
  TFlexDirection,
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
  flexDirection?: TFlexDirection | null;
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
  activeOpacity?: number | null;
  size?: TSize | null;
  iconName?: string | null;
  children?: React.ReactNode | null;
  isActive?: boolean | null;
}>;

const buttonHeightSizes: Readonly<Record<TSize, number>> = {
  sm: 45,
  md: 50,
  lg: 60,
};

const innerContainerStyle: ViewStyle = {
  flex: 1,
};

const innerActiveOpacity = 0.7;

const Button_: React.FC<TProps> = ({
  onPress,
  children = null,
  label = null,
  flex = null,
  flexDirection = null,
  justifyContent = null,
  alignContent = null,
  alignItems = null,
  margin = null,
  padding = null,
  color = null,
  borderRadius = null,
  borderColor = null,
  borderWidth = null,
  activeOpacity = null,
  size = null,
  iconName = null,
  isActive = true,
}: TProps) => {
  const activeOpacityFinal = activeOpacity ?? innerActiveOpacity;

  const style = React.useMemo<ViewStyle>(() => {
    const marginFinal: TSplitResult = margin ? splitProp(margin) : {};
    const paddingFinal: TSplitResult = padding ? splitProp(padding) : {};

    return {
      flex: flex ?? innerContainerStyle.flex,
      flexDirection: flexDirection ?? undefined,
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
      opacity: isActive ? undefined : 0.6,
    };
  }, [
    margin,
    padding,
    flex,
    flexDirection,
    justifyContent,
    alignContent,
    alignItems,
    color,
    borderRadius,
    borderColor,
    borderWidth,
    size,
    isActive,
  ]);

  if (children) {
    return (
      <TouchableOpacity
        style={style}
        activeOpacity={activeOpacityFinal}
        onPress={isActive ? onPress : undefined}>
        {children}
      </TouchableOpacity>
    );
  }

  if (!label && !iconName) {
    return (
      <TouchableOpacity
        style={style}
        activeOpacity={activeOpacityFinal}
        onPress={isActive ? onPress : undefined}
      />
    );
  }

  return (
    <TouchableOpacity
      style={style}
      activeOpacity={activeOpacityFinal}
      onPress={isActive ? onPress : undefined}>
      {!!iconName && (
        <Icon
          name={iconName}
          size={30}
          color={isActive ? undefined : Colors.grayLight}
        />
      )}
      {!!label && (
        <Txt size="md" color="white">
          {label}
        </Txt>
      )}
    </TouchableOpacity>
  );
};

export const Button = React.memo(Button_);
