import React from 'react';
import {Text, TextStyle} from 'react-native';
import {BlueThemeInput} from '../../constants';
import {TPropsTxt, TSize} from '../../types';
import {splitProp} from '../split-prop';
import {TSplitResult} from '../types';

const textSizes: Readonly<Record<TSize, number>> = {
  sm: 14,
  md: 16,
  lg: 25,
};

type TProps = TPropsTxt &
  Readonly<{
    children: React.ReactNode;
  }>;

const innerLabelStyle: TextStyle = {
  fontWeight: '400',
  color: BlueThemeInput.textColorEnabled,
};

const Txt_: React.FC<TProps> = ({
  children,
  color = null,
  size = null,
  flex = null,
  alignSelf = null,
  fontWeight = null,
  padding = null,
}: TProps) => {
  const style = React.useMemo<TextStyle>(() => {
    const paddingFinal: TSplitResult = padding ? splitProp(padding) : {};
    return {
      color: color ?? innerLabelStyle.color,
      fontSize: textSizes[size ?? 'md'],
      flex: flex ?? undefined,
      fontWeight: fontWeight ?? innerLabelStyle.fontWeight,
      alignSelf: alignSelf ?? undefined,
      padding: paddingFinal.all,
      paddingLeft: paddingFinal.left,
      paddingRight: paddingFinal.right,
      paddingTop: paddingFinal.top,
      paddingBottom: paddingFinal.bottom,
      paddingVertical: paddingFinal.vertical,
      paddingHorizontal: paddingFinal.horizontal,
    };
  }, [alignSelf, color, flex, fontWeight, padding, size]);

  return <Text style={style}>{children}</Text>;
};

export const Txt = React.memo(Txt_);
