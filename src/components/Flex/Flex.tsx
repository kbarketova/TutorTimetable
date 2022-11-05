import React from 'react';
import {View, ViewStyle} from 'react-native';
import {TFlexWrap, TFontWeight, TJustifyContent} from '../../types';
import {splitProp} from '../split-prop';
import {TSplitResult} from '../types';

type TProps = Readonly<{
  children: React.ReactNode;
  flexDirection?: TFontWeight | null;
  flex?: number | null;
  justifyContent?: TJustifyContent | null;
  margin?: number | string | null;
  padding?: number | string | null;
  flexWrap?: TFlexWrap | null;
}>;

const innerContainerStyle: ViewStyle = {
  flex: 1,
};

const Flex_: React.FC<TProps> = ({
  children,
  flexDirection = null,
  flex = null,
  justifyContent = null,
  margin = null,
  padding = null,
}: TProps) => {
  const style = React.useMemo<ViewStyle>(() => {
    const marginFinal: TSplitResult = margin ? splitProp(margin) : {};
    const paddingFinal: TSplitResult = padding ? splitProp(padding) : {};

    return {
      ...innerContainerStyle,
      flex: flex ?? innerContainerStyle.flex,
      flexDirection: flexDirection ?? undefined,
      justifyContent: justifyContent ?? undefined,
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
  }, [flex, flexDirection, justifyContent, margin, padding]);
  return <View style={style}>{children}</View>;
};

export const Flex = React.memo(Flex_);
