import React from 'react';

import {TItem, TOnSelectId} from './types';
import {Button} from '../Button';
import {Colors} from '../../constants';

type TProps = TItem &
  Readonly<{
    isSelected: boolean;
    onPress: TOnSelectId;
  }>;

const ListItem_: React.FC<TProps> = ({
  id,
  name,
  isSelected,
  onPress,
}: TProps) => {
  const press = React.useCallback(() => {
    onPress(id);
  }, [id, onPress]);

  return (
    <>
      <Button
        label={name}
        onPress={press}
        flexDirection="row"
        justifyContent="flex-start"
        padding="5"
        labelSize="sm"
        color={isSelected ? Colors.sky : undefined}
        labelColor={isSelected ? undefined : 'grey'}
        borderBottomWidth={0.3}
        borderBottomColor="rgba(180,180,180,0.5)"
        borderRadius={2}
      />
    </>
  );
};

export const ListItem = React.memo(ListItem_);
