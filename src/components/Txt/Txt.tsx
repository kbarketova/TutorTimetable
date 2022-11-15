import React from 'react';
import {Text, TextStyle} from 'react-native';
import {TAlignSelf, TFontWeight, TSize} from '../../types';

type TProps = Readonly<{
  children: string;
  color?: string | null;
  size?: TSize | null;
  flex?: number | null;
  alignSelf?: TAlignSelf | null;
  fontWeight?: TFontWeight | null;
}>;

const textSizes: Readonly<Record<TSize, number>> = {
  sm: 12,
  md: 15,
  lg: 25,
};

const Txt_: React.FC<TProps> = ({
  children,
  color = null,
  size = null,
  flex = null,
  alignSelf = null,
  fontWeight = null,
}: TProps) => {
  const style = React.useMemo<TextStyle>(() => {
    return {
      color: color ?? undefined,
      fontSize: textSizes[size ?? 'md'],
      flex: flex ?? undefined,
      fontWeight: fontWeight ?? undefined,
      alignSelf: alignSelf ?? undefined,
    };
  }, [alignSelf, color, flex, fontWeight, size]);

  return <Text style={style}>{children}</Text>;
};

export const Txt = React.memo(Txt_);
