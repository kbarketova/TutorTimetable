import React from 'react';
import {View, ViewStyle} from 'react-native';
import {TFontWeight, TJustifyContent} from '../../types';

type TProps = Readonly<{
  children: React.ReactNode;
  flexDirection?: TFontWeight | null;
  flex?: number | null;
  justifyContent?: TJustifyContent | null;
}>;

const innerContainerStyle: ViewStyle = {
  flex: 1,
};

const Flex_: React.FC<TProps> = ({
  children,
  flexDirection = null,
  flex = null,
  justifyContent = null,
}: TProps) => {
  const style = React.useMemo<ViewStyle>(
    () => ({
      ...innerContainerStyle,
      flex: flex ?? innerContainerStyle.flex,
      flexDirection: flexDirection ?? undefined,
      justifyContent: justifyContent ?? undefined,
    }),
    [flex, flexDirection, justifyContent],
  );
  return <View style={style}>{children}</View>;
};

export const Flex = React.memo(Flex_);
